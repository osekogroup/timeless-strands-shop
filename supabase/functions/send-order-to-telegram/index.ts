import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')

interface OrderData {
  orderNumber: string
  customerName: string
  email: string
  phone: string
  cartItems: any[]
  deliveryMethod: string
  county?: string
  subtotal: number
  deliveryFee: number
  total: number
  mpesaTransactionId: string
  orderDate: string
}

async function sendTelegramMessage(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram bot token or chat ID not configured')
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Telegram API error:', errorText)
    throw new Error(`Failed to send Telegram message: ${response.status}`)
  }

  console.log('Order notification sent to Telegram successfully')
}

function formatOrderMessage(orderData: OrderData): string {
  const itemsList = orderData.cartItems
    .map(item => `• ${item.name} (${item.laceSize}, ${item.inchSize}) - Qty: ${item.quantity} - Ksh ${(item.price * item.quantity).toLocaleString()}`)
    .join('\n')

  return `🛍️ <b>NEW ORDER RECEIVED!</b>

📋 <b>Order Details:</b>
Order #: ${orderData.orderNumber}
Date: ${new Date(orderData.orderDate).toLocaleString('en-KE')}

👤 <b>Customer Info:</b>
Name: ${orderData.customerName}
Email: ${orderData.email}
Phone: ${orderData.phone}

📦 <b>Items Ordered:</b>
${itemsList}

🚚 <b>Delivery:</b>
Method: ${orderData.deliveryMethod === 'pickup' ? 'Store Pickup (StarMall C1, Nairobi)' : `County Delivery (${orderData.county})`}

💰 <b>Payment Summary:</b>
Subtotal: Ksh ${orderData.subtotal.toLocaleString()}
Delivery Fee: Ksh ${orderData.deliveryFee.toLocaleString()}
<b>Total: Ksh ${orderData.total.toLocaleString()}</b>

💳 <b>M-Pesa Transaction ID:</b>
${orderData.mpesaTransactionId}

⏰ <b>Expected Delivery:</b> 5-14 business days

---
🎯 Please process this order promptly!`
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const orderData: OrderData = await req.json()

    // Validate required data
    if (!orderData.orderNumber || !orderData.customerName || !orderData.cartItems) {
      return new Response(
        JSON.stringify({ error: 'Missing required order data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Processing order notification for: ${orderData.orderNumber}`)

    // Format and send the message
    const message = formatOrderMessage(orderData)
    await sendTelegramMessage(message)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order notification sent to Telegram successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending order to Telegram:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send order notification',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})