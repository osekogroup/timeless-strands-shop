import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Search, Filter, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  has_video: boolean;
  video_length?: string;
  created_at: string;
  updated_at: string;
}

interface ProductVariant {
  id: string;
  product_id: string;
  lace_size: string;
  inch_size: string;
  price: number;
  stock: number;
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  has_video: boolean;
  video_length: string;
  variants: Array<{
    lace_size: string;
    inch_size: string;
    price: number;
    stock: number;
  }>;
  images: Array<{
    image_url: string;
    display_order: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    rating: 0,
    reviews: 0,
    has_video: false,
    video_length: '',
    variants: [{ lace_size: '', inch_size: '', price: 0, stock: 0 }],
    images: [{ image_url: '', display_order: 0 }]
  });

  const categories = [
    'closure', 'frontal', 'glueless', 'pixie', 'straight', 'curly', 'wave', 'bob'
  ];

  const laceSizes = [
    '4x4 Closure', '5x5 Closure', '6x6 Closure', '13x4 Frontal', '13x6 Frontal', 
    '5x5 Glueless', 'No Lace', '13x4 Lace', '4x4 Lace', '2x6 Lace'
  ];

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to access admin dashboard');
        return;
      }

      const { data: adminData, error } = await supabase
        .from('admin_roles')
        .select('is_admin')
        .eq('user_id', user.id)
        .single();

      if (error || !adminData?.is_admin) {
        toast.error('Access denied. Admin privileges required.');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast.error('Error checking permissions');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let productData;
      
      if (editingProduct) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            rating: formData.rating,
            reviews: formData.reviews,
            has_video: formData.has_video,
            video_length: formData.video_length
          })
          .eq('id', editingProduct.id)
          .select()
          .single();

        if (error) throw error;
        productData = data;
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            rating: formData.rating,
            reviews: formData.reviews,
            has_video: formData.has_video,
            video_length: formData.video_length
          })
          .select()
          .single();

        if (error) throw error;
        productData = data;
        toast.success('Product created successfully');
      }

      // Handle variants
      if (productData && formData.variants.length > 0) {
        // Delete existing variants if editing
        if (editingProduct) {
          await supabase
            .from('product_variants')
            .delete()
            .eq('product_id', productData.id);
        }

        // Insert new variants
        const variantsToInsert = formData.variants
          .filter(variant => variant.lace_size && variant.inch_size)
          .map(variant => ({
            product_id: productData.id,
            lace_size: variant.lace_size,
            inch_size: variant.inch_size,
            price: variant.price * 100, // Convert to cents
            stock: variant.stock
          }));

        if (variantsToInsert.length > 0) {
          await supabase
            .from('product_variants')
            .insert(variantsToInsert);
        }
      }

      // Handle images
      if (productData && formData.images.length > 0) {
        // Delete existing images if editing
        if (editingProduct) {
          await supabase
            .from('product_images')
            .delete()
            .eq('product_id', productData.id);
        }

        // Insert new images
        const imagesToInsert = formData.images
          .filter(image => image.image_url)
          .map(image => ({
            product_id: productData.id,
            image_url: image.image_url,
            display_order: image.display_order
          }));

        if (imagesToInsert.length > 0) {
          await supabase
            .from('product_images')
            .insert(imagesToInsert);
        }
      }

      resetForm();
      setShowAddDialog(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      rating: 0,
      reviews: 0,
      has_video: false,
      video_length: '',
      variants: [{ lace_size: '', inch_size: '', price: 0, stock: 0 }],
      images: [{ image_url: '', display_order: 0 }]
    });
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { lace_size: '', inch_size: '', price: 0, stock: 0 }]
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { image_url: '', display_order: prev.images.length }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      has_video: product.has_video,
      video_length: product.video_length || '',
      variants: [{ lace_size: '', inch_size: '', price: 0, stock: 0 }],
      images: [{ image_url: '', display_order: 0 }]
    });
    setShowAddDialog(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your wig collection</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingProduct(null); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reviews">Reviews Count</Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.has_video}
                      onChange={(e) => setFormData(prev => ({ ...prev, has_video: e.target.checked }))}
                    />
                    <span>Has Video</span>
                  </Label>
                  {formData.has_video && (
                    <Input
                      placeholder="Video length"
                      value={formData.video_length}
                      onChange={(e) => setFormData(prev => ({ ...prev, video_length: e.target.value }))}
                    />
                  )}
                </div>
              </div>

              {/* Variants Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Product Variants</Label>
                  <Button type="button" variant="outline" onClick={addVariant}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variant
                  </Button>
                </div>
                
                {formData.variants.map((variant, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Lace Size</Label>
                          <Select
                            value={variant.lace_size}
                            onValueChange={(value) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].lace_size = value;
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select lace size" />
                            </SelectTrigger>
                            <SelectContent>
                              {laceSizes.map(size => (
                                <SelectItem key={size} value={size}>{size}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Inch Size</Label>
                          <Input
                            value={variant.inch_size}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].inch_size = e.target.value;
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                            placeholder="e.g., 10 inches"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Price (KSH)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={variant.price}
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].price = parseFloat(e.target.value) || 0;
                              setFormData(prev => ({ ...prev, variants: newVariants }));
                            }}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min="0"
                              value={variant.stock}
                              onChange={(e) => {
                                const newVariants = [...formData.variants];
                                newVariants[index].stock = parseInt(e.target.value) || 0;
                                setFormData(prev => ({ ...prev, variants: newVariants }));
                              }}
                            />
                            {formData.variants.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeVariant(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Product Images</Label>
                  <Button type="button" variant="outline" onClick={addImage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={image.image_url}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index].image_url = e.target.value;
                          setFormData(prev => ({ ...prev, images: newImages }));
                        }}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="w-24 space-y-2">
                      <Label>Order</Label>
                      <Input
                        type="number"
                        min="0"
                        value={image.display_order}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index].display_order = parseInt(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, images: newImages }));
                        }}
                      />
                    </div>
                    
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {product.description && product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description
                    }
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.has_video && <Badge variant="outline">Video</Badge>}
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Rating: {product.rating}/5 ({product.reviews} reviews)</div>
                <div>Created: {new Date(product.created_at).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;