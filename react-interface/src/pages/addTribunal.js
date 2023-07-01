import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Form, FloatingLabel, Col, Row, Card } from "react-bootstrap"
import Button from '@mui/material/Button'
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify"
import { PlusCircle, Trash3 } from 'react-bootstrap-icons'
import axios from "axios"

var env = require("../config/env")

function Insert() {

    const [campos, setCampos] = useState([])
    const [tribunais, setTribunais] = useState([])
    const [listaDescritores, setListaDescritores] = useState([])
    const [form, setForm] = useState({
        "nome":"",
        "_id":"",
        "descritores": [""],
        "areaTematica1": [""],
        "areaTematica2": [""]
    })
    const [refresh, setRefresh] = useState("") // Atualizar o estado


    useEffect(() => {
        const fetchData = async () => {
            axios.get(env.apiTribunaisAccessPoint + `?token=${localStorage.token}`)
                .then((response) => {
                    setTribunais(response.data)

                    axios.get(env.apiTribunaisAccessPoint + "/" + response.data[0]._id + "/descritores" + `?token=${localStorage.token}`)
                        .then((response) => {
                            response.data.descritores.sort()
                            setListaDescritores(
                                response.data.descritores.map((descritor) => ({
                                    label: descritor,
                                    value: descritor,
                                }))
                            )
                        })
                        .catch((error) => {
                            toast.error("Não foi possível obter a lista de descritores!", {
                                position: toast.POSITION.TOP_CENTER
                            })
                        })
                })
                .catch((error) => {
                    toast.error("Não foi possível obter a lista de tribunais!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                })

            axios.get(env.apiFieldsAccessPoint + `?token=${localStorage.token}`)
                .then((response) => {
                    response.data.sort((a, b) => {
                        let f1 = a.field.toLowerCase(),
                            f2 = b.field.toLowerCase()

                        if (f1 < f2) return -1
                        if (f1 > f2) return 1
                        return 0
                    })
                    setCampos(response.data)
                })
                .catch((error) => {
                    toast.error("Não foi possível obter a lista de campos adicionais!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
        }

        fetchData()
    }, [])

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


    const handleATRemoveField = (e, field, index) => {
        var list = []
        for (let i = 0; i < form[field].length; i++) {
            if (i !== index) {
                list.push(form[field][i])
            }
        }

        form[field] = list
        setRefresh(new Date().toISOString())
    }


    const handleMultiChangeField = (e, field, index) => {
        form[field][index] = e.target.value
        setRefresh(new Date().toISOString())
    }


    const handleMultiAddField = (e, field) => {
        form[field].push("")
        setRefresh(new Date().toISOString())
    }


    const handleChange = (e, field) => {
        form[field] = e.target.value
        setRefresh(new Date().toISOString())
    }


    console.log(form)

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <Card className='d-flex justify-content-center' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Container className="my-4 mb-5">
                                <h4 className="mb-3">Informação Principal</h4>
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
                                <Row>
                                <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ marginLeft: '10px' }}>Descritores</Form.Label>
                                                        <Form.Control className="my-3" type="text" placeholder={"Descritores " + 1} value={form["descritores"][0]} onChange={(e) => handleMultiChangeField(e, "descritores", 0)} />

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["descritores"].map((value, index) => {
                                                    {
                                                        return (
                                                            index !== 0 &&
                                                            <Row>
                                                                <Col md={11}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label style={{ marginLeft: '10px' }}>{"Descritores " + (index + 1)}</Form.Label>
                                                                        <Form.Control className="my-3" type="text" placeholder={"Descritores " + (index + 1)} value={form["descritores"][index]} onChange={(e) => handleMultiChangeField(e, "descritores", index)} />

                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => { handleATRemoveField(e, "descritores", index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, "descritores")}>Adicionar {"descritores"}</Button>
                                            </Row>
                                        </>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ marginLeft: '10px' }}>Área Temática 1</Form.Label>
                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 1 " + 1} value={form["areaTematica1"][0]} onChange={(e) => handleMultiChangeField(e, "areaTematica1", 0)} />

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["areaTematica1"].map((value, index) => {
                                                    {
                                                        return (
                                                            index !== 0 &&
                                                            <Row>
                                                                <Col md={11}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label style={{ marginLeft: '10px' }}>{"Área Temática 1 " + (index + 1)}</Form.Label>
                                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 1 " + (index + 1)} value={form["areaTematica1"][index]} onChange={(e) => handleMultiChangeField(e, "areaTematica1", index)} />

                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => { handleATRemoveField(e, "areaTematica1", index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, "areaTematica1")}>Adicionar Área Temática 1</Button>
                                            </Row>
                                        </>
                                    </Col>
                                    <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ marginLeft: '10px' }}>Área Temática 2</Form.Label>
                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 2 " + 1} value={form["areaTematica2"][0]} onChange={(e) => handleMultiChangeField(e, "areaTematica2", 0)} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["areaTematica2"].map((value, index) => {
                                                    {
                                                        return (
                                                            index !== 0 &&
                                                            <Row>
                                                                <Col md={11}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label style={{ marginLeft: '10px' }}>{"Área Temática 2 " + (index + 1)}</Form.Label>
                                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 2 " + (index + 1)} value={form["areaTematica2"][index]} onChange={(e) => handleMultiChangeField(e, "areaTematica2", index)} />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => { handleATRemoveField(e, "areaTematica2", index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, "areaTematica2")}>Adicionar Área Temática 2</Button>
                                            </Row>
                                        </>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="mb-5 d-flex justify-content-center padding-bottom">
                                <Button type="submit" variant="outline-dark">Registar</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Insert
