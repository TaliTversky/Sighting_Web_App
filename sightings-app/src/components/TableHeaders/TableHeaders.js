import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listObservations } from "../../graphql/queries";
import ObservationForm from "../NewObservationButton/ObservationForm/ObservationForm";
import "./TableHeaders.css";

const client = generateClient();

const TableHeaders = ({ sightings }) => {
  return (
    <div className="table-headers-container">
      <h2 className="all-observations-title">All observations</h2>
      <h4 className="all-observations-number">{sightings.length}</h4>
      <div className="new-observation-button">
        <ObservationForm />
      </div>
    </div>
  );
};

export default TableHeaders;
