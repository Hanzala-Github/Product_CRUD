import React, { useState } from "react";
import styled from "styled-components";
import { useProductStore } from "../store/product";
import { toast, Bounce } from "react-toastify";

export function Create() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast.success("🦄 Product created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(message || "Error creating product", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <Wrapper>
      <CreateProduct>
        <Heading1>Create New Product</Heading1>
        <ProductForm onSubmit={handleAddProduct}>
          <input
            value={newProduct.name}
            name="name"
            type="text"
            placeholder="Product Name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            value={newProduct.price}
            name="price"
            type="text"
            placeholder="Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            value={newProduct.image}
            name="image"
            type="text"
            placeholder="Image URL"
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <AddCartButton type="submit">Add Product</AddCartButton>
        </ProductForm>
      </CreateProduct>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  max-width: 1200px;
  background-color: #1d183d;
  margin: auto;
`;

const CreateProduct = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 10vh);
  padding-top: 15px;
  flex-direction: column;
`;

const Heading1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #ffffff;
`;

const ProductForm = styled.form`
  margin-top: 30px;
  width: 500px;
  padding-block: 20px;
  background-color: #262048;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 13px;
  border-radius: 5px;

  input {
    width: 94%;
    height: 45px;
    background-color: transparent;
    border: 1px solid #555;
    border-radius: 5px;
    padding-left: 10px;
    color: #fff;

    &:focus {
      outline: none;
    }
  }
`;

const AddCartButton = styled.button`
  width: 94%;
  height: 45px;
  background-color: #299ed4;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #1e8bb3;
  }
`;
