import ObservationForm from "../NewObservationButton/form";

import "./TableHeaders.css";
import {
  ObservationCreateForm 
 } from '../../ui-components';

const TableHeaders = () => {
  return (
    <div className="table-headers-container">
      <h2 className="all-observations-title">All observations</h2>
      <h4 className="all-observations-number">2564</h4>
      <div className="newObservationButton">
        <ObservationForm />
      </div>
    </div>
  );
};

export default TableHeaders;
