import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: Product[];
  favourite: Product[];
}

const initialState: CartState = {
  items: [],
  favourite: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    test: (state, action: PayloadAction<Product>) => {
      console.log(action.payload);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingProduct) {
        ToastAndroid.show(
          'This item is already in your cart!',
          ToastAndroid.SHORT,
        );
        // toast.show('This item is already in your cart!', {
        //   type: 'warning',
        //   duration: 4000,
        //   placement: 'bottom',
        // });
      } else {
        state.items.push({...action.payload, quantity: 1});
        // setTimeout(
        //   () => ToastAndroid.show('added to cart!', ToastAndroid.SHORT),
        //   5000,
        // );
      }

      // localStorage.setItem("cartItem", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      ToastAndroid.show('items removed', ToastAndroid.SHORT);
    },

    clearCart: state => {
      state.items = [];
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    addToFavourite: (state, action: PayloadAction<Product>) => {
      const existingFavourite = state.favourite.find(
        item => item.id === action.payload.id,
      );
      if (existingFavourite) {
        ToastAndroid.show(
          'This item is already in your Favourite!',
          ToastAndroid.SHORT,
        );
      } else {
        state.favourite.push(action.payload);
        // ToastAndroid.show('Added to Favourite!', ToastAndroid.SHORT);
      }
    },

    removeFromFavourite: (state, action: PayloadAction<string>) => {
      state.favourite = state.favourite.filter(
        item => item.id !== action.payload,
      );
    },

    clearFavourite: state => {
      state.favourite = [];
    },
  },
});

export const {
  test,
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  addToFavourite,
  removeFromFavourite,
  clearFavourite,
} = cartSlice.actions;
export default cartSlice.reducer;
