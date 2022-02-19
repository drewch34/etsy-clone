import React, { useState, useEffect } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";


export function ProductPhotoGallery({className}) {

  const [currImage, setImage] = useState(images[0]);
  const [currImageIndx, setImageIndx] = useState(0);

  useEffect(() => {
    if (images && images[0]) {
      setImage(images[0]);
      setImageIndx(0);
    }
  });

  const handleSelectedImageChange = (newIndx: number) => {
    if (images && images.length > 0) {
      setImage(images[newIndx]);
      setImageIndx(newIndx);
      if (images?.current[newIndx]) {
        images?.current[newIndx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }
  };

  function handleLeftClick() {
    if(images && images.length > 0) {
      let newIndx = currImageIndx - 1;
      if (newIndx < 0) {
        newIndx = images.length - 1;
      }
      handleSelectedImageChange(newIndx);
    }
  };



  return (
    <div className={`${styles.photo} ${className}`}>
      <div className={styles.images}>
        <ol>
          {images.map((image) => (
            <li key={image}>
              <img src={image} alt="wallet" className={styles.image}></img>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.buttoncont}>
        <button className={`${styles.carouselbtn} ${styles.carselbtnleft}`} onClick={handleLeftClick}>
          lft
        </button>

      </div>

      <div className={styles.currImageCont}>
        <img className={styles.currImage} src={currImage} alt=""></img>
      </div>
    </div>
  );

}

