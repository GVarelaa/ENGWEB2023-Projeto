import Button from '@mui/material/Button';
import { Col, Container, Form, Row } from "react-bootstrap";
import { Search as SearchIcon } from 'react-bootstrap-icons'

function Search({ setSearch, handleSearch }) {
    return (
        <Container className="mt-3 mb-4">
            <Row>
                <Col sm={4}>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Procurar"
                            className="me-2"
                            aria-label="Procurar"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button className="mx-2" variant="outline-dark" startIcon={<SearchIcon />} type="submit">Procurar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;