import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const InputContainer = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  border-radius: 112px;
  cursor: pointer;
  background: transparent;

  @media screen and (max-width: 768px) {
    width: ${({ mobilewidth }) => (mobilewidth ? mobilewidth : "40%")};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-direction: row;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border-radius: 112px;
  font-size: 1rem;
  border: 1px solid grey;
  background: transparent;
  width: 50%;
`;

function SearchBar({ width, value, onChange, mobilewidth }) {
  const navigate = useNavigate();

  return (
    <InputContainer width={width} mobilewidth={mobilewidth}>
      <InputWrapper>
        <IoSearchOutline
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
          }}
        />
        <Input
          type="text"
          id="search"
          placeholder="Search ..."
          value={value}
          onChange={onChange}
        />
      </InputWrapper>
    </InputContainer>
  );
}

export default SearchBar;
