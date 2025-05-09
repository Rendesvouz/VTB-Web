import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";
import EllipsisMenu from "./EllipsisMenu";

const Trigger = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

function Ellipsis({
  playlistItem,
  showLikeSection,
  ellipsisColor,
  ellipsisFontSize,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const triggerRef = useRef(null);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (triggerRef.current && !triggerRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Trigger ref={triggerRef}>
      <FaEllipsisH
        onClick={handleToggleMenu}
        style={{ color: ellipsisColor, fontSize: ellipsisFontSize }}
      />
      {showMenu && (
        <EllipsisMenu
          playlistItem={playlistItem}
          showLikeSection={showLikeSection}
        />
      )}
    </Trigger>
  );
}

export default Ellipsis;
