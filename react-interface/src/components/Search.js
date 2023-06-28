import { useStepContext } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Col, Container, Form, Card, FloatingLabel} from "react-bootstrap";
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

        var string = "?", first = true
        Object.keys(queryString).forEach(key => {
            if (queryString[key] !== "") {
                if (key === "Data") {
                    if (first) {
                        string += "Data do Acordão" + '=' + queryString[key]
                        first = false
                    }
                    else string += '&' + "Data do Acordão" + '=' + queryString[key]
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
                        string += "Data do Acordão" + '=' + queryString[key]
                        first = false
                    }
                    else string += '&' + "Data do Acordão" + '=' + queryString[key]
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

    return (
        <Container className="mt-3 mb-4">
            <Form className="d-flex mb-5" onSubmit={handleSearch}>
                <Form.Control type="search" placeholder="Procurar..."    aria-label="Procurar" onChange={(e) => handleSearchChange(e.target.value)}
                />
            </Form>
            <Card>
                <Card.Header className='d-flex justify-content-center'><p>Filtros</p></Card.Header>
                <Card.Body>
                    <Card.Body>
                        <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={handleAddFilter}>Adicionar Filtro</Button>
                        {isSelected && 
                            <Form.Select className="my-3" defaultValue="" onChange={(e) => handleSelectChange(e.target.value)}>
                                <option disabled hidden value="">Filtro:</option>
                                    {possibleFilters.map(item => {
                                        return <option>{item}</option>
                                    })}
                            </Form.Select>
                        }
                    </Card.Body>
                    {
                        filters.map(item => {
                            return (
                                <>
                                <FloatingLabel className="form-outline" label={item} style={{ transform: 'scale(0.85)' }}>
                                    <Form.Control className="my-3" type="search" placeholder={item} onChange={(e) => handleFilterChange(e.target.value, item)} />
                                </FloatingLabel>
                                </>
                            )
                        })
                    }
                </Card.Body>
            </Card>
            <Button type="submit" className="mx-2 mt-5" variant="outline-dark" startIcon={<SearchIcon />} style={{ width: '50%' }} >Procurar</Button>
        </Container>
    );
}

// <Form.Control type="search" placeholder="Processo" />
export default Search;