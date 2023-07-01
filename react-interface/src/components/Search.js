import Button from '@mui/material/Button'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { Container, Form, Card, FloatingLabel, Row, Col } from "react-bootstrap"
import { Search as SearchIcon, PlusCircle, Trash3 } from 'react-bootstrap-icons'

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
        setIsSelected(false)
    }


    const handleSearchChange = (filter) => {
        queryString["search"] = filter

        var string = "?", first = true
        Object.keys(queryString).forEach(key => {
            if (queryString[key] !== "") {
                if (key === "Data") {
                    if (first) {
                        string += "Data do Acordão=" + queryString[key]
                        first = false
                    }
                    else string += "&Data do Acordão=" + queryString[key]
                }
                else {
                    if (first) {
                        string += key + '=' + queryString[key]
                        first = false
                    }
                    else string += '&' + key + '=' + queryString[key]
                }
            }

        })
        setSearch(string)
    }


    const handleFilterChange = (filter, item) => {
        queryString[item] = filter

        var string = "?", first = true
        Object.keys(queryString).forEach(key => {
            if (queryString[key] !== "") {
                if (key === "Data") {
                    if (first) {
                        string += "Data do Acordão=" + queryString[key]
                        first = false
                    }
                    else string += "&Data do Acordão=" + queryString[key]
                }
                if (key == "Tribunal"){
                    if (first) {
                        string += "tribunal=" + queryString[key]
                        first = false
                    }
                    else string += "&tribunal=" + queryString[key]
                }
                else {
                    if (first) {
                        string += key + '=' + queryString[key]
                        first = false
                    }
                    else string += '&' + key + '=' + queryString[key]
                }
            }

        })
        setSearch(string)
    }


    const handleRemoveFilter = (e, item) => {
        setPossibleFilters(current => [...current, item])

        setFilters(current => {
            return current.filter(i => i !== item)
        })
    }

    return (
        <Container className="mt-3 mb-4">
            <Form onSubmit={handleSearch}>
                <Form.Control className="d-flex mb-5" type="search" placeholder="Procurar..." aria-label="Procurar" onChange={(e) => handleSearchChange(e.target.value)}/>
                <Card>
                    <Card.Header className="d-flex justify-content-center"><p>Filtros</p></Card.Header>
                    <Card.Body>
                        <Card.Body>
                            <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={handleAddFilter}>Adicionar Filtro</Button>
                            {isSelected && (
                                <Form.Select className="my-3" defaultValue="" onChange={(e) => handleSelectChange(e.target.value)}>
                                    <option disabled hidden value="">Filtro:</option>
                                    {possibleFilters.map(item => {
                                        return <option>{item}</option>
                                    })}
                                </Form.Select>
                            )}
                            {filters.map(item => {
                                return (
                                    <Row>
                                        <Col md={10}>
                                            <FloatingLabel className="form-outline" label={item} style={{ transform: 'scale(0.90)' }}>
                                                <Form.Control className="my-3" type="search" placeholder={item} onChange={(e) => handleFilterChange(e.target.value, item)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={1} className="d-flex justify-content-start">
                                            <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-1em' }} size={20} color="black" onClick={e => handleRemoveFilter(e, item)}/></Link>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Card.Body>
                    </Card.Body>
                </Card>
                <div className="d-flex justify-content-center mt-5">
                    <Button type="submit" variant="outline-dark" startIcon={<SearchIcon />} style={{ width: '50%' }}>Procurar</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Search