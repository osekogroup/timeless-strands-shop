import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, Shield, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  email_confirmed_at: string;
  is_admin: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingUsers, setProcessingUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Use the new function to get all users with admin status
      const { data: allUsers, error } = await supabase.rpc('get_all_users');

      if (error) throw error;

      setUsers(allUsers || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, email: string, currentStatus: boolean) => {
    if (processingUsers.has(userId)) return;

    setProcessingUsers(prev => new Set(prev).add(userId));
    
    try {
      if (currentStatus) {
        // Remove admin
        const { error } = await supabase
          .from('admin_roles')
          .update({ is_admin: false })
          .eq('user_id', userId);

        if (error) throw error;
        toast.success(`Removed admin access from ${email}`);
      } else {
        // Make admin using our function
        const { error } = await supabase.rpc('add_admin_by_email', {
          admin_email: email
        });

        if (error) throw error;
        toast.success(`Granted admin access to ${email}`);
      }

      await fetchUsers();
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast.error('Failed to update admin status');
    } finally {
      setProcessingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading users...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-2">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              {searchTerm ? 'No users found matching your search.' : 'No users found.'}
            </p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.email}</span>
                    {user.is_admin && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>User ID: {user.id}</p>
                    <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                    {user.last_sign_in_at && (
                      <p>Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}</p>
                    )}
                    {!user.email_confirmed_at && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Email not verified
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant={user.is_admin ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleAdminStatus(user.id, user.email, user.is_admin || false)}
                  disabled={processingUsers.has(user.id)}
                  className="min-w-[120px]"
                >
                  {processingUsers.has(user.id) ? (
                    'Processing...'
                  ) : user.is_admin ? (
                    <>
                      <Shield className="h-4 w-4 mr-1" />
                      Remove Admin
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      Make Admin
                    </>
                  )}
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
          <p className="font-medium mb-1">Admin Management:</p>
          <p>• Click "Make Admin" to grant admin privileges to a user</p>
          <p>• Click "Remove Admin" to revoke admin privileges</p>
          <p>• Changes take effect immediately</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;