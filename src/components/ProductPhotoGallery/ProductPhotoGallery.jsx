import React, { useState } from 'react';
import styles from "./ProductPhotoGallery.module.scss";
import { images } from "../PhotoData";




export function ProductPhotoGallery() {
  return (
    <div className={styles.photo}>
      <h1>meow</h1>
      <img src={images[0].img}></img>
    </div>
  );
}
