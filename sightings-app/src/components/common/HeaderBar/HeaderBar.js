import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button"; // Importing Button for the logout

function HeadBar(props) {
  const handleLogout = () => {
    props.logOut(); // Assuming logOut is a prop passed to handle the logout process
  };

  return (
    <header className="head-bar">
      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="*"></Navbar.Brand>
          <Button onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar> */}
    </header>
  );
}

export default HeadBar;
