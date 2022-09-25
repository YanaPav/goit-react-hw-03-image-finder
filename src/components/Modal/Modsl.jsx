import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    const { closeModal, imageURL, tags } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={imageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
