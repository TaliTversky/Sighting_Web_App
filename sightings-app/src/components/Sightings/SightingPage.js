import Container from "react-bootstrap/esm/Container";
import SightingTable from "./SightingTable";
import SightingsUpdate from "./SightingForm";
// import SightingCreateForm from "../../ui-components/SightingCreateForm";

function SightingPage() {
    return (
        <Container>
            <h1>All Sightings</h1>
            <SightingTable />
            <SightingsUpdate />
        </Container>

    )
}

export default SightingPage;