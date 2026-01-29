export interface Product {
    id: string;
    name: string;
    category: 'Maternity' | 'Infants' | 'Sarees' | 'Accessories';
    price: number;
    image: string;
    description: string;
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Flexifit Maternity Dress',
        category: 'Maternity',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=2576&auto=format&fit=crop', // Placeholder
        description: 'Comfortable and stylish maternity dress adaptable to changing body shapes.',
        isNew: true,
    },
    {
        id: '2',
        name: 'Traditional Saree with Pockets',
        category: 'Sarees',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop', // Placeholder
        description: 'Handcrafted saree featuring convenient pockets without compromising elegance.',
        isNew: true,
    },
    {
        id: '3',
        name: 'Infant Cotton Set',
        category: 'Infants',
        price: 1299,
        image: 'https://placehold.co/600x400.png?text=Infant+Set',
        description: 'Soft organic cotton set for infants, perfect for sensitive skin.',
    },
    {
        id: '4',
        name: 'Handwoven Silk Stole',
        category: 'Accessories',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2487&auto=format&fit=crop',
        description: 'Luxurious handwoven silk stole to complement any outfit.',
    },
    {
        id: '5',
        name: 'Nursing Friendly Anarkali',
        category: 'Maternity',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=2534&auto=format&fit=crop',
        description: 'Elegant Anarkali suit with discreet nursing access.',
    },
    {
        id: '6',
        name: 'Temple Border Saree',
        category: 'Sarees',
        price: 5500,
        image: 'https://placehold.co/600x400.png?text=Temple+Border+Saree',
        description: 'Classic temple border saree in deep teal and gold.',
    }
];

export async function getProducts(): Promise<Product[]> {
    // Simulate network delay
    return new Promise((resolve) => setTimeout(() => resolve(products), 500));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => setTimeout(() => resolve(products.find(p => p.id === id)), 500));
}
