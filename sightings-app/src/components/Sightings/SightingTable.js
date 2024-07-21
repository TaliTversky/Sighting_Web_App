import Table from 'react-bootstrap/Table';
import './SightingTable.css'

function SightingTable() {
  return (
    <Table responsive striped bordered hover size="sm">
      <thead>
        <tr>
        <th>#</th>
          <th>id</th>
          <th>date</th>
          <th>time</th>
          <th>speciesCommonName</th>
          <th>speciesScienceName</th>
          <th>site</th>
          <th>latitude</th>
          <th>longitude</th>
          <th>stage</th>
          <th>count</th>
          <th>sex</th>
          <th>condition</th>
          <th>length</th>
          <th>width</th>
          <th>weight</th>
          <th>diskLength</th>
          <th>depth</th>
          <th>distance</th>
          <th>temperature</th>
          <th>substrate</th>
          <th>mediaURL</th>
          <th>mediaSource</th>
          <th>photographer</th>
          <th>media</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 24 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}

export default SightingTable;