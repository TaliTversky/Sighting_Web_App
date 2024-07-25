import * as React from "react";
import {
  mergeStyleSets,
  DefaultButton,
  FocusTrapZone,
  Layer,
  Overlay,
  Popup,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/api';
import {v4 as uuid} from 'uuid';
import { createSighting } from '../../graphql/mutations';
import { listSightings } from '../../graphql/queries';


function persistentLog(message) {
    return new Promise((resolve) => {
        console.log(message); // continue to log to the console
        const existingLogs = localStorage.getItem('debugLogs') || "";
        localStorage.setItem('debugLogs', existingLogs + '\n' + message);
        setTimeout(resolve, 100000); // simulate a delay of 1 second
    });
}


const popupStyles = mergeStyleSets({
  root: {
    background: "rgba(0, 0, 0, 0.2)",
    bottom: "0",
    left: "0",
    position: "fixed",
    right: "0",
    top: "0",
  },
  content: {
    background: "white",
    left: "50%",
    maxWidth: "400px",
    padding: "0 2em 2em",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const buttonStyles = {
  root: {
    background: "rgba(29, 45, 69, 1)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
  },
  rootHovered: {
    background: "rgba(29, 45, 69, 1)",
    color: "white",
  },
  rootPressed: {
    background: "rgba(29, 45, 69, 1)",
    color: "white",
  },
};

const initialState = {   
    date: '',
    Site: '',
    speciesCommonName: '',
    speciesScienceName: '',
    species: '',
    count: '',
    reporter: '',
    labels: '' };
  
  
const client = generateClient();

const NewObservationButton = () => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] =
    useBoolean(false);
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
        persistentLog('error fetching Sightings');
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
        persistentLog(err);
      }
    }
  
  return (
    <>
      <DefaultButton
        onClick={showPopup}
        text="+ New observation"
        styles={buttonStyles}
      />
      {isPopupVisible && (
        <Layer>
          <Popup
            className={popupStyles.root}
            role="dialog"
            aria-modal="true"
            onDismiss={hidePopup}
            enableAriaHiddenSiblings={true}
          >
            <Overlay onClick={hidePopup} />
            <FocusTrapZone>
              <div role="document" className={popupStyles.content}>
                <h2>New Observation Form</h2>
                <form>
                  <label>
                    Date:
                    <input type="date"
                    onChange={(event) => setInput('date', event.target.value)}
                    value={formState.date}
                    placeholder="date" 
                    />
                  </label>
                  <br />
                  <label>
                    Site:
                    <input type="text"
                    onChange={(event) => setInput('Site', event.target.value)}
                    value={formState.Site}
                    placeholder="Site"
                    />
                  </label>
                  <br />
                  <label>
                    Common Name:
                    <input type="text"
                    onChange={(event) => setInput('speciesCommonName', event.target.value)}
                    value={formState.speciesCommonName}
                    placeholder="Common Name"
                    />
                  </label>
                  <br />
                  <label>
                    Species Science Name:
                    <input type="text"
                    onChange={(event) => setInput('speciesScienceName', event.target.value)}
                    value={formState.speciesScienceName}
                    placeholder="Species Science Name"
                    />
                  </label>
                  <br />
                  <label>
                    Count:
                    <input type="text"
                    onChange={(event) => setInput('count', event.target.value)}
                    value={formState.count}
                    placeholder="count"
                    />
                  </label>
                  <br />
                  <label>
                    Reporter:
                    <input type="text"
                    onChange={(event) => setInput('reporter', event.target.value)}
                    value={formState.reporter}
                    placeholder="Reporter"
                    />
                  </label>
                  <br />
                  <label>
                    Labels:
                    <input type="text"
                    onChange={(event) => setInput('labels', event.target.value)}
                    value={formState.Labels}
                    placeholder="Labels"
                    />
                  </label>
                  <br />
                  <DefaultButton onClick={addSighting}
                    type="submit"
                    text="Submit"
                    styles={buttonStyles}
                  />
                  {sightings.map((sighting, index) => (
                    <div key={sighting.id ? sighting.id : index}>
                    </div>
                  ))}
                </form>
                <DefaultButton
                  onClick={hidePopup}
                  text="Close Popup"
                  styles={buttonStyles}
                />
              </div>
            </FocusTrapZone>
          </Popup>
        </Layer>
      )}
    </>
  );
};
export default NewObservationButton;