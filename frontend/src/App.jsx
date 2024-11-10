import React from "react";
import { styled } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/components";
import { Create, Home } from "./pages/pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // This is the Jsx return part

  return (
    <>
      <ToastContainer />
      <MainWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </MainWrapper>
    </>
  );
}

// This is the styled components part
const MainWrapper = styled.div`
  min-height: 100hv;
`;

export default App;
