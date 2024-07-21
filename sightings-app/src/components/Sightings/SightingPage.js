import Container from "react-bootstrap/esm/Container";
import SightingTable from "./SightingTable";
import SightingForm from "./SightingForm2";
// import SightingCreateForm from "../../ui-components/SightingCreateForm";

function SightingPage() {
    return (
        <Container>
            <h1>All Sightings</h1>
            <SightingTable />
            <SightingForm />
        </Container>

    )
}

export default SightingPage;