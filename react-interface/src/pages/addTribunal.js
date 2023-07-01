import NavBar from "../components/NavBar"
import { useState} from "react"
import { Link } from "react-router-dom"
import { Container, Form, Col, Row, Card } from "react-bootstrap"
import Button from '@mui/material/Button'
import { ToastContainer, toast } from "react-toastify"
import { PlusCircle, Trash3, Plus } from 'react-bootstrap-icons'
import axios from "axios"

var env = require("../config/env")

function Insert() {
    const [form, setForm] = useState({
        "nome":"",
        "_id":"",
        "descritores": [""],
        "areaTematica1": [""],
        "areaTematica2": [""]
    })
    
    const [refresh, setRefresh] = useState("") // Atualizar o estado

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(env.apiTribunaisAccessPoint + `?token=${localStorage.token}`, form)
            .then((response) => {
                console.log(response.data)
                if (response===form){
                    toast.success("O tribunal foi adicionado com sucesso!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                else {
                    toast.error("Não foi possível adicionar o tribunal!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch((error) => {
                toast.error("Não foi possível adicionar o tribunal!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }


    const handleRemoveDescritor = (e, index) => {
        form["descritores"].splice(index,1)
        setRefresh(new Date().toISOString())
    }


    const handleChangeDescritor = (e, index) => {
        form["descritores"][index] = e.target.value
        setRefresh(new Date().toISOString())
    }


    const handleAddDescritor = (e) => {
        form["descritores"].push("")
        setRefresh(new Date().toISOString())
    }


    const handleChange = (e, field) => {
        form[field] = e.target.value
        setRefresh(new Date().toISOString())
    }

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <Card className='d-flex justify-content-center' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Container className="my-4 mb-4">
                                <h4 className="mb-4">Adicionar Tribunal</h4>
                                <Row className="gx-3 mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Nome do Tribunal:</Form.Label>
                                            <Form.Control required type="text" placeholder="Nome" value={form["nome"]} onChange={(e) => handleChange(e, "nome")} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Sigla de Identificação:</Form.Label>
                                            <Form.Control required type="text" placeholder="Sigla" value={form["_id"]} onChange={(e) => handleChange(e, "_id")} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="gx-3 mb-3">
                                <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group>
                                                        <Form.Label style={{ marginLeft: '10px' }}>Descritores:</Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["descritores"].map((value, index) => {
                                                    {
                                                        return (
                                                            <Row className="mb-3">
                                                                <Col md={11}>
                                                                    <Form.Group>
                                                                        <Form.Control type="text" placeholder={"Descritor " + (index + 1)} value={form["descritores"][index]} onChange={(e) => handleChangeDescritor(e, index)} />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '0.25cm', marginLeft: '-1em' }} size={20} color="black" onClick={e => { handleRemoveDescritor(e, index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <div style={{ width: '50%' }}>
                                                    <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ fontSize: '12px' }} onClick={e => handleAddDescritor(e)}>Adicionar Descritor</Button>
                                                </div>
                                            </Row>
                                        </>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="mb-3 d-flex justify-content-start padding-bottom">
                                <Button type="submit" className="mx-2" variant="outline-dark" startIcon={<Plus/>}>Registar</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Insert
