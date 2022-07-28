import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from '@src/shared/http-client';
import {
  Product,
  ProductFilter,
  Category,
  Color,
} from '@src/shared/interfaces/product.interface';

interface ProductState {
  product: Product | null;
  products: Product[];
  filter: ProductFilter;
  categoriesData: Category[];
  colorsData: Color[];
  searchQuery: string;
  sortChoice: string;
  setFilter: (filter: any) => void;
  setSearchQuery: (query: string) => void;
  setSortChoice: (choice: string) => void;
  setCategoriesData: (data: any[]) => void;
  setColorsData: (data: any[]) => void;
  isLoading: boolean;
  message: {
    success: string | null;
    error: string | null;
  };
  getProducts: () => void;
  getProductById: (id: string | number) => void;
}

const useProductStore = create<ProductState>()(
  devtools((set, get) => ({
    product: null,
    products: [],
    filter: {
      categories: [],
      colors: [],
      price: [0, 3000],
    },
    searchQuery: '',
    sortChoice: '',
    categoriesData: [],
    colorsData: [],
    isLoading: false,
    message: {
      success: null,
      error: null,
    },
    setFilter: filter => {
      set({
        filter,
      });
    },
    setSearchQuery: query => {
      set({ searchQuery: query });
    },
    setSortChoice: choice => {
      set({ sortChoice: choice });
    },
    setCategoriesData: data => {
      set({ categoriesData: data });
    },
    setColorsData: data => {
      set({ colorsData: data });
    },
    getProducts: async () => {
      set({ isLoading: true });
      try {
        const { data } = await axios.get('/products');
        if (data.success) {
          set({ products: data.products });
        }
      } catch (error: any) {
        set({
          message: {
            success: null,
            error: error.response?.data?.message || error?.message || error,
          },
        });
      } finally {
        set({ isLoading: false });
      }
    },
    // get product by id
    getProductById: async id => {
      set({ isLoading: true });
      try {
        const { data } = await axios.get(`/products/${id}`);
        if (data.success) {
          set({ product: data.product });
        }
      } catch (error: any) {
        set({
          message: {
            success: null,
            error: error.response?.data?.message || error?.message || error,
          },
        });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useProductStore;
