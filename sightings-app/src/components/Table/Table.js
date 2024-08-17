import "./Table.css";
import "./SpeciesTags.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chips } from 'primereact/chips';

import { Tag } from 'primereact/tag';
        
import { generateClient } from "aws-amplify/api";
import { listObservations } from "../../graphql/queries";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';

const client = generateClient();

function Table() {
  const [sightings, setSightings] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    fetchSightings();
  }, []);
  
  async function fetchSightings() {
    try {
      const sightingData = await client.graphql({
        query: listObservations,
      });
      const sightings = sightingData.data.listObservations.items;
      setSightings(sightings);
      console.log(sightings);
    } catch (err) {
      console.log("error fetching Sightings");
    }
  }
  const rowExpansionTemplate = (data) => {
    return (
    <div className="report-details">
      <div className="report-row">
        <span className="label-value-pair"><strong>Reporter:</strong> {data.reporter}</span>
        <span className="label-value-pair"><strong>Report Type:</strong> {data.reportType}</span>
        <span className="label-value-pair"><strong>Group:</strong> {data.group}</span>
        <span className="label-value-pair"><strong>Condition:</strong> {data.condition}</span>
        <span className="label-value-pair"><strong>Stage:</strong> {data.stage}</span>
        <span className="label-value-pair"><strong>Sex:</strong> {data.sex}</span>
        <span className="label-value-pair"><strong>Links:</strong> {data.urlLinks}</span>
      </div>
      
      <div className="report-row">
        <span className="label-value-pair">
          <strong>Size & Dimensions:</strong>
          Width - {data.width} cm, Length - {data.length} cm, Disk length - {data.diskLength} cm, Weight - {data.weight} g
        </span>
        <span className="label-value-pair"><strong>Substrate:</strong> {data.substrate}</span>
      </div>

      <div className="report-row">
        <span className="label-value-pair"><strong>SightingId:</strong> {data.id}</span>
        <span className="label-value-pair"><strong>Created by:</strong> {data.byUser}</span>
        <span className="label-value-pair"><strong>Created at:</strong> {data.createdAt}</span>
        <span className="label-value-pair"><strong>Updated at:</strong> {data.updatedAt}</span>
      </div>
    </div>

    
  )

  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className={`tag ${rowData.species_tag}`}>
        {rowData.speciesScienceName}
      </div>
    );
  };

  const labelsBodyTemplate = (rowData) => {
    const labels = rowData.labels || [];
    return (
        <div className="labels-container">
            {labels.map((label, index) => (
                <Tag key={index} value={label} className="custom-tag" removable />
            ))}
        </div>
    );
  };

  const mediaBodyTemplate = (rowData) => {
    const handleImageClick = () => {
      // Assuming rowData.Media is an array of image paths
      setCurrentImages(rowData.Media);
      setDisplayDialog(true);
    };
    
    if (rowData.Media && rowData.Media.length > 0 && rowData.Media[0]) {
      console.log("row data media >>>", rowData.Media[0]);
      // Use the first media URL for the image, accessing the 'Image' property of the first item
      return <StorageImage path={rowData.Media[0]} alt="Sighting Media" style={{ width: '80px', height: 'auto' }} onClick={handleImageClick} />;
    }
    // Return a placeholder or nothing if no media is available
    return <span>No Image Available</span>;
  };

  
  
  const imageSlideshowDialog = () => {
    const imageTemplate = (item) => {
        return (       
          <div style={{ margin: '10px 0' }}>   
            <StorageImage path={item} alt="Sighting Media" style={{             
              maxWidth: '60%', 
              maxHeight: '60vh', // Limit the height to avoid overflow
              display: 'block', 
              marginLeft: 'auto', 
              marginRight: 'auto'  }} />
          </div>
        );
    };

    return (
        <Dialog 
            header="Image Slideshow" 
            visible={displayDialog} 
            style={{ width: '50vw' }} 
            onHide={() => setDisplayDialog(false)}
            modal
        >
            <Carousel value={currentImages} itemTemplate={imageTemplate} numVisible={1} numScroll={1} />
        </Dialog>
    );
  };



  return (
    <div className="table-area">
      {imageSlideshowDialog()}
      <DataTable
        value={sightings}
        sortMode="multiple"
        resizableColumns
        columnResizeMode="expand"
        removableSort
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        paginator
        rows={10}
        totalRecords={50}
        tableStyle={{ minWidth: '150rem' }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column expander style={{ width: "16px" }} />
        <Column
          field="date"
          header="Date"
          bodyClassName="padded-cell"
          sortable
          filter 
          filterPlaceholder="Search by date"
        />
        <Column
          field="site"
          header="Site"
          bodyClassName="padded-cell"
          sortable
          filter 
          filterPlaceholder="Search by Site"
        />
        <Column
          field="specieCommonName"
          header="Common Name"
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="specie"
          header="Species"
          // body={nameBodyTemplate}
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="count"
          header="Ct."
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="Media"
          header="media"
          body={mediaBodyTemplate}
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="labels"
          header="Labels"
          bodyClassName="padded-cell"
          body={labelsBodyTemplate}
          sortable
        />
      </DataTable>
    </div>
  );
}
export default Table;