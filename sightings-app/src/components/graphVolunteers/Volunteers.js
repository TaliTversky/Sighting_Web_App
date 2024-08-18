import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import "./Volunteers.css";

export const volunteersData = [
    { name: 'Alice', observations: 12 },
    { name: 'Bob', observations: 8 },
    { name: 'Charlie', observations: 15 },
    { name: 'Diana', observations: 5 },
    { name: 'Eve', observations: 9 },
  ];


  const Volunteers = () => {
    return (
      <div className='graph-container'>
        <h2>Volunteers</h2>
        <BarChart width={600} height={300} data={volunteersData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="observations" fill="#82ca9d" barSize={20} />
        </BarChart>
      </div>
    );};

export default Volunteers;

    