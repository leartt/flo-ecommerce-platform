export interface Product {
  _id: string;
  name: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  color: any;
  categories: any[];
  ratings: (string | number)[];
  images: string[];
  specifications: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    size: string;
  };
  releaseDate: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFilter {
  categories: string[];
  colors: string[];
  price: [number, number];
}

export interface Category {
  _id: string;
  name: string;
}

export interface Color {
  _id: string;
  slug: string;
  value: string;
}
