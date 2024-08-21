import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listObservations } from "../graphql/queries";
import Table from "../components/Table/Table";
import TableHeaders from "../components/TableHeaders/TableHeaders";

const client = generateClient();


const Page2 = () => {

  const [sightings, setSightings] = useState([]);

  const fetchSightings = async () => {
    try {
      const sightingData = await client.graphql({
        query: listObservations,
      });
      setSightings(sightingData.data.listObservations.items);
    } catch (err) {
      console.log("error fetching Sightings", err);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  return (
    <div>
      <TableHeaders sightings={sightings} />
      <Table sightings={sightings} fetchSightings={fetchSightings} />
    </div>
  );
};

export default Page2;
