import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImgUrl, tags, onClick }) => {
  return (
    <li className={css.imageGalleryItem} onClick={onClick}>
      <img src={smallImgUrl} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  smallImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
