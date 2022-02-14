import React, { useState } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";




export function ProductPhotoGallery() {
  return (
    <div className={styles.photo}>
      <div className={styles.images}>
        <ol>
          {images.map((image) => (
            <li key={image}>
              <img src={image} alt="wallet" className={styles.image}></img>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
