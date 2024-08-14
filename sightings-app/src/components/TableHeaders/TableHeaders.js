import ObservationForm from "../NewObservationButton/form2";
import "./TableHeaders.css";

const TableHeaders = () => {
  return (
    <div className="table-headers-container">
      <h2 className="all-observations-title">All observations</h2>
      <h4 className="all-observations-number">2564</h4>
      <div className="new-observation-button">
        <ObservationForm />
      </div>
    </div>
  );
};

export default TableHeaders;
