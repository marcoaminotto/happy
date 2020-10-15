import Image from '../models/Images';
require('dotenv').config();

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${process.env.URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
