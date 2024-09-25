import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';
import { lifeStageOptions } from '../Data/lifeStageOption';
import { StorageImage } from "@aws-amplify/ui-react-storage";

function ImageMetadataForm({
    file,
    isExistingMedia,
    selectedLifeStages,
    selectedActivities,
    selectedCharacters,
    selectedBehaviors,
    handleLifeStageChange,
    handleActivityChange,
    handleCharactersChange,
    handleBehaviorChange,
    handleNext,
    handleBack,
    isLastStep,
}) {
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (file) {
            if (file instanceof File) {
                // If it's a new uploaded file
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);

                // Clean up the URL object when the component unmounts
                return () => URL.revokeObjectURL(url);
            } else if (typeof file === 'string') {
                // If it's an existing media path
                setPreviewUrl(file);
            } else {
                console.error('Unsupported file type in ImageMetadataForm');
            }
        }
    }, [file]);

    const mediaPreview = () => {
        if (previewUrl) {
            if (isExistingMedia) {
                // Use StorageImage for existing media paths
                return (
                    <StorageImage
                        path={previewUrl} // Remove 'public/' if your paths include it
                        alt="Preview"
                        style={{ width: '100%', maxHeight: '400px' }}
                    />
                );
            } else {
                // Determine if the new file is a video or image
                if (previewUrl.endsWith('.mp4') || previewUrl.endsWith('.mov')) {
                    return (
                        <video width="100%" controls>
                            <source src={previewUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                } else {
                    return <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '400px' }} />;
                }
            }
        } else {
            return <p>No preview available</p>;
        }
    };

    return (
        <>
            {mediaPreview()}
            <div className="card p-fluid">
                <label htmlFor="lifeStage">Life Stage</label>
                <MultiSelect
                    id="lifeStage"
                    value={selectedLifeStages}
                    options={lifeStageOptions}
                    onChange={handleLifeStageChange}
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select life stages"
                    display="chip"
                />
            </div>
            <div className="card p-fluid">
                <label htmlFor="activity">Activity</label>
                <Chips id="activity" value={selectedActivities} onChange={handleActivityChange} />
            </div>
            <div className="card p-fluid">
                <label htmlFor="characters">Characters</label>
                <Chips id="characters" value={selectedCharacters} onChange={handleCharactersChange} />
            </div>
            <div className="card p-fluid">
                <label htmlFor="behavior">Behavior</label>
                <Chips id="behavior" value={selectedBehaviors} onChange={handleBehaviorChange} />
            </div>
            <div className="form-navigation">
                <Button label="Back" className="p-button-secondary" onClick={handleBack} />
                <Button label={isLastStep ? 'Submit' : 'Next'} className="p-button-primary" onClick={handleNext} />
            </div>
        </>
    );
}

export default ImageMetadataForm;
