import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { ProductCard, UpdateModel } from "../components/components";

export function Home() {
  const { fetchProducts, products } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openUpdateModel = (product) => {
    setSelectedProduct(product);
  };

  const closeUpdateModel = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Wrapper>
        <ProductsWrapper>
          <Heading1>Current Products 🚀</Heading1>
          {products.length === 0 && (
            <TextWrapper>
              <Text1>No products found 😢</Text1>
              <Text2>
                <Link to="/create">Create a product</Link>
              </Text2>
            </TextWrapper>
          )}

          <ProductCards>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onUpdateClick={() => openUpdateModel(product)}
              />
            ))}
          </ProductCards>
        </ProductsWrapper>
      </Wrapper>
      {selectedProduct && (
        <ModalWrapper>
          <UpdateModel
            product={selectedProduct}
            closeModel={closeUpdateModel}
          />
        </ModalWrapper>
      )}
    </>
  );
}

// ............This is the styled-components part............//

const Wrapper = styled.div`
  margin: auto;
  max-width: 1200px;
`;
const ProductsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 100px;
  padding: 20px;
`;
const Heading1 = styled.h1`
  margin-top: 30px;
  color: #21b9ff;
`;
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Text1 = styled.h2`
  color: #c8c7c7;
`;
const Text2 = styled.h2`
  a {
    color: #008ccd;
    text-decoration: underline;
  }
`;
const ProductCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  flex-wrap: wrap;
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 100vh;
  width: 100%;
  background-color: #99999940;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  z-index: 17;
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }
`;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
// const Wrapper = styled.div``;
