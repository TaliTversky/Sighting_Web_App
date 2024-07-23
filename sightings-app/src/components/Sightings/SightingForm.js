import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/api';
import {v4 as uuid} from 'uuid';
import { createSighting } from '../../graphql/mutations';
import { listSightings } from '../../graphql/queries';

const initialState = {   
  date: '',
  time: '',
  speciesCommonName: '',
  speciesScienceName: '' };


const client = generateClient();

const SightingsUpdate = () => {
  const [formState, setFormState] = useState(initialState);
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetchSightings();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchSightings() {
    try {
      const sightingData = await client.graphql({
        query: listSightings
      });
      const sightings = sightingData.data.listSightings.items;
      setSightings(sightings);
    } catch (err) {
      console.log('error fetching Sightings');
    }
  }

  async function addSighting() {
    try {
      // if (!formState.name || !formState.description) return;
      const id = uuid(); // Generate a new UUID each time a sighting is added
      console.log(`Generated ID: ${id}`);
      const sighting = { id, ...formState };
      setSightings([...sightings, sighting]);
      setFormState(initialState);
      await client.graphql({
        query: createSighting,
        variables: {
          input: sighting
        }
      });
    } catch (err) {
      console.log('error creating sighting:', err);
    }
  }

  return (
    <div>
      <h2>sightings</h2>
      <input type="date"
        onChange={(event) => setInput('date', event.target.value)}
        value={formState.date}
        placeholder="date"
      />
      <input
        onChange={(event) => setInput('time', event.target.value)}
        value={formState.time}
        placeholder="time"
      />
      <input
        onChange={(event) => setInput('speciesScienceName', event.target.value)}
        value={formState.speciesScienceName}
        placeholder="speciesScienceName"
      />
      <input
        onChange={(event) => setInput('speciesCommonName', event.target.value)}
        value={formState.speciesCommonName}
        placeholder="speciesCommonName"
      />
      <button onClick={addSighting}>
        Create Sighting
      </button>
      {sightings.map((sighting, index) => (
        <div key={sighting.id ? sighting.id : index}>
        </div>
      ))}
    </div>
  );
};

export default SightingsUpdate;