import "./Table.css";
import "./SpeciesTags.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';   
import { generateClient } from "aws-amplify/api";
import { listObservations } from "../../graphql/queries";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { getUrl } from 'aws-amplify/storage';
import 'primeicons/primeicons.css';
const client = generateClient();

function ImageSlideshowDialog({ currentImages, displayDialog, setDisplayDialog }) {
    const [mediaContent, setMediaContent] = useState([]);
  
    useEffect(() => {
      const loadMedia = async () => {
        const loadedMedia = await Promise.all(currentImages.map(async (item) => {
          if (item.isVideo) {
            const linkToStorageFile = await getUrl({ path: item.url });
            return (
              <video width="100%" controls key={item.url}>
                <source src={linkToStorageFile.url.toString()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          } else {
            return (
              <div style={{ margin: '10px 0' }} key={item.url}>   
                <StorageImage path={item.url} alt="Sighting Media" style={{
                  maxWidth: '60%', 
                  maxHeight: '60vh', 
                  display: 'block', 
                  marginLeft: 'auto', 
                  marginRight: 'auto' }} />
              </div>
            );
          }
        }));
        setMediaContent(loadedMedia);
      };
  
      if (currentImages.length > 0) {
        loadMedia();
      }
    }, [currentImages]);
  
    return (
      <Dialog 
        header="Observation media" 
        visible={displayDialog} 
        style={{ width: '50vw' }} 
        onHide={() => setDisplayDialog(false)}
        modal
      >
        <Carousel value={mediaContent} numVisible={1} numScroll={1} />
      </Dialog>
    );
  }
  export default ImageSlideshowDialog;