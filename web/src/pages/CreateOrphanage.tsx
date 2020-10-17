import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../assets/styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmid(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Orphanage registered!');

    history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    let newImages = [...images]; 
    const selectedImages = Array.from(event.target.files);
    newImages = newImages.concat(selectedImages);
    
    const selectedImagesPreview = newImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setImages(newImages);
    setPreviewImages(selectedImagesPreview);
  }

  function handlerRemoveImage(indexSelected: number) {
    const newImages = [...images];
    const newImagesPreview = [...previewImages];
    newImages.splice(indexSelected, 1);
    newImagesPreview.splice(indexSelected, 1);

    setImages(newImages);
    setPreviewImages(newImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmid} className="create-orphanage-form">
          <fieldset>
            <legend>Data</legend>

            <Map
              center={[51.1113114, 17.039]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                About <span>Limit of 300 character</span>
              </label>
              <textarea
                id="about"
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Images</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-container">
                      <img src={image} alt={name} />
                      <button type="button" onClick={() => handlerRemoveImage(index)}>
                        <FiX size={24} color="#FF669D" />
                      </button>
                    </div>
                  );
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visits</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening hours</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on weekends</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
