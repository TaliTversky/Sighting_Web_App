import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { generateClient } from '@aws-amplify/api';

// Generate an AWS Amplify client instance (if needed elsewhere)
const client = generateClient();

// Define the Step3Form component
function Step3Form({ 
    formData, 
    formErrors, 
    handleChange, 
    handleNext, 
    handleBack, 
    handleFileChange 
}) {
    return (
        <Form>
            <>
                {/* Reporter Field */}
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

                {/* Photographer Field */}
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

                {/* Report Type Field */}
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

                {/* Media Source Field */}
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

                {/* Links Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Links</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Links" 
                        name="urlLinks" 
                        value={formData.urlLinks} 
                        onChange={handleChange} 
                        isInvalid={!!formErrors.urlLinks} 
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.urlLinks}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Description Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        isInvalid={!!formErrors.description} 
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Comments Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter comments" 
                        name="comments" 
                        value={formData.comments} 
                        onChange={handleChange} 
                        isInvalid={!!formErrors.comments} 
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.comments}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Media Upload Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Media</Form.Label>
                    <Form.Control 
                        type="file" 
                        multiple 
                        onChange={handleFileChange} 
                        name="media" 
                        accept="image/*,video/*"
                    />
                </Form.Group>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between">
                    <Button label="Back" className="p-button-secondary" onClick={handleBack} />
                    <Button label="Next" className="p-button-primary" onClick={handleNext} />
                </div>
            </>
        </Form>
    );
}

export default Step3Form;
