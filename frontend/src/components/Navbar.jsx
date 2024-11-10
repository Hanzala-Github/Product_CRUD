import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

export function Navbar() {
  return (
    <Wrapper>
      <Navbars>
        <Logo>
          <Link to="/">Product Store 🛒</Link>
        </Logo>

        <ButtonWrapper>
          <Link to="/create">
            <Button1>
              <CiSquarePlus />
            </Button1>
          </Link>
          <Button2>
            <FaMoon />
          </Button2>
        </ButtonWrapper>
      </Navbars>
    </Wrapper>
  );
}

// This is the styled component part
const Wrapper = styled.div`
  max-width: 1200px;
  background-color: #1d183d;
  margin: auto;
`;
const Navbars = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-direction: column; */
`;

const Logo = styled.h1`
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;

  a {
    color: #21b9ff;
    font-size: 30px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Button1 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  padding: 10px;
  padding-inline: 14px;
  background-color: #80808068;
  border: none;
  color: #fff;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 0px 11px #cac8c8;
  }
`;
const Button2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  padding: 10px;
  background-color: #80808068;
  color: #fff;
  padding-inline: 14px;
  border: none;
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 11px #cac8c8;
  }
`;
