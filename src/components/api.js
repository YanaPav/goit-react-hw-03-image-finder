import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api'
const API_KEY = '29202776-9b3585c3b3d3f710da9aa4b13';

export const fetchImages = async (value, page) => {
    const response = await axios.get(
        `/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
  const imagesData = await response.data;
  const newImages = imagesData.hits;
  const totalImages = imagesData.totalHits
  return {newImages, totalImages}
}