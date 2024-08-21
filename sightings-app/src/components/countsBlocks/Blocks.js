import React from 'react';
import "./Blocks.css";
export const volunteersData = [
  { name: 'Alice', observations: 12 },
  { name: 'Bob', observations: 8 },
  { name: 'Charlie', observations: 15 },
  { name: 'Diana', observations: 5 },
  { name: 'Eve', observations: 9 },
];

export const observationsData = [
  { month: 'Jan', observations: 30 },
  { month: 'Feb', observations: 20 },
  { month: 'Mar', observations: 50 },
  { month: 'Apr', observations: 40 },
  { month: 'May', observations: 70 },
];

export const speciesData = [
  { name: 'Coocko Ray', count: 10 },
  { name: 'Dalatias Licha', count: 8 },
  { name: 'Dasyatis Spp', count: 5 },
  { name: 'Raja Clavata', count: 7 },
  { name: 'Selachii', count: 3 },
];

// Calculate totals
const totalSpecies = speciesData.length;
const totalObservations = observationsData.reduce((acc, item) => acc + item.observations, 0);
const totalVolunteers = volunteersData.length;

const Blocks = () => {
  return (
    <div className='count-boxes'>
      <div className="count-box observations">
        <h3>Total Species: {totalSpecies}</h3>
      </div>
      <div className="count-box species">
        <h3>Total Observations: {totalObservations}</h3>
      </div>
      <div className="count-box countries">
        <h3>Total Volunteers: {totalVolunteers}</h3>
      </div>
    </div>
  );
}

export default Blocks;
