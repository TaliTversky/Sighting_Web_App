// Import necessary libraries and components
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'primereact/button';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import ImageMetadataForm from './ImageMetadataForm';
import useFormState from '../Hooks/useFormState';
import useFormValidation from '../Hooks/useFormValidation';
import { generateClient } from '@aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import { speciesData } from '../Data/speciesData';
import { lifeStageOptions } from '../Data/lifeStageOption';
import { getUrl, uploadData } from 'aws-amplify/storage';
import { v4 as uuid } from 'uuid';
import { getCurrentUser } from 'aws-amplify/auth';
import '../NewObservationButton.css';

// Generate an AWS Amplify client instance
const client = generateClient();

// Define the ObservationForm component
function ObservationForm() {
    // State variables for modal visibility and form step tracking
    const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Custom hooks for form state and validation
    const {
        formData,
        setFormData,
        files,
        setFiles,
        selectedLifeStagesArray,
        setSelectedLifeStagesArray,
        selectedActivitiesArray,
        setSelectedActivitiesArray,
        selectedCharactersArray,
        setSelectedCharactersArray,
        selectedBehaviorsArray,
        setSelectedBehaviorsArray,
        isExactTime,
        setIsExactTime,
    } = useFormState();

    const { formErrors, setFormErrors, validateAllFields } = useFormValidation(formData);

    // Modal visibility handlers
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Function to validate the current step's inputs
    const validateStep = (step) => {
        const errors = {};
        switch (step) {
            case 1:
                // Validate fields for step 1
                if (!formData.date.trim()) errors.date = "Date is required.";
                if (!isExactTime && !formData.timeName.trim()) errors.timeName = "Time of Day is required when Exact Time is not selected.";
                if (isExactTime && !formData.time.trim()) errors.time = "Time is required when Exact Time is selected.";
                if (!formData.site.trim()) errors.site = "Site is required.";
                if (!formData.specieCommonName.trim()) errors.specieCommonName = "Common Name is required.";
                if (!formData.specie.trim()) errors.specie = "Scientific Name is required.";
                // Validate latitude and longitude if provided
                if (formData.latitude && (isNaN(Number(formData.latitude)) || Number(formData.latitude) < -90 || Number(formData.latitude) > 90)) {
                    errors.latitude = "Latitude must be between -90 and 90.";
                }
                if (formData.longitude && (isNaN(Number(formData.longitude)) || Number(formData.longitude) < -180 || Number(formData.longitude) > 180)) {
                    errors.longitude = "Longitude must be between -180 and 180.";
                }
                break;
            case 2:
                // Validate fields for step 2
                if (!formData.count || isNaN(Number(formData.count)) || Number(formData.count) <= 0) {
                    errors.count = "Count must be a positive number.";
                }
                if (!formData.stage) errors.stage = "Stage is required.";
                if (!formData.sex) errors.sex = "Sex is required.";
                break;
            case 3:
                // Validate fields for step 3
                if (!formData.reporter.trim()) errors.reporter = "Reporter is required.";
                if (!files.length) errors.files = "At least one media file is required.";
                break;
            default:
                break;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle changes to form inputs
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (name === 'isExactTime') {
            setIsExactTime(checked);
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    timeName: 'EXACT',
                    time: '',
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    timeName: '',
                    time: '',
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle the action button click (Next or Submit)
    const handleActionClick = (e) => {
        e.preventDefault();
        if (!validateAllFields()) {
            alert("Please fix the errors before proceeding.");
            return;
        }
        if (currentStep === files.length + 3) {
            addNewObservation(e);
        } else {
            handleNext(e);
        }
    };

    // Proceed to the next step
    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        } else {
            const errorMessages = Object.values(formErrors).join('\n');
            alert(`Please correct the following errors before proceeding:\n${errorMessages}`);
        }
    };

    // Go back to the previous step
    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Handle file uploads
    const handleFileChange = (event) => {
        const uploadedFiles = Array.from(event.target.files).filter((file) => {
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

    // Handle life stage selection change
    const handleLifeStageChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedLifeStagesArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    // Handle activity selection change
    const handleActivityChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedActivitiesArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    // Handle characters selection change
    const handleCharactersChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedCharactersArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    // Handle behavior selection change
    const handleBehaviorChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedBehaviorsArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    // Handle common name selection change
    const handleCommonNameChange = (event) => {
        const commonName = event.target.value;
        const species = speciesData.find((species) => species.commonName === commonName);
        setFormData((prevFormData) => ({
            ...prevFormData,
            specie: species ? species.scientificName : '',
            specieCommonName: commonName,
        }));
    };

    // Function to add a new observation
    const addNewObservation = async (e) => {
        if (e) e.preventDefault();
        if (!files.length) {
            console.log("No files selected.");
            return;
        } else {
            console.log(files);
        }

        // Collect all labels from metadata arrays
        const allLabels = new Set();
        selectedActivitiesArray.forEach((activities) =>
            activities?.forEach((a) => allLabels.add(a))
        );
        selectedCharactersArray.forEach((characters) =>
            characters?.forEach((c) => allLabels.add(c))
        );
        selectedBehaviorsArray.forEach((behaviors) =>
            behaviors?.forEach((b) => allLabels.add(b))
        );

        try {
            const user = await getCurrentUser();
            const observationId = uuid();

            const newObservation = {
                id: observationId,
                ...formData,
                time: isExactTime ? formData.time : null,
                byUser: user.signInDetails.loginId,
            };
            console.log("new observation >>> ", newObservation);

            // Create the observation record
            const response = await client.graphql({
                query: mutations.createObservation,
                variables: { input: newObservation },
            });

            const observationRecord = response.data.createObservation;

            // Upload files and create media records
            const mediaEntries = await Promise.all(
                files.map(async (file, index) => {
                    const contentType = file.type;
                    const fileExtension = file.type.startsWith("image") ? "png" : "mp4";
                    const fileName = `${observationRecord.id}_${index + 1}.${fileExtension}`;

                    // Upload file to S3
                    await uploadData({
                        path: `public/${fileName}`,
                        data: file,
                        options: { contentType: contentType },
                    });

                    // Collect metadata for this file
                    const mediaMetadata = {
                        lifeStage: selectedLifeStagesArray[index],
                        activity: selectedActivitiesArray[index],
                        characters: selectedCharactersArray[index],
                        behavior: selectedBehaviorsArray[index],
                    };

                    // Create a media record
                    const mediaId = uuid();
                    const mediaEntry = {
                        id: mediaId,
                        Image: `public/${fileName}`,
                        specie: observationRecord.specie,
                        Date: observationRecord.date,
                        time: observationRecord.time,
                        place: observationRecord.site,
                        type: contentType.startsWith("image") ? "Image" : "Video",
                        observationID: observationRecord.id,
                        ...mediaMetadata,
                    };

                    await client.graphql({
                        query: mutations.createMedia,
                        variables: { input: mediaEntry },
                    });

                    return mediaEntry.Image;
                })
            );

            // Update the observation with media and labels
            const mediaUpdateObservation = {
                id: observationRecord.id,
                labels: Array.from(allLabels),
                Media: mediaEntries,
            };

            await client.graphql({
                query: mutations.updateObservation,
                variables: { input: mediaUpdateObservation },
            });

            handleClose();
            // Optionally reset form data
        } catch (err) {
            console.log("error", err);
        }
    };

    // Function to render the current step of the form
    const renderStep = () => {
        if (currentStep === 1) {
            return (
                <Step1Form
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    isExactTime={isExactTime}
                    handleCommonNameChange={handleCommonNameChange}
                />
            );
        } else if (currentStep === 2) {
            return (
                <Step2Form
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            );
        } else if (currentStep === 3) {
            return (
                <Step3Form
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleFileChange={handleFileChange}
                />
            );
        } else {
            // Steps for media metadata forms
            const fileIndex = currentStep - 4;
            const isLastStep = currentStep === files.length + 3;
            const file = files[fileIndex];
            return (
                <ImageMetadataForm
                    file={file}
                    selectedLifeStages={selectedLifeStagesArray[fileIndex] || []}
                    selectedActivities={selectedActivitiesArray[fileIndex] || []}
                    selectedCharacters={selectedCharactersArray[fileIndex] || []}
                    selectedBehaviors={selectedBehaviorsArray[fileIndex] || []}
                    handleLifeStageChange={handleLifeStageChange}
                    handleActivityChange={handleActivityChange}
                    handleCharactersChange={handleCharactersChange}
                    handleBehaviorChange={handleBehaviorChange}
                    handleNext={handleActionClick}
                    handleBack={handleBack}
                    isLastStep={isLastStep}
                    lifeStageOptions={lifeStageOptions}
                />
            );
        }
    };

    // Render the modal and the observation button
    return (
        <>
            <Button variant="primary" className="observation-button" onClick={handleShow}>
                + New Observation
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Sighting</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderStep()}</Modal.Body>
            </Modal>
        </>
    );
}

// Export the ObservationForm component
export default ObservationForm;
