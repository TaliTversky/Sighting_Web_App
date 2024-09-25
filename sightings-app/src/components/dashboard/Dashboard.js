// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listObservations } from '../../graphql/queries';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import './Dashboard.css'; 

const client = generateClient();

const Dashboard = () => {
  const [sightings, setSightings] = useState([]);
  const [totalSpecies, setTotalSpecies] = useState(0);
  const [totalObservations, setTotalObservations] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [observationsPerDay, setObservationsPerDay] = useState([]);
  const [observationsPerUser, setObservationsPerUser] = useState([]);
  const [topSpecies, setTopSpecies] = useState([]);


  const fetchSightings = async () => {
    try {
      const sightingData = await client.graphql({
        query: listObservations,
      });
      setSightings(sightingData.data.listObservations.items);
    } catch (err) {
      console.log("error fetching Sightings", err);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  useEffect(() => {
    if (sightings.length === 0) return;

    // Calculate Total Number of Observations
    setTotalObservations(sightings.length);

    // Calculate Total Number of Species Recorded
    const speciesSet = new Set(sightings.map(obs => obs.specie));
    setTotalSpecies(speciesSet.size);

    // Calculate Total Number of Users
    const usersSet = new Set(sightings.map(obs => obs.byUser));
    setTotalUsers(usersSet.size);

    // Observations Per Day for the Last Month
    const today = moment();
    const oneMonthAgo = moment().subtract(1, 'months');
    const filteredSightings = sightings.filter(obs => moment(obs.date).isBetween(oneMonthAgo, today, 'day', '[]'));

    const dailyCounts = {};
    for (let m = moment(oneMonthAgo); m.isBefore(today); m.add(1, 'days')) {
      dailyCounts[m.format('YYYY-MM-DD')] = 0;
    }

    filteredSightings.forEach(obs => {
      const date = moment(obs.date).format('YYYY-MM-DD');
      if (dailyCounts[date] !== undefined) {
        dailyCounts[date] += 1;
      }
    });

    const dailyData = Object.keys(dailyCounts).map(date => ({
      date,
      count: dailyCounts[date],
    }));
    setObservationsPerDay(dailyData);

    // Observations Per User in the Last Month
    const userCounts = {};
    filteredSightings.forEach(obs => {
      const user = obs.byUser || 'Unknown';
      userCounts[user] = (userCounts[user] || 0) + 1;
    });

    const userData = Object.keys(userCounts).map(user => ({
      user,
      count: userCounts[user],
    }));
    setObservationsPerUser(userData);

    // Top 5 Species with Count
    const speciesCounts = {};
    sightings.forEach(obs => {
      const specie = obs.specieCommonName || 'Unknown';
      speciesCounts[specie] = (speciesCounts[specie] || 0) + 1;
    });

    const topSpeciesData = Object.entries(speciesCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([specie, count]) => ({ specie, count }));
    setTopSpecies(topSpeciesData);

  }, [sightings]);

  return (
    <div className="dashboard-container">
      <h1>Observations Dashboard</h1>

      {/* Power Numbers */}
      <div className="power-numbers">
        <div className="power-card">
          <h3>Total <br/>Species Recorded</h3>
          <p>{totalSpecies}</p>
        </div>
        <div className="power-card">
          <h3>Total <br/>Observations</h3>
          <p>{totalObservations}</p>
        </div>
        <div className="power-card">
          <h3>Total <br/>Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

      {/* Observations Per Day - Line Chart */}
      <div className="chart-section">
        <h3>Observations Per Day (Last Month)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={observationsPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => moment(tick).format('MM-DD')} 
              stroke="#ffffff" 
            />
            <YAxis 
              allowDecimals={false} 
              stroke="#ffffff" 
              tick={{ fill: '#ffffff' }}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Observations" 
              stroke="#82ca9d" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Observations Per User - Bar Chart */}
      <div className="chart-section">
        <h3>Observations Per User (Last Month)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={observationsPerUser}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="user" 
              stroke="#ffffff" 
              tick={{ fill: '#ffffff' }}
            />
            <YAxis 
              allowDecimals={false} 
              stroke="#ffffff" 
              tick={{ fill: '#ffffff' }}
            />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Observations" 
              fill="#8884d8" 
              barSize={50} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Species - Bar Chart */}
      <div className="chart-section">
        <h3>Top 5 Species by Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSpecies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="specie" 
              stroke="#ffffff" 
              tick={{ fill: '#ffffff' }}
            />
            <YAxis 
              allowDecimals={false} 
              stroke="#ffffff" 
              tick={{ fill: '#ffffff' }}
            />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Count" 
              fill="#ffc658" 
              barSize={50} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
