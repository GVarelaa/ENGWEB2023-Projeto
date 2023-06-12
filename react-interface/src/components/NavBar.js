import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { Person, Star } from 'react-bootstrap-icons';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{'--bs-navbar-padding-y': '1rem'}}>
        <Container style={{'max-width': '95%'}}>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="#home"><Star className="me-3" size={30}/></Nav.Link>
              <NavDropdown title= {<Person size={30}/>}>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;