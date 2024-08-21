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
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import * as mutations from '../../graphql/mutations';

         
import 'primeicons/primeicons.css';
const client = generateClient();

function Table({ sightings, fetchSightings }) {
  const [expandedRows, setExpandedRows] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    fetchSightings();
  }, []);

  const handleRefresh = () => {
    fetchSightings();
  };
  const getFilteredData = () => {
    if (!globalFilter) return sightings;
  
    return sightings.filter(sighting => {
      // Adjust fields as necessary
      return Object.values(sighting).some(value =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      );
    });
  }

  const exportCSV = () => {
    let csv = 'Name,Species,Count,Date,Site\n'; // Assuming these are your columns
    sightings.forEach((row) => {
      csv += `${row.name},${row.specieCommonName},${row.count},${row.date},${row.site}\n`; // Construct CSV string
    });
  
    // Create a Blob for the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sightings.csv'; // Name the file
    link.click();
  
    // Clean up by revoking the URL and removing the link
    URL.revokeObjectURL(url);
    link.remove();
  };
  

  const handleDeleteSighting = async (id) => {
    try {
      console.log('id >>> ', id)
      const sighting = {
        id: id
      };

      const deletedSighting = await client.graphql({
        query: mutations.deleteObservation,
        variables: { input: sighting }
      });
      console.log(`Deleting sighting with id: ${id}`);
      // After deletion, filter out the deleted sighting from the state
      const updatedSightings = sightings.filter(sighting => sighting.id !== id);
      fetchSightings();
    } catch (error) {
      console.error('Failed to delete the sighting', error);
    }
  };

  const confirmDelete = (id) => {
    console.log("confirm")
    confirmDialog({
      message: 'Are you sure you want to delete this sighting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDeleteSighting(id),
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
            <Button 
                icon="pi pi-pencil" 
                rounded outlined 
                className="p-button-rounded p-button-information p-button-icon-only"
                onClick={() => handleEditSighting(rowData.id)} 
                tooltip="Edit Sighting"
            />
            <Button 
                icon="pi pi-trash" 
                rounded outlined 
                severity="danger"
                onClick={() => confirmDelete(rowData.id)} 
                tooltip="Delete Sighting"
            />
        </div>
    );
};

// Function to handle the edit action
const handleEditSighting = (id) => {
    console.log(`Editing sighting with id: ${id}`);
    // Here you would typically open a dialog or form to edit the sighting
    // This could involve setting a state variable with the current sighting details
    // and showing a modal or another component where the user can edit the details
};

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
        <span className="label-value-pair"><strong>Links:</strong> <a href={data.urlLinks} target="_blank" rel="noopener noreferrer">{data.urlLinks}</a></span>
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
    const handleMediaClick = () => {
      // Assuming rowData.Media is an array of media paths
      setCurrentImages(rowData.Media);
      setDisplayDialog(true);
    };
    
    if (rowData.Media && rowData.Media.length > 0) {
      const firstMedia = rowData.Media[0];
      // Check if the media is a video or image by file extension
      const isVideo = firstMedia.endsWith('.mp4') || firstMedia.endsWith('.mov'); // Add more video formats as needed
  
      if (isVideo) {
        return (
          <video width="80" height="auto" controls onClick={handleMediaClick}>
            <source src={firstMedia} type="video/mp4" /> {/* Adjust the MIME type according to the actual video format */}
            Your browser does not support the video tag.
          </video>
        );
      } else {
        // Use StorageImage for Amplify-specific image handling or <img> if URLs are direct links
        return <StorageImage path={firstMedia} alt="Sighting Media" style={{ width: '80px', height: 'auto' }} onClick={handleMediaClick} />;
      }
    }
    return <span>No Media Available</span>;
  };
  

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="search-wrapper" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={e => setGlobalFilter(e.target.value)} 
          style={{ 
            lineHeight: '1.5', 
            padding: '4px 8px 4px 32px', 
            borderRadius: '15px', 
            border: '1px solid #ccc', 
            background: `url('https://cdn-icons-png.flaticon.com/512/54/54481.png') no-repeat 8px center`, 
            backgroundSize: '16px 16px', 
            width: '250px' // Set a fixed width or adjust as needed
          }} 
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button icon="pi pi-refresh" className="custom-button" tooltip="Refresh" onClick={handleRefresh} />
        <Button icon="pi pi-file-excel" className="p-button-success" tooltip="Export to CSV" onClick={exportCSV} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
  
  
  
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
            header="Observation media" 
            visible={displayDialog} 
            style={{ width: '50vw' }} 
            onHide={() => setDisplayDialog(false)}
            onClick={handleRefresh}
            modal
        >
            <Carousel value={currentImages} itemTemplate={imageTemplate} numVisible={1} numScroll={1} />
        </Dialog>
    );
  };



  return (
    <div className="table-area">
      <ConfirmDialog />
      {imageSlideshowDialog()}
      <DataTable
        value={getFilteredData()}
        header={header}
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
        <Column body={actionBodyTemplate} headerStyle={{ width: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
      </DataTable>
    </div>
  );
}
export default Table;