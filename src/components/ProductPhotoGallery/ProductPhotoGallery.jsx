import React, { useState } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";


export function ProductPhotoGallery({className}) {

  const [currImage, setImage] = useState(images[0]);

  function selectImage() {
    setImage()
  }

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

      <div>
        <img src={currImage} className={styles.currImage}></img>
      </div>
    </div>
  );
}
