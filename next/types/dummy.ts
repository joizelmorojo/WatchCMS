import { ProductCategory } from "./product";

export const productCategories: ProductCategory[] = [
  {
    title: "Ladies Watches",
    products: [
      {
        title: "Elegant Rose Gold",
        price: "$299",
        image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347",
        description: "Classic elegance meets modern design"
      },
      {
        title: "Diamond Collection",
        price: "$499",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e",
        description: "Luxurious diamond-studded timepiece"
      }
    ]
  },
  {
    title: "Diamond Watches",
    products: [
      {
        title: "Royal Diamond",
        price: "$999",
        image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793",
        description: "Premium diamond-encrusted watch"
      },
      {
        title: "Crystal Elite",
        price: "$799",
        image: "https://images.unsplash.com/photo-1619946928632-abefa12506e2",
        description: "Sophisticated crystal design"
      }
    ]
  },
  {
    title: "Sports Watches",
    products: [
      {
        title: "Chronograph Pro",
        price: "$399",
        image: "https://images.unsplash.com/photo-1623998022290-a74f8cc36563",
        description: "Professional sports chronograph"
      },
      {
        title: "Diver's Edition",
        price: "$599",
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6",
        description: "Water-resistant diving watch"
      }
    ]
  }
];