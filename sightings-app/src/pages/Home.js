import React from 'react';
import Observations from '../components/graphObservations/Observasions';
import Species from '../components/graphSpecies/Species';
import Volunteers from '../components/graphVolunteers/Volunteers';
import Blocks from '../components/countsBlocks/Blocks';

import './Home.css';

const Home = () => (
  <div className='home-container'>
    <div className="column-large">
      <div className="graph">
        <Blocks />
      
        <Species />
      </div>
    </div>
    <div className="column">
      <div className="graph">
        <Observations />
      </div>
      <div className="graph">
        <Volunteers />
      </div>
    </div>
  </div>
);

export default Home;
