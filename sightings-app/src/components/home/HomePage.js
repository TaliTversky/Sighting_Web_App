import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";


function HomePage() {
    return (
        <Container>
            <Row className="px-4 my-5">
                <Col xs={4} sm={6}>
                    <h1>Home Page</h1>
                </Col>

            </Row>
        </Container>
        
    )
}

export default HomePage;