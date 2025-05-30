import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import styles from "./Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousels() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`slide-${index}`} />
          </div>
        ))}
      </Carousel>

      <div className={styles.fadeBottom}></div>
    </div>
  );
}
