import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAnalytics } from "react-icons/io5";
import { SlLike, SlDislike } from "react-icons/sl";
import { FcLike, FcDislike } from "react-icons/fc";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaShareAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { FaXTwitter, FaRegCopy } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import { baseURL } from "../../utils/api-client";
import { API_KEY } from "../../utils/devKeys";
import Modal from "./Modal";
import FormButton from "../form/FormButton";
import {
  shareOnTwitter,
  shareOnWhatsApp,
  shareOnFacebook,
  shareOnInstagram,
  formatWordToRemoveEmptySpace,
} from "../../Library/Common";
import FormInput from "../form/FormInput";

const MenuContainer = styled.div`
  position: absolute;
  top: auto;
  right: 0;
  background: #333;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: visible;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const MenuItemText = styled.span`
  margin-left: 8px;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

function EllipsisMenu({ playlistItem, showLikeSection }) {
  console.log("EllipsisMenu", playlistItem);

  const state = useSelector((state) => state);
  const user = state.user.user;

  const [loading, setLoading] = useState(false);

  const [toggleLike, setToggleLike] = useState(false);
  const [followingStatus, setFollowingStatus] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareUrl = `http://singnify.com/song/${
    playlistItem?.artist_name
      ? formatWordToRemoveEmptySpace(playlistItem?.artist_name)
      : formatWordToRemoveEmptySpace(playlistItem?.label)
  }/${formatWordToRemoveEmptySpace(playlistItem?.track_name)}`;

  const twitterMessage = `Listen to ${formatWordToRemoveEmptySpace(
    playlistItem?.track_name
  )} by ${
    playlistItem?.artist_name
      ? formatWordToRemoveEmptySpace(playlistItem?.artist_name)
      : formatWordToRemoveEmptySpace(playlistItem?.label)
  } via singnify.com, Enjoyy!!!.`;

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const toggleLikeMusic = async () => {
    setToggleLike(!toggleLike);

    const form = new FormData();
    form.append("token", user?.Token);
    form.append("music_id", playlistItem?.music_id);
    form.append("type", "");

    try {
      setLoading(true);
      await axios
        .post(`${baseURL}like-music.php?API_KEY=${API_KEY}`, form)
        .then((res) => {
          console.log("res", res);
          setLoading(false);

          if (res?.data?.status == 200) {
            console.log("toggleLikeMusic data", res?.data);
            toast.success(`You liked this song: ${res?.data?.music?.Name} 😇`);
          } else {
            console.log("toggleLikeMusic message", res?.data?.status);
            setToggleLike(!toggleLike);
          }
        })
        .catch((err) => {
          console.log("toggleLikeMusic err", err);
          setLoading(false);
          setToggleLike(!toggleLike);
        });
    } catch (error) {
      console.log("toggleLikeMusic error", error);
      setToggleLike(!toggleLike);
    }
  };

  const followArtist = async () => {
    setLoading(true);
    setFollowingStatus(true);

    const form = new FormData();
    form.append("token", user?.Token);
    form.append("music_id", playlistItem?.music_id);
    form.append("artist_id", playlistItem?.user_id);

    try {
      await axios
        .post(`${baseURL}toggle-artist-follow.php?API_KEY=${API_KEY}`, form)
        .then((res) => {
          console.log("res", res);
          setLoading(false);

          if (res?.data?.status == 200) {
            console.log("followArtist data", res?.data);
            setFollowingStatus(true);
            toast.success(
              `You followed this artiste: ${res?.data?.music?.Name} 😇`
            );
          } else {
            console.log("followArtist message", res?.data?.status);
            setFollowingStatus(false);
          }
        })
        .catch((err) => {
          console.log("followArtist err", err);
          setLoading(false);
          setFollowingStatus(false);
        });
    } catch (error) {
      console.log("followArtist error", error);
      setFollowingStatus(false);
    }
  };

  const menuItems = [
    {
      name: "Add to Playlist",
      icon: <IoIosAddCircle />,
      action: (item) => console.log(`Add clicked ${item?.label}`),
    },
    {
      name: "Analytics",
      icon: <IoAnalytics />,
      action: (item) => console.log(`Analytics clicked ${item?.label}`),
    },
    {
      name: "Download",
      icon: <FaCloudDownloadAlt />,
      action: (item) => console.log(`Download clicked ${item?.label}`),
    },
  ];

  return (
    <MenuContainer>
      {showLikeSection ? (
        <MenuItem
          onClick={() => {
            toggleLikeMusic();
          }}
        >
          {toggleLike ? <FcDislike /> : <FcLike />}
          <MenuItemText>{toggleLike ? "UnLike" : "Like"}</MenuItemText>
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={() => {
          followArtist();
        }}
      >
        {followingStatus ? <SlDislike /> : <SlLike />}
        <MenuItemText>{followingStatus ? "UnFollow" : "Follow"}</MenuItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          openShareModal();
        }}
      >
        <FaShareAlt />
        <MenuItemText>Share</MenuItemText>
      </MenuItem>
      {menuItems?.map((cur, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            console.log("currr", cur);
            cur?.action(playlistItem);
          }}
        >
          {cur?.icon}
          <MenuItemText>{cur?.name}</MenuItemText>
        </MenuItem>
      ))}
      <Modal isOpen={isShareModalOpen} onClose={closeShareModal} title="Share">
        <SocialButtons>
          <FaWhatsapp
            onClick={() => shareOnWhatsApp(shareUrl, twitterMessage)}
          />
          <FaFacebook
            onClick={() => shareOnFacebook(shareUrl, twitterMessage)}
          />
          <FaInstagram
            onClick={() => shareOnInstagram(shareUrl, twitterMessage)}
          />
          <FaXTwitter
            onClick={() => shareOnTwitter(shareUrl, twitterMessage)}
          />
        </SocialButtons>
        <FormInput type={"text"} value={shareUrl} />
        <FormButton btnIcon={<FaRegCopy />} title={"Copy"} marginTop={"10px"} />
      </Modal>
    </MenuContainer>
  );
}

export default EllipsisMenu;
