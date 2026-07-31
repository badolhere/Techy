export interface Booking {
  id: string;
  trackingCode: string;
  deviceType: 'Phone' | 'Tablet' | 'Computer' | 'Console' | 'Other';
  brand: string;
  model: string;
  issue: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  status: 'Received' | 'Diagnosing' | 'Repairing' | 'Testing' | 'Ready';
  createdAt: string;
}

export interface AccessoryProduct {
  id: string;
  name: string;
  category: 'Cases' | 'Screen Protectors' | 'Chargers & Cables' | 'Audio' | 'Power Banks' | 'Mounts';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  compatibleWith: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: AccessoryProduct;
  quantity: number;
}

export interface DiagnosticResult {
  diagnosis: string;
  estimatedCost: string;
  estimatedTime: string;
  recommendation: string;
}
