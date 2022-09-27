import { Component } from 'react';

import { fetchImages } from './api';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modsl';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    totalImages: 0,
    isLoading: false,
    isModalOpen: false,
    modalInfo: {
      url: '',
      alt: '',
    },
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.getImages();
    }
  }

  async getImages() {
    const { page, query } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { newImages, totalImages } = await fetchImages(query, page);

      if (newImages.length === 0) {
        throw new Error(`There is no results for ${query} :( Try again`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalImages,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const newQuery = e.target.elements.searchQuery.value;

    if (query !== newQuery) {
      this.setState({
        images: [],
        page: 1,
        error: null,
        showLoadMoreBtn: false,
        totalImages: 0,
        query: newQuery,
      });
    }
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (url, alt) => {
    this.setState({
      isModalOpen: true,
      modalInfo: {
        url,
        alt,
      },
    });
  };

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({
        isModalOpen: false,
        modalInfo: {
          url: '',
          alt: '',
        },
      });
    }
  };

  render() {
    const { images, isLoading, isModalOpen, modalInfo, error, totalImages } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onFormSubmit} isSubmiting={isLoading} />

        {isLoading && <Loader />}

        {error && <p>{error}</p>}

        {isModalOpen && (
          <Modal
            imageURL={modalInfo.url}
            alt={modalInfo.alt}
            closeModal={this.closeModal}
          />
        )}

        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {images.length < totalImages && images.length > 0 && (
          <Button onClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
