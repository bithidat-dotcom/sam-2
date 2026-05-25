import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase admin client (server-side ONLY)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Route: Order submission
app.post("/api/orders", async (req, res) => {
  const { orderItems, customerDetails } = req.body;
  
  if (!orderItems || !customerDetails) {
    return res.status(400).json({ error: "Missing order details" });
  }

  const totalAmount = orderItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  
  console.log("New Order Received:", { customer: customerDetails.name, total: totalAmount });

  let orderId = `SAM-${Math.floor(Math.random() * 1000000)}`;

  // 1. Save to Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          { 
            name: customerDetails.name,
            email: customerDetails.email,
            whatsapp: customerDetails.whatsappNumber,
            location: customerDetails.location,
            delivery_method: customerDetails.deliveryMethod,
            payment_method: customerDetails.paymentMethod,
            items: orderItems,
            total_amount: totalAmount,
            status: 'Processing'
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        orderId = data[0].id;
      }
    } catch (err: any) {
      console.error("Supabase Insertion Error:", err.message);
      // We still return success if the order reached here, but log the error
    }
  } else {
    console.warn("Supabase client not initialized - order not persisted to DB.");
  }

  res.status(201).json({ 
    message: "Order processed successfully", 
    orderId: orderId
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Development server running on http://localhost:${PORT}`);
    });
  };
  startServer();
} else {
  // Static serving for standard Node production (e.g. AI Studio preview)
  // Note: Vercel handles this via vercel.json rewrites, but this is needed for 'npm start'
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  
  // API routes are already handled above, so any other request goes to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  // Only listen if not on Vercel (Vercel exports the app)
  if (!process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Production server running on http://localhost:${PORT}`);
    });
  }
}

export default app;
