import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';

function Step2Form({ formData, formErrors, handleChange, handleNext, handleBack }) {
    return (
        <Form>
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

                <Button label="Back" className="p-button-secondary" onClick={handleBack} />
                <Button label="Next" className="p-button-primary" onClick={handleNext} />
            </>
        </Form>
    );
}

export default Step2Form;
