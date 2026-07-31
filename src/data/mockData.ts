import { AccessoryProduct } from '../types';

export const STORE_DETAILS = {
  name: "Techy Longview",
  tagline: "WE CAN FIX THAT",
  address: "1003 Ocean Beach Hwy, Longview, WA 98632",
  phone: "360-270-8896",
  email: "longview@techycompany.com",
  categories: "COMPUTERS • TABLETS • PHONE",
  hours: {
    weekdays: "10:00 AM - 7:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "11:00 AM - 5:00 PM"
  }
};

export const REPAIR_SERVICES = [
  {
    id: "screen",
    title: "Screen & Display Repair",
    icon: "Smartphone",
    description: "OEM-grade LCD/OLED replacement for cracked, flickering, or unresponsive touchscreens.",
    startingPrice: "$69",
    duration: "30 - 45 mins"
  },
  {
    id: "battery",
    title: "Battery Replacement",
    icon: "BatteryCharging",
    description: "Restore all-day battery life. Fix rapid draining, unexpected shutdowns, and swollen batteries.",
    startingPrice: "$49",
    duration: "20 - 30 mins"
  },
  {
    id: "charging",
    title: "Charging Port & Audio Repair",
    icon: "Zap",
    description: "Deep clean or replacement of USB-C / Lightning ports, headphone jacks, and speakers.",
    startingPrice: "$59",
    duration: "30 - 45 mins"
  },
  {
    id: "water",
    title: "Water Damage Recovery",
    icon: "Droplets",
    description: "Ultrasonic chemical bath cleaning, corrosion removal, and micro-soldering board repair.",
    startingPrice: "$89",
    duration: "24 - 48 hours"
  },
  {
    id: "computer",
    title: "Computer & Laptop Repair",
    icon: "Laptop",
    description: "Screen replacement, keyboard fixing, virus removal, SSD upgrades, and fan cleaning.",
    startingPrice: "$79",
    duration: "Same day / 24 hrs"
  },
  {
    id: "camera",
    title: "Camera & Glass Repair",
    icon: "Camera",
    description: "Replacement of scratched rear camera glass or faulty autofocus camera modules.",
    startingPrice: "$65",
    duration: "30 mins"
  }
];

export const ACCESSORY_PRODUCTS: AccessoryProduct[] = [
  {
    id: "acc-1",
    name: "ArmorGuard Rugged Case with Kickstand",
    category: "Cases",
    price: 29.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
    description: "Military-grade drop protection with dual-layer shock absorption and built-in kickstand.",
    compatibleWith: "iPhone 15 / 14 / 13 & Galaxy S24",
    inStock: true,
    featured: true
  },
  {
    id: "acc-2",
    name: "Ultra-Clear Tempered Glass Screen Protector (2-Pack)",
    category: "Screen Protectors",
    price: 14.99,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=600",
    description: "9H hardness scratch-resistant tempered glass with oleophobic fingerprint-resistant coating.",
    compatibleWith: "Universal Phone Models",
    inStock: true,
    featured: true
  },
  {
    id: "acc-3",
    name: "GaN 65W Fast Wall Charger + USB-C Cable",
    category: "Chargers & Cables",
    price: 39.99,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600",
    description: "Compact dual-port fast charger that powers up your phone, tablet, or MacBook rapidly and safely.",
    compatibleWith: "All USB-C Devices",
    inStock: true,
    featured: true
  },
  {
    id: "acc-4",
    name: "SonicPod Pro True Wireless Earbuds",
    category: "Audio",
    price: 49.99,
    rating: 4.6,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
    description: "Immersive sound, active noise cancellation, touch controls, and 28-hour battery with charging case.",
    compatibleWith: "Bluetooth Enabled Devices",
    inStock: true,
    featured: true
  }
];

export const FAQS = [
  {
    question: "Do I need an appointment for a repair?",
    answer: "Walk-ins are always welcome during store hours! However, booking an appointment online guarantees priority service and faster turnaround."
  },
  {
    question: "How long do most phone repairs take?",
    answer: "Most screen and battery replacements are completed in 30 to 45 minutes while you wait in store."
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer: "Yes! All repairs come with a standard 90-day warranty covering parts and craftsmanship."
  },
  {
    question: "Do you fix computers and tablets as well as phones?",
    answer: "Yes, our certified technicians repair laptops (MacBook & PC), iPads, tablets, smartwatches, and game consoles."
  }
];
