import React from 'react';

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
  { name: 'Shark', count: 10 },
  { name: 'Dolphin', count: 8 },
  { name: 'Whale', count: 5 },
  { name: 'Turtle', count: 7 },
  { name: 'Octopus', count: 3 },
];

// Calculate totals
const totalSpecies = speciesData.length;
const totalObservations = observationsData.reduce((acc, item) => acc + item.observations, 0);
const totalVolunteers = volunteersData.length;

const Blocks = () => {
  return (
    <div className='count-boxes'>
      <div className="count-box">
        <h3>Total Species: {totalSpecies}</h3>
      </div>
      <div className="count-box">
        <h3>Total Observations: {totalObservations}</h3>
      </div>
      <div className="count-box">
        <h3>Total Volunteers: {totalVolunteers}</h3>
      </div>
    </div>
  );
}

export default Blocks;
