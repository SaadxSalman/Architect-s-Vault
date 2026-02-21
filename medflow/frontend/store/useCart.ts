import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  isPrescriptionRequired: boolean;
  category: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    const existingItem = state.items.find((i) => i.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((i) =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
}));