import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 8px;
  border-bottom: 1px solid grey;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  // padding-bottom: 1rem;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const NavItem = styled.div`
  padding: 0.5rem 1rem;
  color: ${(props) => (props.active ? "#003018" : "#888")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #003018;
    color: #fff;
  }
`;

function ProfileSwitch({ seletionMode, arrayData, onSelectSwitch }) {
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

export default ProfileSwitch;
