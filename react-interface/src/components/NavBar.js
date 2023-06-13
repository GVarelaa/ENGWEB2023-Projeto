import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ '--bs-navbar-padding-y': '1rem' }}>
        <Container style={{ 'max-width': '95%' }}>
          <Navbar.Brand href="#home">Acordãos</Navbar.Brand>
          <Navbar.Collapse>
            <Nav >
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
            </Nav>

            <Nav className='ms-auto'>
              <Nav.Link href="#favorites" className='me-3 pe-5'>
                <FontAwesomeIcon icon={faHeart} size='lg'/>
              </Nav.Link>

              <NavDropdown className='pe-5 me-5' title={<FontAwesomeIcon icon={faUser} size='lg'/>} id="account-dropdown">
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;