import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import axios from "axios"
import env from "../config/env"


function Search({ setData }) {
    const [search, setSearch] = useState("")

    const handleSearch = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.get(env.apiAcordaosAccessPoint + '?search=' + search)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={4}>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit" variant="outline-dark">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;