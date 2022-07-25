import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from '@src/shared/http-client';
import { Product } from '@src/shared/interfaces/product.interface';

interface ProductState {
  product: Product | null;
  products: Product[];
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
    isLoading: false,
    message: {
      success: null,
      error: null,
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
        const { data } = await axios.get(`/product/${id}`);
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
