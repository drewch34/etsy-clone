import React, { useState, useEffect } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";
import { arrows } from "../PhotoButtons";

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
        <div>
          {images.map((image) => (
            <div key={image} style={{ backgroundImage:`url(${image})`}} className={styles.image}>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttoncont}>
        <button  className={`${styles.carouselbtn} ${styles.carselbtnleft}`} >
          <image src={arrows[0]} onClick={handleLeftClick}/>
        </button>

      </div>

      <div className={styles.currImageCont}>
        <img className={styles.currImage} src={currImage} alt=""></img>
      </div>
    </div>
  );

}

