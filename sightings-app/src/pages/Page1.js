import { generateClient } from "aws-amplify/api";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { listMedia } from "../graphql/queries";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { InputGroup, FormControl } from 'react-bootstrap';
import "./Page1.css";

// Generate an AWS Amplify client instance
const client = generateClient();

// Define the Page1 functional component
const Page1 = () => {
  // State to store media items fetched from the API
  const [Media, setMedia] = useState([]);
  // State to track the loading status of each image
  const [imageLoaded, setImageLoaded] = useState({});
  // State for the search query input by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch media data from the GraphQL API
  async function fetchMedia() {
    try {
      // Execute the GraphQL query to retrieve media items
      const MediaData = await client.graphql({
        query: listMedia,
      });
      // Extract media items from the response
      const Media = MediaData.data.listMedia.items;
      // Update state with the fetched media items
      setMedia(Media);

      // Initialize the imageLoaded state for each media item
      const loadedState = Media.reduce(
        (acc, item) => ({ ...acc, [item.id]: false }),
        {}
      );
      setImageLoaded(loadedState);
    } catch (err) {
      console.log("error fetching Media", err);
    }
  }

  // useEffect hook to fetch media data when the component mounts
  useEffect(() => {
    fetchMedia();
  }, []);

  // Handler function for when an image finishes loading
  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // Handler function for changes in the search input field
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter media items based on the search query
  const filteredMedia = Media.filter((item) =>
    (item.specie ? item.specie.toLowerCase().includes(searchQuery) : false) ||
    (item.Date ? item.Date.toLowerCase().includes(searchQuery) : false) ||
    (item.time ? item.time.toLowerCase().includes(searchQuery) : false) ||
    (item.place ? item.place.toLowerCase().includes(searchQuery) : false)
  );

  // Render the component UI
  return (
    <div className="gallery-page">
      {/* Search bar */}
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

      {/* Gallery of media items */}
      <div className="gallery">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="media-card">
            {/* Spinner overlay displayed while the image is loading */}
            {!imageLoaded[item.id] && (
              <div className="spinner-overlay">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <div className="card-content">
              {/* Image component that loads the image from storage */}
              <Card.Img
                variant="top"
                as={StorageImage}
                alt={item.specie}
                path={item.Image}
                onLoad={() => handleImageLoad(item.id)}
                className={`card-img ${
                  imageLoaded[item.id] ? "img-visible" : "img-hidden"
                }`}
              />
              {/* Card body containing media details */}
              <Card.Body>
                <Card.Title>{item.specie}</Card.Title>
                <Card.Text>
                  {item.Date} at {item.time}
                  <p>{item.place}</p>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page1;
