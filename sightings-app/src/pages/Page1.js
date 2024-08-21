import { generateClient } from "aws-amplify/api";
import { StorageImage, StorageManager } from "@aws-amplify/ui-react-storage";
import { listMedia } from "../graphql/queries";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import "./Page1.css";

const client = generateClient();

const Page1 = () => {
  const [Media, setMedia] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchMedia() {
    try {
      const MediaData = await client.graphql({
        query: listMedia,
      });
      const Media = MediaData.data.listMedia.items;
      setMedia(Media);
      const loadedState = Media.reduce((acc, item) => ({ ...acc, [item.id]: false }), {});
      setImageLoaded(loadedState);
    } catch (err) {
      console.log("error fetching Media");
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

const filteredMedia = Media.filter(item =>
  (item.specie ? item.specie.toLowerCase().includes(searchQuery) : false) ||
  (item.Date ? item.Date.toLowerCase().includes(searchQuery) : false) ||
  (item.time ? item.time.toLowerCase().includes(searchQuery) : false) ||
  (item.place ? item.place.toLowerCase().includes(searchQuery) : false)
);


  return (
    <div className="gallery-page">
      <div className="search-container">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <span className="pi pi-search"></span> {/* PrimeReact search icon */}
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Search by any field..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search"
          />
        </InputGroup>
      </div>
      <div className="gallery">
        {filteredMedia.map((item) => (
          <Card key={item.id} style={{ width: '18rem' }}>
            <div className="card-img-container">
              <Card.Img
                variant="top"
                as={StorageImage}
                alt={item.specie}
                path={item.Image}
                onLoad={() => handleImageLoad(item.id)}
                className={`card-img ${imageLoaded[item.id] ? 'img-visible' : ''}`}
              />
              {!imageLoaded[item.id] && (
                <div className="spinner-container">
                  <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </div>
            <Card.Body>
              <Card.Title>{item.specie}</Card.Title>
              <Card.Text>
                {item.Date} at {item.time}
                <p>{item.place}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page1;
