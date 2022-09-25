import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ key, smallImgUrl, tags, onClick }) => {
  return (
    <li key={key} className={css.imageGalleryItem} onClick={onClick}>
      <img src={smallImgUrl} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  key: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  smallImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
