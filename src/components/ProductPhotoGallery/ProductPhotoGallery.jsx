import React, { useState, useEffect, useRef } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";
import { arrows } from "../PhotoButtons";

export function ProductPhotoGallery({className}) {

  const [currImage, setImage] = useState(images[0]);
  const [currImageIndx, setImageIndx] = useState(0);




  const handleSelectedImageChange = (newIndx: number) => {
    if (images && images.length > 0) {
      setImage(images[newIndx]);
      setImageIndx(newIndx);
    }

    console.log(newIndx);
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

  function handleRghtClick() {
    if(images && images.length > 0) {
      let newIndx = currImageIndx + 1;
      if (newIndx >= images.length) {
        newIndx = 0;
      }
      handleSelectedImageChange(newIndx);
    }
  };



  return (
    <div className={`${styles.photo} ${className}`}>
      <div className={`${styles.images} ${styles.sub}`}>
        <div>
          {images.map((image, index) => (
            <div key={index} style={{ backgroundImage:`url(${image})`}} className={styles.image} onClick={(e)=> handleSelectedImageChange(index)}>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.buttoncont} ${styles.sub}`}>
        <button  className={`${styles.carouselbtn} ${styles.carselbtnleft}`} >
          <img className={styles.butnimg} src={arrows[0]} alt="" onClick={handleLeftClick}></img>
        </button>

      </div>

      <div className={`${styles.currImageCont} ${styles.sub}`}>
        <img className={styles.currImage} src={currImage} alt=""></img>
      </div>

      <div className={`${styles.buttoncontrght} ${styles.sub}`}>
        <button className={`${styles.carouselbtnrght}`}>
          <img className={styles.butnimg} src={arrows[1]} alt="" onClick={handleRghtClick}></img>
        </button>
      </div>
    </div>
  );

}

