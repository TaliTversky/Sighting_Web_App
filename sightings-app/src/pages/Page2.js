import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listObservations } from "../graphql/queries";
import Table from "../components/Table/Table";
import TableHeaders from "../components/TableHeaders/TableHeaders";

// Generate an AWS Amplify client instance
const client = generateClient();

// Define the Page2 functional component
const Page2 = () => {

  // State to store sightings data fetched from the API
  const [sightings, setSightings] = useState([]);

  // Function to fetch sightings data from the GraphQL API
  const fetchSightings = async () => {
    try {
      // Execute the GraphQL query to retrieve observations
      const sightingData = await client.graphql({
        query: listObservations,
      });
      // Update state with the fetched sightings data
      setSightings(sightingData.data.listObservations.items);
    } catch (err) {
      console.log("error fetching Sightings", err);
    }
  };

  // useEffect hook to fetch sightings data when the component mounts
  useEffect(() => {
    fetchSightings();
  }, []);

  // Render the component UI
  return (
    <div>
      {/* Render table headers and the sightings table */}
      <TableHeaders sightings={sightings} />
      <Table sightings={sightings} fetchSightings={fetchSightings} />
    </div>
  );
};

export default Page2;
