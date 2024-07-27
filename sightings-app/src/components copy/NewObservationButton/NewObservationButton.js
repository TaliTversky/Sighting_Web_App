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

const NewObservationButton = () => {
  const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] =
    useBoolean(false);
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
                    <input type="date" name="date" />
                  </label>
                  <br />
                  <label>
                    Site:
                    <input type="text" name="site" />
                  </label>
                  <br />
                  <label>
                    Common Name:
                    <input type="text" name="common-name" />
                  </label>
                  <br />
                  <label>
                    Species:
                    <input type="text" name="species" />
                  </label>
                  <br />
                  <label>
                    Count:
                    <input type="number" name="count" />
                  </label>
                  <br />
                  <label>
                    Reporter:
                    <input type="text" name="reporter" />
                  </label>
                  <br />
                  <label>
                    Labels:
                    <input type="text" name="labels" />
                  </label>
                  <br />
                  <DefaultButton
                    type="submit"
                    text="Submit"
                    styles={buttonStyles}
                  />
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
