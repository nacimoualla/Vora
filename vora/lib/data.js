export const newArrivals = [
  {
    id: 1,
    name: "NC Headphones",
    price: 299.00,
    description: "Studio quality noise cancellation",
    badge: "New",
    // Premium black headphones image
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Smart Watch S5",
    price: 399.00,
    description: "Health tracking & notifications",
    badge: null, // No badge on this one in the design
    // Minimalist smartwatch image
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Charge Dock",
    price: 79.00,
    description: "Fast wireless charging station",
    badge: "Best Seller",
    // Sleek white charging pad image
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Earbuds Pro",
    price: 199.00,
    description: "Limited edition matte black",
    badge: null,
    // Black wireless earbuds image
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
  }
];
export const productDetail = {
  id: "sonic-anc-1",
  name: "Sonic ANC",
  subtitle: "Series X - Studio Edition",
  price: 349.00,
  originalPrice: 399.00,
  rating: 4.9,
  reviews: 128, // Added a review count to go next to the stars!
  description: "Experience pure sound with industry-leading noise cancellation and 30-hour battery life. Designed for the modern audiophile who demands precision and comfort in every note.",
  
  // High-quality Unsplash placeholders matching the premium headphone vibe
  images: [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1200", // Main hero angle
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1200", // Detail shot
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200", // Lifestyle/Angle 3
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1200"  // Angle 4
  ],
  
  // Colors mapped to the names in your UI with accurate hex codes
  colors: [
    { name: "Black", hex: "#1A1A1A" },
    { name: "Silver", hex: "#EBEBEB" },
    { name: "Blue", hex: "#294BB4" }
  ],
  
  // The specs shown in your bottom grid
  specs: [
    { label: "WEIGHT", value: "250g" },
    { label: "BATTERY", value: "30 Hours" }
  ],
  
  // Expanded data for the accordion/tabs below the main section
  features: [
    "Industry-leading Active Noise Cancellation (ANC)",
    "Custom-tuned 40mm titanium drivers for deep bass",
    "Plush memory foam ear cushions for all-day comfort",
    "Multipoint Bluetooth 5.3 connectivity",
    "Built-in voice assistant compatibility"
  ],
  
  inTheBox: [
    "Sonic ANC Wireless Headphones",
    "Premium hard-shell carrying case",
    "USB-C charging cable",
    "3.5mm audio cable for wired listening",
    "Quick start guide"
  ]
};