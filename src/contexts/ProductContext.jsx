import { createContext, useState, useEffect } from "react";
import productsData from "../data/products.json"; 

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const storedProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        );
        if (storedProducts.length > 0) {
          setProducts(storedProducts);
        } else {
          const productList = productsData.list_products
          setProducts(productList);
          localStorage.setItem("products", JSON.stringify(productList));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      masp: `SP${Date.now()}`, 
    };
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const updateProduct = (masp, updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.masp === masp ? { ...product, ...updatedProduct } : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const deleteProduct = (masp) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.masp !== masp
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const getProductById = (masp) => {
    return products.find((product) => product.masp === masp);
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
