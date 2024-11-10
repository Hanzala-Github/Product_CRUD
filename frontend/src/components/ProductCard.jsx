import React from "react";
import styled from "styled-components";
import { MdOutlineSystemUpdateAlt, MdDelete } from "react-icons/md";
import { formateTotalDollars } from "../utility/currencyFormatter";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";

export function ProductCard({ product, onUpdateClick }) {
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error(message || "Error deleting product", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      toast.success("🦄 Product deleted", {
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
    }
  };

  return (
    <Product>
      <ImageWrapper>
        <ProductImg src={product.image} />
      </ImageWrapper>
      <Text1Wrapper>
        <Name>{product.name}</Name>
        <Price>{formateTotalDollars(product.price)}</Price>
      </Text1Wrapper>
      <ButtonsWrapper>
        <UpdateBtn onClick={onUpdateClick}>
          <MdOutlineSystemUpdateAlt />
        </UpdateBtn>
        <DeleteBtn onClick={() => handleDeleteProduct(product._id)}>
          <MdDelete />
        </DeleteBtn>
      </ButtonsWrapper>
    </Product>
  );
}

// ...............This is the styled-components part..........//

const Product = styled.div`
  width: 400px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
  background-color: #382f6b;
  color: #fff;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  transition: all 0.4s;

  &:hover {
    transform: translateY(-7px);
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
`;
const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.3);
  object-position: center;
`;
const Text1Wrapper = styled.div`
  padding: 10px;
`;
const Name = styled.h3`
  font-size: 20px;
`;
const Price = styled.p`
  margin-top: 7px;
  font-size: 14px;
`;
const ButtonsWrapper = styled.div`
  padding-left: 10px;
  margin: 4px 0px 10px 0px;

  button {
    padding: 5px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    font-size: 15px;
  }
`;
const UpdateBtn = styled.button`
  background-color: #80d8fe;
`;
const DeleteBtn = styled.button`
  background-color: #fb3c62;
`;

// ........another function...........//
