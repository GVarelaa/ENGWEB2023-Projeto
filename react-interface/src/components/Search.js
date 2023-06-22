import { useStepContext } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import { Search as SearchIcon, PlusCircle } from 'react-bootstrap-icons'

function Search({ setSearch, handleSearch }) {
    const [filters, setFilters] = useState([])
    const [possibleFilters, setPossibleFilters] = useState(["Processo", "Data", "Tribunal", "Relator", "Descritores", "Votação"])
    const [queryString, setQueryString] = useState({})
    const [isSelected, setIsSelected] = useState(false)

    const handleAddFilter = () => {
        setIsSelected(true)
    }


    const handleSelectChange = (item) => {
        setPossibleFilters(current => {
            return current.filter(i => i !== item)
        })

        setFilters(current => [...current, item])
    }


    const handleSearchChange = (filter) => {
        queryString["search"] = filter
        
        var string = "?"
        var first = true
        Object.keys(queryString).forEach(key => {
            if(first) {
                string += key + '=' + queryString[key]
                first = false
            }
            else string += '&' + key + '=' + queryString[key]
        })
        setSearch(string)
    }


    const handleFilterChange = (filter, item) => {
        queryString[item] = filter

        var string = "?"
        var first = true
        Object.keys(queryString).forEach(key => {
            if(first) {
                string += key + '=' + queryString[item]
                first = false
            }
            else string += '&' + key + '=' + queryString[item]
        })
        setSearch(string)
    }

    console.log(queryString)

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
                            onChange= {(e) => handleSearchChange(e.target.value)}
                        />
                        <Button type="submit" className="mx-2" variant="outline-dark" startIcon={<SearchIcon />} style={{ width: '50%' }} >Procurar</Button>
                    </Form>
                </Col>

                <Col sm={4}>
                    <Card>
                        <Card.Header className='d-flex justify-content-center'><p>Filtros</p></Card.Header>
                        <Card.Body>
                            <Card.Body>
                                <Button variant="outline-dark" startIcon={<PlusCircle />} onClick={handleAddFilter}>Adicionar Filtro</Button>
                                {
                                    isSelected &&

                                    <Form.Select className="my-3" onChange={(e) => handleSelectChange(e.target.value)}>
                                        <option> Adicionar Filtro </option>
                                        {possibleFilters.map(item => {
                                            return <option>{item}</option>
                                        })}
                                    </Form.Select>

                                }
                            </Card.Body>


                            {
                                filters.map(item => {
                                    return <Form.Control className="my-3" type="search" placeholder={item} onChange={(e) => handleFilterChange(e.target.value, item)}/>
                                })
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

// <Form.Control type="search" placeholder="Processo" />
export default Search;