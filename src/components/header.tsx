import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand href="#home">Hung Redux</Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}
