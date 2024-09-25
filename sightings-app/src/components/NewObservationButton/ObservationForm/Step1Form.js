import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { speciesData } from '../Data/speciesData';
import '../NewObservationButton.css';

function Step1Form({
    formData,
    formErrors,
    handleChange,
    handleNext,
    isExactTime,
    handleCommonNameChange,
}) {
    return (
        <Form>
            <>
                <Form.Group className="mb-3">
                    <Form.Label>Date* </Form.Label>
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
                        disabled={!isExactTime} // Disable if not exact time
                        isInvalid={!isExactTime && formData.time} // Mark invalid if time is filled but not exact
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
                        disabled={isExactTime} // Disable if exact time
                        isInvalid={!isExactTime && !formData.timeName} // Mark invalid if not filled and not exact time
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
                    <Form.Control
                        type="text"
                        placeholder="Enter latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        isInvalid={!!formErrors.latitude}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.latitude}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        isInvalid={!!formErrors.longitude}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.longitude}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Common Name*</Form.Label>
                    <Form.Control
                        as="select"
                        name="specieCommonName"
                        value={formData.specieCommonName}
                        onChange={handleCommonNameChange}
                        isInvalid={!!formErrors.specieCommonName}
                    >
                        <option value="">Select a common name</option>
                        {speciesData.map((species, index) => (
                            <option key={index} value={species.commonName}>
                                {species.commonName}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {formErrors.specieCommonName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Scientific Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="scientificName"
                        value={formData.specie}
                        readOnly
                        disabled
                        isInvalid={!!formErrors.specie}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.specie}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button label="Next" className="p-button-primary" onClick={handleNext} />
            </>
        </Form>
    );
}

export default Step1Form;
