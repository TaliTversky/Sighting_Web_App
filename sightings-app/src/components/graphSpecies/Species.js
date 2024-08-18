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

import "./Species.css";

export const speciesData = [
  { name: 'Shark', count: 10 },
  { name: 'Dolphin', count: 8 },
  { name: 'Whale', count: 5 },
  { name: 'Turtle', count: 7 },
  { name: 'Octopus', count: 3 },
];

const Species = () => {
    return(
    <div className='graph-container'>
            <h2>Number of Species</h2>
                <BarChart width={350} height={300} data={speciesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
    </div>
    )  
}

export default Species;