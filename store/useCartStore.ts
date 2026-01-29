import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

interface CartItem extends Product {
    quantity: number;
    size?: string;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, size?: string) => void;
    removeItem: (productId: string, size?: string) => void;
    updateQuantity: (productId: string, quantity: number, size?: string) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, size) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id && item.size === size);
                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id && item.size === size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1, size }] });
                }
            },
            removeItem: (productId, size) => {
                set({ items: get().items.filter((item) => !(item.id === productId && item.size === size)) });
            },
            updateQuantity: (productId, quantity, size) => {
                if (quantity <= 0) {
                    set({ items: get().items.filter((item) => !(item.id === productId && item.size === size)) });
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === productId && item.size === size ? { ...item, quantity } : item
                        ),
                    });
                }
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
);
