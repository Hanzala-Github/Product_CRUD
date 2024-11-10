import React, { useState } from "react";
import styled from "styled-components";
import { useProductStore } from "../store/product";

export function UpdateModel({ product, closeModel }) {
  const { updateProduct } = useProductStore();
  const [productData, setProductData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (pid, updatedProduct) => {
    updateProduct(pid, updatedProduct);
    closeModel();
  };

  // .................This is the Jsx return part.............//

  return (
    <Model>
      <TextWrapper1>
        <Text1>Update Product</Text1>
        <Close onClick={closeModel}>&times;</Close>
      </TextWrapper1>
      <ModelForm>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="image"
          name="image"
          value={productData.image}
          onChange={handleChange}
        />
      </ModelForm>
      <ModelFooter>
        <Update
          onClick={() => handleSubmit(productData._id, { ...productData })}
        >
          Update
        </Update>
        <Cancel onClick={closeModel}>Cancel</Cancel>
      </ModelFooter>
    </Model>
  );
}

//................ This is the styled-components part ...........//

const Model = styled.div`
  width: 500px;
  border-radius: 5px;
  background-color: #262048;
  padding-inline: 25px;
  padding-block: 15px;
`;
const TextWrapper1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;
const Text1 = styled.h2`
  font-weight: 500;
`;
const Close = styled.span`
  font-size: 30px;
  font-weight: 500;
`;
const ModelForm = styled.form`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 13px;

  input {
    width: 100%;
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
const ModelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 30px;
  gap: 10px;

  button {
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    color: #fff;
    border: 1px solid #555;
    cursor: pointer;
  }
`;
const Update = styled.button`
  background-color: #71d2ff;
`;
const Cancel = styled.button`
  background-color: transparent;
`;
