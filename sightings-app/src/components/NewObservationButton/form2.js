import { useState, useEffect } from 'react';
import "./NewObservationButton.css";
import { generateClient } from '@aws-amplify/api';
import { getUrl, uploadData } from 'aws-amplify/storage';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Button }  from 'primereact/button' ;
import { Modal } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import { getCurrentUser } from 'aws-amplify/auth';
import { speciesData } from './speciesData';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from "primereact/floatlabel";
import { StorageManager } from "@aws-amplify/ui-react-storage";

import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
// import 'primeicons/primeicons.css'; // Icons

const client = generateClient();

function ObservationForm() {

    const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [files, setFiles] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        timeName: "EXACT",
        reportType: "",
        site: "",
        specieCommonName:"",
        specie: "",
        count: "",
        reporter: "",
        photographer: "",
        mediaSource:  "",
        stage: null,
        sex: null,
        condition: null,
        length: null,
        diskLength: null,
        width: null,
        depth: null,
        distance: null,
        temperature: null,
        latitude: null,
        longitude: null,
        description: "",
        comments: "",
        urlLinks: null,
        substrate: null,
        weight: null
    });

    const [selectedLifeStages, setSelectedLifeStages] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [selectedBehaviors, setSelectedBehaviors] = useState([]);
    const [isExactTime, setIsExactTime] = useState(false);


    const lifeStageOptions = [
        { label: 'Juvenile', value: 'JUVENILE' },
        { label: 'Adult', value: 'ADULT' },
        { label: 'Egg', value: 'EGG' },
        { label: 'Larva', value: 'LARVA' }
    ];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateStep = (step) => {
        const errors = {};
        switch (step) {
            case 1:
                // Validate fields for step 1: date, time, commonName, species, site, latitude, longitude
                if (!formData.date.trim()) errors.date = "Date is required.";
                if (!formData.timeName.trim()) errors.timeName = "Time is required.";
                if (!formData.site.trim()) errors.site = "Site is required.";
                if (formData.latitude != null){
                            // Convert number to string for validation if necessary
                            const latitude = formData.latitude.toString().trim();
                
                            if (!latitude || isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
                                errors.latitude = "Valid latitude is required.";
                            }
                }

                if (formData.longitude != null){
                    // Convert number to string for validation if necessary
                    const longitude = formData.longitude.toString().trim();
        
                    if (!longitude || isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
                        errors.longitude = "Valid longitude is required.";
                    }
        }
    
                if (!formData.specieCommonName.trim()) errors.specieCommonName = "Common name is required.";
                if (!formData.specie.trim()) errors.specie = "Scientific name is required.";
                break;
            case 2:
                // Validate fields for step 2
                if (!formData.count.trim() || isNaN(Number(formData.count)) || Number(formData.count) < 0) errors.count = "Valid count is required.";
                // if (formData.stage === "NA") errors.stage = "Stage selection is required.";
                break;
            case 3:
                // Validate fields for step 3
                if (!formData.reporter.trim()) errors.reporter = "Reporter's name is required.";
                if (!files.length) {
                    console.log("No files selected.");
                    alert("Please upload at least one image to proceed.");
                    return;}
                break;
            default:
                break;
        }
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    
    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            const totalSteps = 3 + files.length;  // 3 for form steps, files.length for image reviews
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                console.log("You are at the last step.");
                if (!files.length) {
                    console.log("No files selected.");
                    alert("Please upload at least one image to proceed.");
                }
            }
        } else {
            alert("Please correct the errors before proceeding.");
        }
    };
    
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            console.log("You are at the first step.");
        }
    };
    
    

    const handleFileChange = (event) => {
        const uploadedFiles = Array.from(event.target.files).filter(file => {
            const validImageTypes = ['image/jpeg', 'image/png'];
            const validVideoTypes = ['video/mp4', 'video/quicktime'];
            if (validImageTypes.includes(file.type) || validVideoTypes.includes(file.type)) {
                return true;
            } else {
                alert('Only JPEG, PNG, MP4, and MOV files are accepted.');
                return false;
            }
        });
        setFiles(uploadedFiles);
    };
    

    const validateInput = (name, value) => {
        let error = "";
        switch (name) {
            case 'date':
            case 'site':
            case 'reporter':
            case 'count':
            case 'stage':
            case 'sex':
                if (!value.trim()) error = 'This field is required.';
                break;
            case 'latitude':
            case 'longitude':
                if (value && isNaN(Number(value))) error = 'Please enter a valid geographical coordinate.';
                break;
            case 'email': // Assuming you have this field
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) error = 'Please enter a valid email address.';
                break;
            // case 'urlLinks': // Assuming you handle URL input as comma-separated values
            //     const urlRegex = /^(https?:\/\/[^\s]+)$/;
            //     const urls = value.split(',');
            //     const invalidUrls = urls.filter(url => !urlRegex.test(url.trim()));
            //     if (invalidUrls.length > 0) error = 'Please enter valid URLs separated by commas.';
            //     break;
            case 'count':
            case 'length':
            case 'diskLength':
            case 'width':
            case 'distance':
            case 'weight':
                if (value !== null && isNaN(Number(value))){
                    if (!Number.isInteger(+value) || +value < 0) error = 'Please enter a valid positive number.';
                }
                break;
            case 'depth':
            case 'temperature':
                if (isNaN(Number(value))) error = 'Please enter a valid decimal number.';
                break;
            default:
                break;
        }

        return error;
    }

    const handleChange1 = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;
    
        // Convert empty string to null for numerical fields if they are allowed to be null
        if (value.trim() === "" && ['temperature', 'length', 'diskLength', 'width', 'depth', 'distance', 'weight','time'].includes(name)) {
            formattedValue = null;
        }
    
        const error = validateInput(name, formattedValue); // Ensure validateInput can handle null values appropriately
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        if (name === "isExactTime") {
            setIsExactTime(checked);
            if (checked) {
                // Set timeName to "EXACT" and disable the timeName field
                setFormData(prev => ({
                    ...prev,
                    timeName: "EXACT",
                    time: ""  // Optionally reset the time field
                }));
            } else {
                // Allow user to select timeName when checkbox is not checked
                setFormData(prev => ({
                    ...prev,
                    timeName: "",
                    time: ""  // Optionally reset the time field
                }));
            }
        } else if (name === "time" && !isExactTime) {
            // If not exact time, prevent editing the time field
            return;
        } else if (name === "timeName" && isExactTime) {
            // Prevent editing the timeName field if it is exact time
            return;
        } else {
            let formattedValue = value;
            // Handle conversion for numerical fields that allow null
            if (value.trim() === "" && ['temperature', 'length', 'diskLength', 'width', 'depth', 'distance', 'weight','time'].includes(name)) {
                formattedValue = null;
            }
    
            const error = validateInput(name, formattedValue);
            setFormData(prev => ({ ...prev, [name]: formattedValue }));
            setFormErrors(prev => ({ ...prev, [name]: error }));
        }
    };
    
    
    
    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateInput(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });
        setFormErrors(newErrors);
        console.log("newErrors >>>", newErrors)
        return Object.keys(newErrors).length === 0;  // Return true if no errors
    };

    const handleActionClick = async (e) => {
        e.preventDefault();
        if (!validateAllFields()) {
            alert('Please fix the errors before proceeding.');
            return;  // Stop the function if there are errors
        }
        if (currentStep === files.length + 3) {
            addNewObservation();  // proceed only if valid
        } else {
            handleNext(e);
        }
    };

    const handleLifeStageChange = (e) => {
        // Assuming `e.value` is an array of objects where each object has a `value` key
        const values = e.value.map(item => item.value); // Extracting the `value` from each selected option
        setSelectedLifeStages(e.value);
        console.log(e.value);
        console.log("life stage >>> ", selectedLifeStages)
    };
    
    const handleActivityChange = (e) => {
        const values = e.value;
        setSelectedActivities(values);
    };
    
    const handleBehaviorChange = (e) => {
        const values = e.value;
        setSelectedBehaviors(values);
    };

    const handleCharctersChange = (e) => {
        const values = e.value;
        setSelectedCharacters(values);
    };
    
        
    const addNewObservation = async (e) => {
        if (e) e.preventDefault(); 
        if (!files.length) {
            console.log("No files selected.");
            return;}
        else {console.log(files)}

        const allLabels = Array.from(new Set([...selectedActivities, ...selectedCharacters, ...selectedBehaviors]));
        
        try {
            const {
                date,
                time,
                timeName,
                reportType,
                site,
                specie,
                specieCommonName,
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
                byUser,
                substrate,
                urlLinks,
                weight 
            } = formData;
            const user = await getCurrentUser()

            const newsObservation = {
                id: uuid(),
                date,
                time: isExactTime ? time : null,
                timeName,
                reportType,
                site,
                specie,
                specieCommonName,
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
                byUser,
                substrate,
                urlLinks,
                weight
            };
            // Create the API record:
            const response = await client.graphql({
                query: mutations.createObservation,
                variables: { input: newsObservation }
            });
            console.log("response >>> ", response.data.createObservation)
            
            const ObservationRecord = response.data.createObservation;


            const imageKeys = await Promise.all(
                Array.from(files).map(async (file, index) => {
                    // Upload each file:
                    console.log("file type >>>", file.type)
                    const contentType = file.type;
                    const fileName = `${ObservationRecord.id}_${index + 1}.${file.type.startsWith('image') ? 'png' : 'mp4'}`;
                    const uploadResult = await uploadData({
                        path: `public/${fileName}`,
                        data: file,
                        options: { contentType: contentType }
                    });
    
                    // Create a Media record for each image:
                    const mediaId = uuid();
                    const mediaEntry = {
                        id: mediaId,
                        Image: `public/${fileName}`,
                        specie: ObservationRecord.specie,
                        Date: ObservationRecord.date,
                        time: ObservationRecord.time,
                        place: ObservationRecord.site,
                        type: "Image", // assuming type is a description of the file
                        lifeStage: selectedLifeStages,
                        activity: selectedActivities,
                        characters: selectedCharacters,
                        behavior: selectedBehaviors,
                        observationID: ObservationRecord.id
                    };
    
                    const mediaResponse = await client.graphql({
                        query: mutations.createMedia,
                        variables: { input: mediaEntry }
                    });
    
                    return mediaEntry.Image;
                })
            );
    

            console.log("imageKeys >>> ", imageKeys);

            const MediaUpdateObservation = {
                id: ObservationRecord.id,
                date,
                time: isExactTime ? time : null,
                timeName,
                reportType,
                site,
                specie,
                specieCommonName,
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
                byUser: user.signInDetails.loginId,
                substrate,
                weight,
                urlLinks,
                labels: allLabels,
                Media: imageKeys
            };
            console.log("form >>> ", MediaUpdateObservation)

            // Add the file association to the record:
            const updateResponse = await client.graphql({
                query: mutations.updateObservation,
                variables: { input: MediaUpdateObservation }
            });

            const updatedObservation = updateResponse.data.updateObservation;
            //If the record has no associated file, we can return early.
            if (!updatedObservation.Media?.length) return;
            // Retrieve signed urls for all files:
            const signedUrls = await Promise.all(
                updatedObservation.Media.map(async (path) => await getUrl({ path }))
            );
            console.log("signedUrls >>> ", signedUrls);
            const urls = signedUrls.map(item => item.url);
            console.log(urls);

            
            handleClose();
        
        } catch(err) {
            console.log('error', err);
        }
    }

    const handleCommonNameChange = (event) => {
        const commonName = event.target.value;
        const species = speciesData.find(species => species.commonName === commonName);
        setFormData(prevFormData => ({
            ...prevFormData,
            specie: species ? species.scientificName : '',  // Ensure this key matches your form state for scientific name
            specieCommonName: commonName
        }));
    };


    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Date*</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                isInvalid={!!formErrors.date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.date}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Exact Time"
                                checked={isExactTime}
                                onChange={handleChange}
                                name="isExactTime"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                disabled={!isExactTime}  // Disable if not exact time
                                isInvalid={!isExactTime && formData.time}  // Mark invalid if time is filled but not exact
                            />
                            <Form.Control.Feedback type="invalid">
                                Please clear the time or check "Exact Time."
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time of Day*</Form.Label>
                            <Form.Control
                                as="select"
                                name="timeName"
                                value={formData.timeName}
                                onChange={handleChange}
                                disabled={isExactTime}  // Disable if exact time
                                isInvalid={!isExactTime && !formData.timeName}  // Mark invalid if not filled and not exact time
                            >
                                <option value="">Select time of day</option>
                                <option value="MORNING">Morning</option>
                                <option value="AFTERNOON">Afternoon</option>
                                <option value="EVENING">Evening</option>
                                <option value="NIGHT">Night</option>
                                <option value="DAWN">Dawn</option>
                                <option value="DUSK">Dusk</option>
                                <option value="LIGHT">Light</option>
                                <option value="DARK">Dark</option>
                                <option value="UNSPECIFIED">Unspecified</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select a time of day.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3">
                        <Form.Label>Site*</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter site location" 
                            name="site" 
                            value={formData.site} 
                            onChange={handleChange}
                            isInvalid={!!formErrors.site}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.site}
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type="text" placeholder="Enter latitude" name="latitude" value={formData.latitude} onChange={handleChange} isInvalid={!!formErrors.latitude} />
                            <Form.Control.Feedback type="invalid">{formErrors.latitude}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" placeholder="Enter longitude" name="longitude" value={formData.longitude} onChange={handleChange} isInvalid={!!formErrors.longitude} />
                            <Form.Control.Feedback type="invalid">{formErrors.longitude}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Common Name*</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="commonName" 
                                value={formData.commonName} 
                                onChange={handleCommonNameChange}
                                isInvalid={!!formErrors.commonName}
                            >
                                <option value="">Select a common name</option>
                                {speciesData.map((species, index) => (
                                    <option key={index} value={species.commonName}>{species.commonName}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formErrors.commonName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Scientific Name</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="scientificName" 
                                value={formData.specie} 
                                readOnly
                                disabled
                                isInvalid={!!formErrors.specie}
                            >
                                <option value="">Select a scientific name</option>
                                {speciesData.map((species, index) => (
                                    <option key={index} value={species.scientificName}>{species.scientificName}</option>
                                ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.specie}
                                </Form.Control.Feedback>
                            </Form.Group>
                        <Button label="Next" className="p-button-primary" onClick={handleNext} />
                    </>
                );
    
            case 2:
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Count*</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter count" 
                                name="count" 
                                value={formData.count} 
                                onChange={handleChange}
                                isInvalid={!!formErrors.count}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.count}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stage*</Form.Label>
                            <Form.Control as="select" name="stage" value={formData.stage} onChange={handleChange} isInvalid={!!formErrors.stage}>
                                <option value="">Select stage</option>
                                <option value="NA">N/A</option>
                                <option value="JUVENILE">Juvenile</option>
                                <option value="ADULT">Adult</option>
                                <option value="SUBADULT">Subadult</option>
                                <option value="EGG">Egg</option>
                                <option value="MIX">Mix</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{formErrors.stage}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Sex*</Form.Label>
                            <Form.Control as="select" name="sex" value={formData.sex} onChange={handleChange} isInvalid={!!formErrors.sex}>
                                <option value="">Select sex</option>
                                <option value="NA">N/A</option>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                                <option value="BOTH">Both</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{formErrors.sex}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Condition</Form.Label>
                            <Form.Control as="select" name="condition" value={formData.condition} onChange={handleChange} isInvalid={!!formErrors.condition}>
                                <option value="">Select condition</option>
                                <option value="NA">N/A</option>
                                <option value="ALIVE_AND_FREE">Alive and Free</option>
                                <option value="FOUND_DEAD">Found Dead</option>
                                <option value="CAUGHT_AND_RELEASED">Caught and Released</option>
                                <option value="LANDED_OR_KILLED">Landed or Killed</option>
                                <option value="FOUND_INJURED">Found Injured</option>
                                <option value="FISHED_UNKNOWN">Fished Unknown</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{formErrors.condition}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Length [cm]</Form.Label>
                            <Form.Control type="text" placeholder="Enter length" name="length" value={formData.length} onChange={handleChange} isInvalid={!!formErrors.length} />
                            <Form.Control.Feedback type="invalid">{formErrors.length}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Disk Length [cm]</Form.Label>
                            <Form.Control type="text" placeholder="Enter disk length" name="diskLength" value={formData.diskLength} onChange={handleChange} isInvalid={!!formErrors.diskLength} />
                            <Form.Control.Feedback type="invalid">{formErrors.diskLength}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Width [cm]</Form.Label>
                            <Form.Control type="text" placeholder="Enter width" name="width" value={formData.width} onChange={handleChange} isInvalid={!!formErrors.width} />
                            <Form.Control.Feedback type="invalid">{formErrors.width}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Weight [g]</Form.Label>
                            <Form.Control type="text" placeholder="Enter weight" name="weight" value={formData.weight} onChange={handleChange} isInvalid={!!formErrors.weight} />
                            <Form.Control.Feedback type="invalid">{formErrors.weight}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Depth [m]</Form.Label>
                            <Form.Control type="text" placeholder="Enter depth" name="depth" value={formData.depth} onChange={handleChange} isInvalid={!!formErrors.depth} />
                            <Form.Control.Feedback type="invalid">{formErrors.depth}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Distance [m]</Form.Label>
                            <Form.Control type="text" placeholder="Enter distance" name="distance" value={formData.distance} onChange={handleChange} isInvalid={!!formErrors.distance} />
                            <Form.Control.Feedback type="invalid">{formErrors.distance}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Temperature [°C]</Form.Label>
                            <Form.Control type="text" placeholder="Enter temperature" name="temperature" value={formData.temperature} onChange={handleChange} isInvalid={!!formErrors.temperature} />
                            <Form.Control.Feedback type="invalid">{formErrors.temperature}</Form.Control.Feedback>
                        </Form.Group>
                    

                        <Form.Group className="mb-3">
                            <Form.Label>Substrate</Form.Label>
                            <Form.Control as="select" name="substrate" value={formData.substrate} onChange={handleChange} isInvalid={!!formErrors.substrate}>
                                <option value="">Select substrate</option>
                                <option value="NA">N/A</option>
                                <option value="MUDDY">Muddy</option>
                                <option value="HARD">Hard</option>
                                <option value="ROCKY">Rocky</option>
                                <option value="SANDY">Sandy</option>
                                <option value="SEAWEED_BEDS_OR_PATCHES">Seaweed Beds or Patches</option>
                                <option value="WATER_COLUMN">Water Column</option>
                                <option value="CORALS">Corals</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{formErrors.substrate}</Form.Control.Feedback>
                        </Form.Group>

                        {currentStep > 1 && <Button label="Back" className="p-button-secondary" onClick={handleBack} />}
                        <Button label="Next" className="p-button-primary" onClick={handleNext} />

                    </>
                );
                
                case 3:
                    return (
                        <>
                        <Form.Group className="mb-3">
                            <Form.Label>Reporter</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter reporter's name" 
                                name="reporter" 
                                value={formData.reporter} 
                                onChange={handleChange}
                                isInvalid={!!formErrors.reporter}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.reporter}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Photographer</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter photographer's name" 
                                name="photographer" 
                                value={formData.photographer} 
                                onChange={handleChange}
                                isInvalid={!!formErrors.photographer}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.photographer}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Report Type</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter report type" 
                                name="reportType" 
                                value={formData.reportType} 
                                onChange={handleChange}
                                isInvalid={!!formErrors.reportType}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.reportType}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Media Source</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter media source" 
                                name="mediaSource" 
                                value={formData.mediaSource} 
                                onChange={handleChange}
                                isInvalid={!!formErrors.mediaSource}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.mediaSource}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Links</Form.Label>
                            <Form.Control type="text" placeholder="Enter Links" name="urlLinks" value={formData.urlLinks} onChange={handleChange} isInvalid={!!formErrors.urlLinks} />
                            <Form.Control.Feedback type="invalid">{formErrors.urlLinks}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} isInvalid={!!formErrors.description} />
                            <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter comments" name="comments" value={formData.comments} onChange={handleChange} isInvalid={!!formErrors.comments} />
                            <Form.Control.Feedback type="invalid">{formErrors.comments}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Media</Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileChange} name="media" accept="image/*,video/*"/>
                        </Form.Group>

                    {currentStep > 1 && <Button label="Back" className="p-button-secondary" onClick={handleBack} />}
                    <Button label="Next" className="p-button-primary" onClick={handleNext} />
            </>
            );
            default:
                // Handle file uploads and metadata association steps
                if (currentStep <= files.length + 3) {
                    const fileIndex = currentStep - 4; // Adjust index for image steps
                    console.log("fileIndex >>> ",fileIndex);
                    const file = files[fileIndex];
                    const url = URL.createObjectURL(file);

                    const mediaPreview = (file) => {
                        if (file.type.startsWith('image')) {
                            return <img src={url} alt={`Photo ${fileIndex + 1}`} style={{ width: '100%', maxHeight: '400px' }} />;
                        } else if (file.type.startsWith('video')) {
                            return (
                                <video width="100%" controls>
                                    <source src={url} type={file.type} />
                                    Your browser does not support the video tag.
                                </video>
                            );
                        }
                    };

                    return (
                        <>
                            {mediaPreview(file)}
                            <div className="card p-fluid">
                                <label htmlFor="lifeStage">Life Stage</label>
                                <MultiSelect id="lifeStage" value={selectedLifeStages} options={lifeStageOptions} onChange={handleLifeStageChange} optionLabel="label" optionValue="value" placeholder="Select life stages" display="chip"/>
                            </div>
                            <div className="card p-fluid">
                                <label htmlFor="activity">Activity</label>
                                <Chips id="activity" value={selectedActivities} onChange={handleActivityChange} />
                            </div>
                            <div className="card p-fluid">
                                <label htmlFor="characters">Characters</label>
                                <Chips id="characters" value={selectedCharacters} onChange={handleCharctersChange} optionLabel="label" placeholder="Select characters" display="chip"/>
                            </div>
                            <div className="card p-fluid">
                                <label htmlFor="behavior">Behavior</label>
                                <Chips id="behavior" value={selectedBehaviors} onChange={handleBehaviorChange} optionLabel="label" placeholder="Describe behavior" display="chip"/>
                            </div>
                            {currentStep > 2 && <Button label="Back" className="p-button-secondary" onClick={handleBack} />}
                            <Button label={currentStep === files.length + 3 ? 'Submit' : 'Next'} className="p-button-primary" onClick={handleActionClick} />
                        </>
                    );
                }
        }
    };


    return (
        <>
                    <Button variant="primary" className="observation-button" onClick={handleShow}>
                     + New Observation
                    </Button>
                    <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Sighting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        {renderStep()}
                    </Form>
                    </Modal.Body>
                    </Modal>
        </>
    )
}

export default ObservationForm;