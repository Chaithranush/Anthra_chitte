import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

export const READYMADE_ADDON = 75;
export const POCKETS_ADDON = 40;
export const PLATFORM_FEE = 30;
export const FREE_PLATFORM_FEE_THRESHOLD = 2000;

export type SareeConfig = {
    sareeType: 'normal' | 'readymade';
    size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
    skirtLength?: 'free' | '42' | '40' | '38' | '36'; // Saree skirt length: free size or customized (inch)
    pockets?: 'with' | 'without';
    palluType?: 'open' | 'pleated';
    palluLength?: '32' | '37' | '42';
    palluWidth?: '3' | '5' | '7';
    readymadeAddon?: number;
    pocketsAddon?: number;
};

export function getSareeItemPrice(item: { price: number; config?: SareeConfig }): number {
    const addons = (item.config?.readymadeAddon ?? 0) + (item.config?.pocketsAddon ?? 0);
    return item.price + addons;
}

interface CartItem extends Product {
    quantity: number;
    size?: string;
    config?: SareeConfig;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, size?: string, config?: SareeConfig) => void;
    removeItem: (productId: string, size?: string, config?: SareeConfig) => void;
    updateQuantity: (productId: string, quantity: number, size?: string, config?: SareeConfig) => void;
    clearCart: () => void;
    totalItems: () => number;
    subtotalPrice: () => number;
    platformFee: () => number;
    totalPrice: () => number;
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            favorites: [],
            addItem: (product, size, config) => {
                const items = get().items;
                const existingItem = items.find(
                    (item) =>
                        item.id === product.id &&
                        item.size === size &&
                        JSON.stringify(item.config || {}) === JSON.stringify(config || {})
                );
                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id &&
                            item.size === size &&
                            JSON.stringify(item.config || {}) === JSON.stringify(config || {})
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1, size, config }] });
                }
            },
            removeItem: (productId, size, config) => {
                const configStr = JSON.stringify(config || {});
                set({
                    items: get().items.filter(
                        (item) =>
                            !(
                                item.id === productId &&
                                item.size === size &&
                                JSON.stringify(item.config || {}) === configStr
                            )
                    ),
                });
            },
            updateQuantity: (productId, quantity, size, config) => {
                const configStr = JSON.stringify(config || {});
                if (quantity <= 0) {
                    set({
                        items: get().items.filter(
                            (item) =>
                                !(
                                    item.id === productId &&
                                    item.size === size &&
                                    JSON.stringify(item.config || {}) === configStr
                                )
                        ),
                    });
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === productId &&
                            item.size === size &&
                            JSON.stringify(item.config || {}) === configStr
                                ? { ...item, quantity }
                                : item
                        ),
                    });
                }
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            subtotalPrice: () => get().items.reduce((acc, item) => acc + getSareeItemPrice(item) * item.quantity, 0),
            platformFee: () => {
                const subtotal = get().items.reduce((acc, item) => acc + getSareeItemPrice(item) * item.quantity, 0);
                return subtotal > 0 && subtotal < FREE_PLATFORM_FEE_THRESHOLD ? PLATFORM_FEE : 0;
            },
            totalPrice: () => {
                const subtotal = get().items.reduce((acc, item) => acc + getSareeItemPrice(item) * item.quantity, 0);
                const fee = subtotal > 0 && subtotal < FREE_PLATFORM_FEE_THRESHOLD ? PLATFORM_FEE : 0;
                return subtotal + fee;
            },
            addFavorite: (product) => {
                const favorites = get().favorites;
                if (!favorites.find((p) => p.id === product.id)) {
                    set({ favorites: [...favorites, product] });
                }
            },
            removeFavorite: (productId) => {
                set({ favorites: get().favorites.filter((p) => p.id !== productId) });
            },
            isFavorite: (productId) => {
                return !!get().favorites.find((p) => p.id === productId);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
