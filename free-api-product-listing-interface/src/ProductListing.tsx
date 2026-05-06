import React, { useEffect } from "react";

// Define a simple interface for better DX
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
}

export default function ProductListing() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Featured Collection
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              {/* Image Container */}
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-90 transition-opacity duration-300">
                <img
                  src={product.thumbnail || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="mt-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-700 truncate pr-2">
                    {product.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2 italic">
                  {product.description}
                </p>

                {/* Modern "Add to Cart" Button */}
                <button className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
