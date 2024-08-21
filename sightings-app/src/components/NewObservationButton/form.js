import { useState } from 'react';
import { Button } from 'primereact/button';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { generateClient } from '@aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import { v4 as uuid } from 'uuid';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const client = generateClient();

function UpdateObservationForm({ observation }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        date: observation.date || "",
        time: observation.time || "",
        timeName: observation.timeName || "EXACT",
        reportType: observation.reportType || "",
        site: observation.site || "",
        specieCommonName: observation.specieCommonName || "",
        specie: observation.specie || "",
        count: observation.count || "",
        reporter: observation.reporter || "",
        photographer: observation.photographer || "",
        mediaSource: observation.mediaSource || "",
        stage: observation.stage || null,
        sex: observation.sex || null,
        condition: observation.condition || null,
        length: observation.length || null,
        diskLength: observation.diskLength || null,
        width: observation.width || null,
        depth: observation.depth || null,
        distance: observation.distance || null,
        temperature: observation.temperature || null,
        latitude: observation.latitude || null,
        longitude: observation.longitude || null,
        description: observation.description || "",
        comments: observation.comments || "",
        urlLinks: observation.urlLinks || null,
        substrate: observation.substrate || null,
        weight: observation.weight || null
    });

    const [formErrors, setFormErrors] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = { ...formData, id: observation.id }; // Include the ID to ensure the right record is updated
            const result = await client.graphql({
                query: mutations.updateObservation,
                variables: { input: updatedData }
            });
            console.log('Update result:', result);
            handleClose(); // Close modal on success
        } catch (error) {
            console.error('Failed to update observation:', error);
            alert('Failed to update the observation.');
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Edit Observation</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Observation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Example of input field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                isInvalid={!!formErrors.date}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.date}</Form.Control.Feedback>
                        </Form.Group>
                        {/* Add other form inputs similarly */}
                        <Button type="submit" className="p-button-success">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateObservationForm;
