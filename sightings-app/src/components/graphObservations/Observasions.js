import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,  // Only import XAxis once
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import "./Observasions.css";

export const observationsData = [
    { month: 'Jan', observations: 30 },
    { month: 'Feb', observations: 20 },
    { month: 'Mar', observations: 50 },
    { month: 'Apr', observations: 40 },
    { month: 'May', observations: 70 },
  ];

const Observations = () => {
    return(
    <div className='main-graph'>
        <h2>Number of Observations</h2>
        <LineChart width={500} height={300} data={observationsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="observations" stroke="#82ca9d" />
        </LineChart>
    </div>)
};

export default Observations;
