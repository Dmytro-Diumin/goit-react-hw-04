import style from "./ImageCard.module.css";

const ImageCard = ({ photo, onImageClick }) => {
  return (
    <div
      className={style.imageCard}
      onClick={() => onImageClick(photo, "regular")}
    >
      <img src={photo.urls && photo.urls.small} alt={photo.alt_description} />
      <div className={style.imageInfo}>
        <p>Author: {photo.user.name}</p>
        <p>Created at: {new Date(photo.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ImageCard;
