import NavBar from "../components/NavBar";
import { Container,Row } from "react-bootstrap";

const NoPage = () => {
  return (
    <div>
      <NavBar />
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="col-md-8">
        <img src="no_page.png" />
        </Row>
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <h1>Deste um tiro ao Lado!</h1>
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <h2>A página que procuraste não está disponível!</h2>
      </Container>
    </div>
  );
};

export default NoPage;
