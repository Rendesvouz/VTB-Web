import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import "../carousel/carousel.css";

function NextXtarCarousel() {
  const slides = [
    {
      src: require("../../assets/1.jpg"),
      alt: "Slide 1",
      title: "Slide 1 Title",
      description: "Slide 1 description text goes here.",
    },
    {
      src: require("../../assets/2.jpg"),
      alt: "Slide 2",
      title: "Slide 2 Title",
      description: "Slide 2 description text goes here.",
    },
    {
      src: require("../../assets/3.jpg"),
      alt: "Slide 3",
      title: "Slide 3 Title",
      description: "Slide 3 description text goes here.",
    },
  ];

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      {slides.map((slide, index) => (
        <div key={index}>
          <img src={slide.image} alt={slide.alt} />
          <p className="legend">{slide.legend}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default NextXtarCarousel;
