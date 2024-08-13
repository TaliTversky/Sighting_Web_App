import "./Table.css";
import "./SpeciesTags.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { generateClient } from "aws-amplify/api";
import { v4 as uuid } from "uuid";
import { createSighting } from "../../graphql/mutations";
import { listObservations } from "../../graphql/queries";

import { useEffect, useState } from "react";

const client = generateClient();

function Table() {
  const [sightings, setSightings] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);

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
      <div>
        <p>Reporter: {data.reporter}</p>
        <p>SightingId: {data.id}</p>
        <p>Created at: {data.createdAt}</p>
        <p>Updated at: {data.updatedAt}</p>
        <p>
          ReportType, Group, Condition, Stage, Sex, MediaURL,Size&Dimension,
          Substrate
        </p>
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className={`tag ${rowData.species_tag}`}>
        {rowData.speciesScienceName}
      </div>
    );
  };

  return (
    <div className="table-area">
      <DataTable
        value={sightings}
        sortMode="multiple"
        removableSort
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        paginator
        rows={10}
        totalRecords={50}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column expander style={{ width: "16px" }} />
        <Column
          field="date"
          header="Date"
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="site"
          header="Site"
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="speciesCommonName"
          header="Common name"
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="specie"
          header="Species"
          body={nameBodyTemplate}
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
          field="reporter"
          header="Reporter"
          bodyClassName="padded-cell"
          sortable
        />
        <Column
          field="labels"
          header="Labels"
          bodyClassName="padded-cell"
          sortable
        />
      </DataTable>
    </div>
  );
}
export default Table;
