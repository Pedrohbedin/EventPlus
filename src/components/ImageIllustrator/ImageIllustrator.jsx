import React from "react";
import ImageDefault from "../../assets/images/default-image.jpeg";

const ImageIllustrator = ({ alterText, imageRender = ImageDefault, additionalClass = "" }) => {
  return (
    <figure className="ilustrator-box">
      <img
        src={imageRender}
        alt={alterText}
        className={`illustrator-box__image ${additionalClass}`}
      />
    </figure>
  );
};

export default ImageIllustrator;
