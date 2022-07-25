import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Product, CartItem } from '@src/shared/interfaces/product.interface';

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<{ message: string }>;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  message: {
    success: string | null;
    error: string | null;
  };
}

const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || [],
    message: {
      success: null,
      error: null,
    },
    addToCart: async product =>
      new Promise<{ message: string }>((resolve, reject) => {
        const { cartItems } = get();
        const newCartItems = [...cartItems];
        try {
          // check if product not in cart hence add it
          if (!cartItems.find(item => item._id === product._id)) {
            newCartItems.push({ ...product, quantity: 1 });
          } else {
            const itemIdx = cartItems.findIndex(
              item => item._id === product._id
            );
            newCartItems[itemIdx]!.quantity += 1;
          }
          // save cart items in localstorage
          localStorage.setItem('cartItems', JSON.stringify(newCartItems));
          set({
            cartItems: newCartItems,
            message: {
              error: null,
              success: 'Product has been added to cart',
            },
          });
          resolve({ message: 'Product has been added in cart' });
        } catch (error: any) {
          console.log(error);
          reject("Can't add product in cart");
        }
      }),
    removeFromCart: id => {
      const { cartItems } = get();
      const newCartItems = cartItems.filter(item => item._id !== id);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      set({
        cartItems: newCartItems,
      });
    },
    clearCart: () => {
      localStorage.removeItem('cartItems');
      set({
        cartItems: [],
      });
    },
  }))
);

export default useCartStore;
