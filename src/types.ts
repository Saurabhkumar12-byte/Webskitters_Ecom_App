
// src/types.ts
export interface User {
  uid: string;
  email: string | null; // Allow null as Firebase's User can have null email
  displayName?: string | null;
  photoURL?: string | null;
  // Add other fields as needed
}

  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
  }
  
  export interface RootState {
    auth: AuthState;
    product: ProductState;
  }
  
  
  export interface FormData {
    email: string;
    password: string;
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
  }
  
  export interface FormValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
  }
  
  
  