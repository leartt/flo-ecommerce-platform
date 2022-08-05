import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LoginRequestData } from '@src/shared/interfaces/auth.interface';
import axios from '@src/shared/http-client';

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  message: {
    success: string | null;
    error: string | null;
  };
  loading: boolean;
  login: (loginData: LoginRequestData) => void;
  getLoggedInUser: () => void;
  setUser: (user: any) => void;
  getUsers: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    // persist(
    /* store---------- */
    (set, get) => ({
      user: null,
      message: {
        success: null,
        error: null,
      },
      isLoggedIn: !!localStorage.getItem('access_token'),
      loading: false,
      setUser: user => {
        set({ user });
      },

      // user login
      login: async loginData => {
        set({ loading: true });
        try {
          const { data } = await axios.post('/auth/login', loginData);
          if (data.success) {
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            set({
              user: data.user,
              isLoggedIn: true,
              message: {
                error: null,
                success: 'User has been logged in successfully',
              },
            });
          }
        } catch (error: any) {
          set({
            message: {
              error: error.response?.data?.message || error?.message || error,
              success: null,
            },
          });
        } finally {
          set({ loading: false });
        }
      },

      getLoggedInUser: async () => {
        set({ loading: true });
        try {
          const { data } = await axios.post('/auth/me');
          if (data.user) {
            set({ user: data.user });
          }
        } catch (error: any) {
          set({
            message: {
              error: error.response?.data?.message || error?.message || error,
              success: null,
            },
          });
        } finally {
          set({ loading: false });
        }
      },

      getUsers: async () => {
        const data = await (
          await fetch('http://localhost:5500/api/v1/users')
        ).json();
        set({ user: data.users[0] });
      },
    })
    /* ---------store */
    //   {
    //     name: 'auth-storage',
    //     getStorage: () => sessionStorage,
    //   }
    // )
  )
);

export default useAuthStore;
