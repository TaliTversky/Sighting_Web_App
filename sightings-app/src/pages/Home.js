import React from 'react';
import Observations from '../components/graphObservations/Observasions';
import Species from '../components/graphSpecies/Species';
import Volunteers from '../components/graphVolunteers/Volunteers';
import Blocks from '../components/countsBlocks/Blocks';

import './Home.css';
// import './Blocks.css';

const Home = () => (
  <div className='home-container'>

    <div className='count-boxs'>
      <Blocks/>
    </div>

    <div className='species-graph'>
      <Species/>
    </div>

    <div className='main-graph'>
      <Observations/>
    </div>

    <div className='Volunteers'>
      <Volunteers/>
    </div>

  </div>
);

export default Home;
