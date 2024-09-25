import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import ImageMetadataForm from './ImageMetadataForm';
import useFormState from '../Hooks/useFormState';
import useFormValidation from '../Hooks/useFormValidation';
import { generateClient } from '@aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { speciesData } from '../Data/speciesData';
import { lifeStageOptions } from '../Data/lifeStageOption';
import { v4 as uuid } from 'uuid';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, remove } from 'aws-amplify/storage';
import "../NewObservationButton.css";

// Generate an AWS Amplify client instance
const client = generateClient();

// Define the UpdateObservationForm component
function UpdateObservationForm({ observationId, onClose }) {
    // State variables for managing component behavior
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

    const [existingMediaFiles, setExistingMediaFiles] = useState([]);
    const [originalObservation, setOriginalObservation] = useState(null);

    const { formErrors, setFormErrors, validateAllFields } = useFormValidation(formData);

    // Modal visibility handlers
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        if (onClose) onClose();
    };

    // Fetch observation data on component mount
    useEffect(() => {
        handleShow();
        fetchObservationData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to fetch existing observation data
    const fetchObservationData = async () => {
        try {
            // Fetch the observation data by ID
            const response = await client.graphql({
                query: queries.getObservation,
                variables: { id: observationId },
            });
            const observation = response.data.getObservation;
            if (observation) {
                setOriginalObservation(observation);
                // Set the form data with the fetched observation details
                setFormData({
                    date: observation.date || '',
                    time: observation.time || '',
                    timeName: observation.timeName || '',
                    site: observation.site || '',
                    specieCommonName: observation.specieCommonName || '',
                    specie: observation.specie || '',
                    latitude: observation.latitude || null,
                    longitude: observation.longitude || null,
                    count: observation.count || null,
                    stage: observation.stage || '',
                    sex: observation.sex || '',
                    reporter: observation.reporter || '',
                });
                setIsExactTime(!!observation.time);

                // Fetch existing media associated with the observation
                const mediaResponse = await client.graphql({
                    query: queries.listMedia,
                    variables: {
                        filter: {
                            observationID: { eq: observationId },
                        },
                    },
                });
                const mediaList = mediaResponse.data.listMedia.items;

                // Process media URLs
                await fetchMediaUrls(mediaList);

                // Initialize metadata arrays based on existing media
                setSelectedLifeStagesArray(mediaList.map((media) => media.lifeStage || []));
                setSelectedActivitiesArray(mediaList.map((media) => media.activity || []));
                setSelectedCharactersArray(mediaList.map((media) => media.characters || []));
                setSelectedBehaviorsArray(mediaList.map((media) => media.behavior || []));
            }
        } catch (err) {
            console.log('Error fetching observation data', err);
        }
    };

    // Function to process media URLs
    const fetchMediaUrls = async (mediaList) => {
        try {
            const updatedMediaFiles = mediaList.map((media) => {
                return { ...media, ImagePath: media.Image }; // Add ImagePath property
            });
            setExistingMediaFiles(updatedMediaFiles);
        } catch (error) {
            console.error('Error processing media paths', error);
        }
    };

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value, checked } = event.target;
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

    // Handle common name selection
    const handleCommonNameChange = (event) => {
        const commonName = event.target.value;
        const species = speciesData.find((species) => species.commonName === commonName);
        setFormData((prevFormData) => ({
            ...prevFormData,
            specie: species ? species.scientificName : '',
            specieCommonName: commonName,
        }));
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
        setFiles([...files, ...uploadedFiles]);
    };

    // Handle deletion of existing media
    const handleDeleteMedia = (index) => {
        setExistingMediaFiles((prev) => {
            const newMedia = [...prev];
            newMedia[index].toBeDeleted = true;
            return newMedia;
        });
    };

    // Handlers for metadata selection changes
    const handleLifeStageChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedLifeStagesArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    const handleActivityChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedActivitiesArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    const handleCharactersChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedCharactersArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    const handleBehaviorChange = (e) => {
        const currentFileIndex = currentStep - 4;
        setSelectedBehaviorsArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentFileIndex] = e.value;
            return newArray;
        });
    };

    // Handle form actions (next/back/update)
    const handleActionClick = (e) => {
        e.preventDefault();
        if (!validateAllFields()) {
            alert('Please fix the errors before proceeding.');
            return;
        }
        const totalSteps = existingMediaFiles.length + files.length + 3;
        if (currentStep === totalSteps) {
            updateObservation(e);
        } else {
            handleNext(e);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Function to update the observation
    const updateObservation = async (e) => {
        if (e) e.preventDefault();

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

            const updatedObservation = {
                id: observationId,
                ...formData,
                time: isExactTime ? formData.time : null,
                byUser: user.signInDetails.loginId,
            };

            // Update the observation data
            await client.graphql({
                query: mutations.updateObservation,
                variables: { input: updatedObservation },
            });

            // Handle existing media files
            for (let i = 0; i < existingMediaFiles.length; i++) {
                const media = existingMediaFiles[i];
                if (media.toBeDeleted) {
                    // Delete media entry and file from storage
                    await client.graphql({
                        query: mutations.deleteMedia,
                        variables: { input: { id: media.id } },
                    });
                    await remove(media.Image);
                } else {
                    // Update media metadata
                    const mediaMetadata = {
                        id: media.id,
                        lifeStage: selectedLifeStagesArray[i],
                        activity: selectedActivitiesArray[i],
                        characters: selectedCharactersArray[i],
                        behavior: selectedBehaviorsArray[i],
                    };
                    await client.graphql({
                        query: mutations.updateMedia,
                        variables: { input: mediaMetadata },
                    });
                }
            }

            // Handle new uploaded files
            await Promise.all(
                files.map(async (file, index) => {
                    const contentType = file.type;
                    const fileExtension = file.type.startsWith('image') ? 'png' : 'mp4';
                    const fileName = `${observationId}_${uuid()}.${fileExtension}`;

                    // Upload the file to storage
                    await uploadData({
                        path: `public/${fileName}`,
                        data: file,
                        options: { contentType: contentType },
                    });

                    const metaIndex = existingMediaFiles.length + index;
                    const mediaMetadata = {
                        lifeStage: selectedLifeStagesArray[metaIndex],
                        activity: selectedActivitiesArray[metaIndex],
                        characters: selectedCharactersArray[metaIndex],
                        behavior: selectedBehaviorsArray[metaIndex],
                    };

                    const mediaId = uuid();
                    const mediaEntry = {
                        id: mediaId,
                        Image: `public/${fileName}`,
                        specie: formData.specie,
                        Date: formData.date,
                        time: formData.time,
                        place: formData.site,
                        type: contentType.startsWith('image') ? 'Image' : 'Video',
                        observationID: observationId,
                        ...mediaMetadata,
                    };

                    // Create media entry in the database
                    await client.graphql({
                        query: mutations.createMedia,
                        variables: { input: mediaEntry },
                    });
                })
            );

            // Update observation labels
            const mediaUpdateObservation = {
                id: observationId,
                labels: Array.from(allLabels),
            };

            await client.graphql({
                query: mutations.updateObservation,
                variables: { input: mediaUpdateObservation },
            });

            // Close the modal after updating
            handleClose();
        } catch (err) {
            console.log('error', err);
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
                    existingMediaFiles={existingMediaFiles}
                    handleDeleteMedia={handleDeleteMedia}
                />
            );
        } else {
            // Steps for media metadata forms
            const fileIndex = currentStep - 4;
            const totalMediaFiles = existingMediaFiles.length + files.length;
            const isLastStep = currentStep === totalMediaFiles + 3;
            let file;
            let isExistingMedia = false;
            if (fileIndex < existingMediaFiles.length) {
                // Existing media file
                file = existingMediaFiles[fileIndex].ImagePath; 
                isExistingMedia = true;
            } else {
                // New uploaded file
                file = files[fileIndex - existingMediaFiles.length];
            }
            return (
                <ImageMetadataForm
                    file={file}
                    isExistingMedia={isExistingMedia}
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

    // Render the modal with the appropriate form step
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Sighting</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderStep()}</Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateObservationForm;