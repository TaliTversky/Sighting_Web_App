import { useState, useEffect } from "react";

import { generateClient } from "@aws-amplify/api";
import { getUrl, uploadData } from "aws-amplify/storage";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient();

function ObservationForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formStep, setFormStep] = useState(0); // 0 = main form, 1 = image details, 2 = review/submit
  const [imageDetails, setImageDetails] = useState([]);

  const handleSubmitImageDetails = (details) => {
    setImageDetails(details);
    setFormStep(2); // Proceed to review/submit
  };

  const handleBackToMainForm = () => {
    setFormStep(0); // Go back to main form
  };

  if (formStep === 1) {
    // return <ImageDetailsForm files={files} onSubmit={handleSubmitImageDetails} onBack={handleBackToMainForm} />;
  }

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(newFiles);
    if (newFiles.length > 0) {
      setFormStep(1); // Proceed to add details for images
    }
  };

  const [files, setFiles] = useState([]);
  const [Observation, setObservation] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    timeName: "",
    reportType: "",
    site: "",
    specie: "",
    count: "",
    reporter: "",
    photographer: "",
    mediaSource: "",
    stage: "",
    sex: "",
    condition: "",
    length: "",
    diskLength: "",
    width: "",
    depth: "",
    distance: "",
    temperature: "",
    latitude: "",
    longitude: "",
    description: "",
    comments: "",
    urlLinks: "",
    byUser: "",
    checkedByUser: "",
    substrate: "",
    weight: "",
  });

  const getObservations = async () => {
    try {
      const ObservationsData = await client.graphql({
        query: queries.listObservations,
      });
      console.log(ObservationsData);

      const ObservationsList = ObservationsData.data.listObservations.items;
      setObservation(ObservationsList);

      // Observation.map(async (Observation, indx) => {
      //     const ObservationPicPath = Observation[indx].PicPath;
      //     try {
      //         const ObservationPicPathURI = await getUrl({key: ObservationPicPath, options: {validateObjectExistence: true, expires: 60}});
      //         setPicPaths([...ObservationPicPath, ObservationPicPathURI]);
      //     } catch(err) {
      //         console.log('error', err);
      //     }
      // });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getObservations();
  }, []);

  const addNewObservation = async (e) => {
    e.preventDefault();
    if (!files.length) {
      console.log("No files selected.");
      return;
    } else {
      console.log(files);
    }
    //const file = e.target.files[0];
    try {
      const {
        date,
        time,
        timeName,
        reportType,
        site,
        specie,
        count,
        reporter,
        photographer,
        mediaSource,
        stage,
        sex,
        condition,
        length,
        diskLength,
        width,
        depth,
        distance,
        temperature,
        latitude,
        longitude,
        description,
        comments,
        urlLinks,
        byUser,
        checkedByUser,
        substrate,
        weight,
      } = formData;
      const { username, userId } = await getCurrentUser();
      console.log(
        ">>>>> Here we got the form data ",
        username,
        userId,
        formData
      );

      // Upload pic to S3
      //Storage.configure({ region: 'eu-north-1'});
      //const key = await uploadData({path: `public/${Observation.id}-${file.name}.png`, data: Pic, options: {contentType: 'image/png'}});

      const imageKeys = await Promise.all(
        Array.from(files).map(async (file) => {
          const result = await uploadData({
            path: `public/${Observation.id}-${file.name}.png`,
            data: file,
            options: { contentType: "image/png" },
          }).result;
          return result.key;
        })
      );

      const newsObservation = {
        id: uuid(),
        date,
        time,
        timeName,
        reportType,
        site,
        specie,
        count,
        reporter,
        photographer,
        mediaSource,
        stage,
        sex,
        condition,
        length,
        diskLength,
        width,
        depth,
        distance,
        temperature,
        latitude,
        longitude,
        description,
        comments,
        urlLinks,
        byUser,
        checkedByUser,
        substrate,
        weight,
        Media: imageKeys,
      };

      // Persist new Contact
      await client.graphql({
        query: mutations.createObservation,
        variables: { input: newsObservation },
      });
      handleClose();
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <Container>
        <Row className="px-4 my-5"></Row>
        <Row className="px-4 my-5">
          <Button variant="primary" onClick={handleShow}>
            + New Observation
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Sighting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(evt) =>
                      setFormData({ ...formData, date: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={(evt) =>
                      setFormData({ ...formData, time: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time of Day</Form.Label>
                  <Form.Control
                    as="select"
                    name="timeName"
                    value={formData.timeName}
                    onChange={(evt) =>
                      setFormData({ ...formData, timeName: evt.target.value })
                    }
                  >
                    <option value="MORNING">Morning</option>
                    <option value="AFTERNOON">Afternoon</option>
                    <option value="EVENING">Evening</option>
                    <option value="NIGHT">Night</option>
                    <option value="DAWN">Dawn</option>
                    <option value="DUSK">Dusk</option>
                    <option value="LIGHT">Light</option>
                    <option value="DARK">Dark</option>
                    <option value="UNCPECIFIED">Unspecified</option>
                    <option value="EXACT">Exact</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Report Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter report type"
                    name="reportType"
                    value={formData.reportType}
                    onChange={(evt) =>
                      setFormData({ ...formData, reportType: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Site</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter site location"
                    name="site"
                    value={formData.site}
                    onChange={(evt) =>
                      setFormData({ ...formData, site: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Specie</Form.Label>
                  <Form.Control
                    as="select"
                    name="specie"
                    value={formData.specie}
                    onChange={(evt) =>
                      setFormData({ ...formData, specie: evt.target.value })
                    }
                  >
                    <option value="SHARK">Shark</option>
                    <option value="RAY">Ray</option>
                    <option value="CHIMAERA">Chimaera</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Count</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter count"
                    name="count"
                    value={formData.count}
                    onChange={(evt) =>
                      setFormData({ ...formData, count: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Reporter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter reporter's name"
                    name="reporter"
                    value={formData.reporter}
                    onChange={(evt) =>
                      setFormData({ ...formData, reporter: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Photographer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter photographer's name"
                    name="photographer"
                    value={formData.photographer}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        photographer: evt.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Media Source</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter media source"
                    name="mediaSource"
                    value={formData.mediaSource}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        mediaSource: evt.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stage</Form.Label>
                  <Form.Control
                    as="select"
                    name="stage"
                    value={formData.stage}
                    onChange={(evt) =>
                      setFormData({ ...formData, stage: evt.target.value })
                    }
                  >
                    <option value="N/A">N/A</option>
                    <option value="JUVENILE">Juvenile</option>
                    <option value="ADULT">Adult</option>
                    <option value="SUBADULT">Subadult</option>
                    <option value="EGG">Egg</option>
                    <option value="MIX">Mix</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sex</Form.Label>
                  <Form.Control
                    as="select"
                    name="sex"
                    value={formData.sex}
                    onChange={(evt) =>
                      setFormData({ ...formData, sex: evt.target.value })
                    }
                  >
                    <option value="N/A">N/A</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="BOTH">Both</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    name="condition"
                    value={formData.condition}
                    onChange={(evt) =>
                      setFormData({ ...formData, condition: evt.target.value })
                    }
                  >
                    <option value="N/A">N/A</option>
                    <option value="ALIVE_AND_FREE">Alive and Free</option>
                    <option value="FOUND_DEAD">Found Dead</option>
                    <option value="CAUGHT_AND_RELEASED">
                      Caught and Released
                    </option>
                    <option value="LANDED_OR_KILLED">Landed or Killed</option>
                    <option value="FOUND_INJURED">Found Injured</option>
                    <option value="FISHED_UNKNOWN">Fished Unknown</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Length</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter length"
                    name="length"
                    value={formData.length}
                    onChange={(evt) =>
                      setFormData({ ...formData, length: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Disk Length</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter disk length"
                    name="diskLength"
                    value={formData.diskLength}
                    onChange={(evt) =>
                      setFormData({ ...formData, diskLength: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Width</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter width"
                    name="width"
                    value={formData.width}
                    onChange={(evt) =>
                      setFormData({ ...formData, width: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Depth</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter depth"
                    name="depth"
                    value={formData.depth}
                    onChange={(evt) =>
                      setFormData({ ...formData, depth: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter distance"
                    name="distance"
                    value={formData.distance}
                    onChange={(evt) =>
                      setFormData({ ...formData, distance: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Temperature</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        temperature: evt.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={(evt) =>
                      setFormData({ ...formData, latitude: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={(evt) =>
                      setFormData({ ...formData, longitude: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={formData.description}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        description: evt.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter comments"
                    name="comments"
                    value={formData.comments}
                    onChange={(evt) =>
                      setFormData({ ...formData, comments: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>URL Links</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter URL links"
                    name="urlLinks"
                    value={formData.urlLinks}
                    onChange={(evt) =>
                      setFormData({ ...formData, urlLinks: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>By User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user"
                    name="byUser"
                    value={formData.byUser}
                    onChange={(evt) =>
                      setFormData({ ...formData, byUser: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Checked By User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user who checked"
                    name="checkedByUser"
                    value={formData.checkedByUser}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        checkedByUser: evt.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Substrate</Form.Label>
                  <Form.Control
                    as="select"
                    name="substrate"
                    value={formData.substrate}
                    onChange={(evt) =>
                      setFormData({ ...formData, substrate: evt.target.value })
                    }
                  >
                    <option value="NA">N/A</option>
                    <option value="MUDDY">Muddy</option>
                    <option value="HARD">Hard</option>
                    <option value="ROCKY">Rocky</option>
                    <option value="SANDY">Sandy</option>
                    <option value="SEAWEED_BEDS_OR_PATCHES">
                      Seaweed Beds or Patches
                    </option>
                    <option value="WATER_COLUMN">Water Column</option>
                    <option value="CORALS">Corals</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter weight"
                    name="weight"
                    value={formData.weight}
                    onChange={(evt) =>
                      setFormData({ ...formData, weight: evt.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Media</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(evt) => setFiles(Array.from(evt.target.files))}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={addNewObservation}
                >
                  Submit &gt;&gt;
                </Button>
                &nbsp;
              </Form>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
    </>
  );
}

export default ObservationForm;
