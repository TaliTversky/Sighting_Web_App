// import ImageGallery from "../components/ImageGallery/ImageGallery";
import { generateClient } from "aws-amplify/api";
import { StorageImage, StorageManager } from "@aws-amplify/ui-react-storage";
import { listMedia } from "../graphql/queries";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Page1.css";

const client = generateClient();

const Page1 = () => {

  const [Media, setMedia] = useState([]);
  
  async function fetchMedia() {
    try {
      const MediaData = await client.graphql({
        query: listMedia,
      });
      const Media = MediaData.data.listMedia.items;
      setMedia(Media);
      console.log(Media);
    } catch (err) {
      console.log("error fetching Sightings");
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);


  return (
    <div>
      <div className="gallery">
      {Media.map((item) => (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" as={StorageImage} alt={item.specie} path={item.Image} />
        <Card.Body>
          <Card.Title>{item.specie}</Card.Title>
          <Card.Text>
            {item.Date} at {item.time}
            <p>{item.place}</p>
          </Card.Text>
        </Card.Body>
      </Card>

        // <div key={item.id} className="media-card">
        //   <img src={item.Image} alt={item.specie} style={{ width: '100%', height: 'auto' }} />
        //   <div className="media-info">
        //     <h4>{item.specie}</h4>
        //     <p>{item.Date} at {item.time}</p>
        //     <p>{item.place}</p>
        //   </div>
        // </div>
      ))}
    </div>
    </div>
  );
};

export default Page1;
