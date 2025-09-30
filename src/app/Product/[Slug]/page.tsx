import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails/component'; // Adjust the import path
import { Product } from '@/types/product'; 

// Function to call the external backend API
async function fetchProductData(slug: string): Promise<Product | null> {
    
    // 1. Get the base URL from the secure environment variable
    const API_BASE = process.env.BACKEND_API_URL;
    if (!API_BASE) {
        console.error("BACKEND_API_URL is not set.");
        return null;
    }

    const url = `${API_BASE}/products/${slug}`;
    
    try {
        // 2. Use the native fetch API to call the external backend
        const res = await fetch(url, {
            // Optional: Next.js Caching options
            next: { revalidate: 60 * 60 } // Revalidate data every hour
        });

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            console.error(`Backend API call failed with status: ${res.status}`);
            return null;
        }

        // 3. Cast the JSON response to the shared TypeScript interface (Product)
        const productData: Product = await res.json();
        return productData;

    } catch (error) {
        console.error(`Error connecting to backend API at ${url}:`, error);
        return null;
    }
}

// Next.js Server Component
export default async function ProductPage({ params }: { params: { slug: string } }) {
    
    // 4. Execute the connection/fetch during server rendering
    const product = await fetchProductData(params.slug);

    if (!product) {
        notFound(); 
    }

    // 5. Pass the fetched data to the UI component
    return (
        <main>
            <ProductDetails product={product} />
        </main>
    );
}