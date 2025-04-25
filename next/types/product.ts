export interface Product {
    title: string;
    price: string;
    image: string;
    description: string;
}
  
export interface ProductCategory {
    title: string;
    products: Product[];
}