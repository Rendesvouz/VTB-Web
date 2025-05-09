import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  background: #000;
  border-radius: 8px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 1rem;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const NavItem = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #05a30b;
  border-radius: 20px;
  background: ${(props) => (props.active ? "#05A30B" : "#000")};
  color: ${(props) => (props.active ? "#fff" : "#fff")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #05a30b;
    color: #fff;
  }
`;

function CustomSwitch({ seletionMode, arrayData, onSelectSwitch }) {
  const [activeTab, setActiveTab] = useState(seletionMode);

  const updateSwitchData = (value) => {
    setActiveTab(value);
    onSelectSwitch(value);
  };

  return (
    <Container>
      <Nav>
        {arrayData?.map((tab, i) => (
          <NavItem
            key={tab}
            active={activeTab === i}
            onClick={() => {
              updateSwitchData(i);
            }}
          >
            {tab?.optionTitle}
          </NavItem>
        ))}
      </Nav>
    </Container>
  );
}

export default CustomSwitch;
