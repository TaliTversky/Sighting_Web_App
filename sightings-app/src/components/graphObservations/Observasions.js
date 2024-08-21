import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import "./Observasions.css";

const Observations = () => {
  const observationsData = [
    { month: 'Jan', observations: 30 },
    { month: 'Feb', observations: 20 },
    { month: 'Mar', observations: 50 },
    { month: 'Apr', observations: 40 },
    { month: 'May', observations: 70 },
  ];

  return (
    <div className='graph-container'>
      <h2 className="graph-title">Number of Observations</h2>
      <LineChart width={500} height={300} data={observationsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="observations" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Observations;
