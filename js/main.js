import {fetchPhotos, onFetchError, renderPhotos} from './photo/photo.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';

fetchPhotos(renderPhotos, onFetchError);
