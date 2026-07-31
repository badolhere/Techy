import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for demo bookings, orders, and repair tickets
interface Booking {
  id: string;
  trackingCode: string;
  deviceType: string;
  brand: string;
  model: string;
  issue: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  status: "Received" | "Diagnosing" | "Repairing" | "Testing" | "Ready";
  createdAt: string;
}

interface Order {
  id: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  customerName: string;
  shippingAddress: string;
  phone: string;
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "b-1",
    trackingCode: "TECH-9041",
    deviceType: "Phone",
    brand: "Apple",
    model: "iPhone 13",
    issue: "Cracked Screen & Battery Replacement",
    customerName: "Sarah Jenkins",
    phone: "360-555-0192",
    email: "sarah@example.com",
    date: "2026-07-31",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "Repairing",
    createdAt: new Date().toISOString()
  },
  {
    id: "b-2",
    trackingCode: "TECH-8234",
    deviceType: "Computer",
    brand: "Dell",
    model: "Inspiron 15",
    issue: "Not charging / Loose port",
    customerName: "Michael Chang",
    phone: "360-555-8832",
    email: "michael@example.com",
    date: "2026-07-30",
    timeSlot: "02:00 PM - 03:00 PM",
    status: "Testing",
    createdAt: new Date().toISOString()
  }
];

const orders: Order[] = [];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AI Diagnostic Endpoint
app.post("/api/diagnose", async (req, res) => {
  try {
    const { deviceType, brand, model, issueDescription } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback if no API key configured
      return res.json({
        diagnosis: `Based on your description for ${brand} ${model} (${issueDescription}), this is a common issue typically related to hardware component stress or wear.`,
        estimatedCost: "$89 - $149",
        estimatedTime: "1 - 2 Hours",
        recommendation: "Bring it into our Longview shop for a free 10-minute professional diagnosis and quote. We fix this same-day!"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an expert mobile and computer repair technician at "Techy Longview" (We Can Fix That in Longview, WA).
A customer brought in or inquired about:
Device Type: ${deviceType}
Brand & Model: ${brand} ${model}
Issue Description: ${issueDescription}

Provide a JSON response with:
1. "diagnosis": A clear, professional explanation of the likely problem.
2. "estimatedCost": Estimated repair price range in USD (e.g., "$79 - $129").
3. "estimatedTime": Estimated repair duration (e.g., "45 mins - 1 hour").
4. "recommendation": Practical advice and encouragement to visit Techy Longview at Longview, WA 98632 or book online.

Return ONLY valid JSON with keys: diagnosis, estimatedCost, estimatedTime, recommendation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || "";
    // Clean up json if wrapped in markdown
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonStr);
    res.json(data);
  } catch (error: any) {
    console.error("AI Diagnose error:", error);
    res.json({
      diagnosis: "We analyzed your description and suspect a component or display assembly fault.",
      estimatedCost: "$99 - $150",
      estimatedTime: "1 - 2 hours",
      recommendation: "Bring your device to Techy Longview in Longview, WA for free diagnostic testing!"
    });
  }
});

// Bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const { deviceType, brand, model, issue, customerName, phone, email, date, timeSlot } = req.body;
  const trackingCode = `TECH-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: Booking = {
    id: `b-${Date.now()}`,
    trackingCode,
    deviceType,
    brand,
    model,
    issue,
    customerName,
    phone,
    email,
    date,
    timeSlot,
    status: "Received",
    createdAt: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  res.json(newBooking);
});

// Check repair status by code
app.get("/api/repair-status/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const booking = bookings.find(b => b.trackingCode.toUpperCase() === code);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ error: "Repair tracking code not found. Please check your code or contact us at 360-270-8896." });
  }
});

// Accessories Shop Orders
app.post("/api/orders", (req, res) => {
  const { items, total, customerName, shippingAddress, phone } = req.body;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    items,
    total,
    customerName,
    shippingAddress,
    phone,
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);
  res.json({ success: true, orderId: newOrder.id });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Techy Longview server running on http://localhost:${PORT}`);
  });
}

startServer();
