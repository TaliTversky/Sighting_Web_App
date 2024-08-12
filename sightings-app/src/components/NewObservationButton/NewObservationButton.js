import * as React from "react";
import "./NewObservationButton.css";
import {
  DefaultButton,
  FocusTrapZone,
  Layer,
  Overlay,
  Popup,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { useEffect, useState } from "react";

import { generateClient } from "aws-amplify/api";
import { v4 as uuid } from "uuid";
import { createSighting } from "../../graphql/mutations";
import { listSightings } from "../../graphql/queries";

function persistentLog(message) {
  return new Promise((resolve) => {
    console.log(message); // continue to log to the console
    const existingLogs = localStorage.getItem("debugLogs") || "";
    localStorage.setItem("debugLogs", existingLogs + "\n" + message);
    setTimeout(resolve, 100000); // simulate a delay of 1 second
  });
}

const initialState = {
  date: "",
  Site: "",
  speciesCommonName: "",
  speciesScienceName: "",
  species: "",
  count: "",
  reporter: "",
  labels: "",
};

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
        query: listSightings,
      });
      const sightings = sightingData.data.listSightings.items;
      setSightings(sightings);
    } catch (err) {
      persistentLog("error fetching Sightings");
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
          input: sighting,
        },
      });
    } catch (err) {
      persistentLog(err);
    }
  }
  return (
    <>
      <DefaultButton
        className="observation-button"
        onClick={showPopup}
        text="+ New observation"
      />
      {isPopupVisible && (
        <Layer>
          <Popup
            className="popup-root"
            role="dialog"
            aria-modal="true"
            onDismiss={hidePopup}
            enableAriaHiddenSiblings={true}
          >
            <Overlay onClick={hidePopup} />
            <FocusTrapZone>
              <div role="document" className="popup-content">
                <h2>New Observation Form</h2>
                <div className="form-container">
                  <form>
                    <label>
                      Date:
                      <input
                        type="date"
                        name="date"
                        onChange={(event) =>
                          setInput("date", event.target.value)
                        }
                        value={formState.date}
                        placeholder="date"
                      />
                    </label>
                    <br />
                    <label>
                      Site:
                      <input
                        type="text"
                        name="site"
                        onChange={(event) =>
                          setInput("Site", event.target.value)
                        }
                        value={formState.Site}
                        placeholder="Site"
                      />
                    </label>
                    <br />
                    <label>
                      Common Name:
                      <input
                        type="text"
                        name="common-name"
                        onChange={(event) =>
                          setInput("speciesCommonName", event.target.value)
                        }
                        value={formState.speciesCommonName}
                        placeholder="Common Name"
                      />
                    </label>
                    <br />
                    <label>
                      Species:
                      <input
                        type="text"
                        name="species"
                        onChange={(event) =>
                          setInput("speciesScienceName", event.target.value)
                        }
                        value={formState.speciesScienceName}
                        placeholder="Species Science Name"
                      />
                    </label>
                    <br />
                    <label>
                      Count:
                      <input
                        type="number"
                        name="count"
                        onChange={(event) =>
                          setInput("count", event.target.value)
                        }
                        value={formState.count}
                        placeholder="count"
                      />
                    </label>
                    <br />
                    <label>
                      Reporter:
                      <input
                        type="text"
                        name="reporter"
                        onChange={(event) =>
                          setInput("reporter", event.target.value)
                        }
                        value={formState.reporter}
                        placeholder="Reporter"
                      />
                    </label>
                    <br />
                    <label>
                      Labels:
                      <input
                        type="text"
                        name="labels"
                        onChange={(event) =>
                          setInput("labels", event.target.value)
                        }
                        value={formState.Labels}
                        placeholder="Labels"
                      />
                    </label>
                    <br />
                    <DefaultButton
                      onClick={addSighting}
                      type="submit"
                      text="Submit"
                      className="observation-button"
                    />
                    {sightings.map((sighting, index) => (
                      <div key={sighting.id ? sighting.id : index}></div>
                    ))}
                  </form>
                </div>
                <div className="button-container">
                  <DefaultButton
                    onClick={hidePopup}
                    text="Close Popup"
                    className="observation-button"
                  />
                </div>
              </div>
            </FocusTrapZone>
          </Popup>
        </Layer>
      )}
    </>
  );
};

export default NewObservationButton;
