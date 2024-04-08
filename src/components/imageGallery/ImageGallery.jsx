import React from "react";
import ImageCard from "../imageCard/ImageCard";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={style.ImageWrap}>
      {photos.map((photo, index) => (
        <li key={photo.id + index}>
          <ImageCard
            key={photo.id + index}
            photo={photo}
            onImageClick={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
