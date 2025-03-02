/**
 * Generic type for API responses.
 */
export interface ApiResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}

/**
 * Generic type for API errors.
 */
export interface ApiError {
  error: string;
  status: boolean;
}

/**
 * Generic type for product API response.
 */
export interface ProductResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Generic type for product  detail page for paramslist
 */
export type productParamList = {
  productDetail: {
    productId: number;
  };
};

/**
 * Generic type for checkout page for user details paramslist
 */
export type userDetailsParamList = {
  userDetail: {
    shipping: string;
    phone: string;
    city: string;
    state: string;
    zip: string;
    totalPrice: number; // totalPrice can be either a number or a string depending on how it's formatted
    items: any;
  };
};

/**
 * Generic type for product
 */
export interface Product {
  id: number; // Assuming this is a numeric ID
  title: string;
  price: number;
  image: string;
}

/**
 * Generic type for orderItem
 */
export interface OrderItem {
  _id: string; // Unique identifier for the order item
  quantity: number;
  product: Product; // Product details associated with the order item
}

/**
 * Generic type for paymentDetail
 */

export interface PaymentDetail {
  _id: string; // Unique identifier for the payment detail
  transactionId: string; // Unique transaction identifier
  productId: string; // Reference to the associated product
  orderItems: OrderItem[]; // Array of order items associated with this payment
  transactionDate: string; // Formatted transaction date
}

/**
 * Generic type for payment
 */
export interface PaymentResponse {
  success: boolean; // Indicates success of the response
  paymentDetails: PaymentDetail[]; // Array of payment details
}
