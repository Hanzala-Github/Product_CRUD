import { create } from "zustand";

// export const useProductStore = create((set) => ({
//   products: [],
//   setProducts: (products) => set({ products }),

//   createProduct: async (newProduct) => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       return { success: false, message: "Please fill in all fields" };
//     }

//     const res = await fetch("/api/v1/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProduct),
//     });
//     const data = await res.json();
//     set((state) => ({ products: [...state.products, data.data] }));
//     return { success: true, message: "Product created successfully" };
//   },
// }));

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData.message);
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Failed to create product due to a network error",
      };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("/api/v1/products");
    const data = await res.json();

    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/v1/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ products: state.products.filter((i) => i._id !== pid) }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    console.log(pid);
    const res = await fetch(`/api/v1/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
  },
}));
