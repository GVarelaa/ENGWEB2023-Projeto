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
    const [selectedDescritores, setSelectedDescritores] = useState([])
    const [selectedAT1, setSelectedAT1] = useState([])
    const [selectedAT2, setSelectedAT2] = useState([])
    const [selectedInfo, setSelectedInfo] = useState(false)

    const [campos, setCampos] = useState([])
    const [camposSelecionados, setCamposSelecionados] = useState([])
    const [tribunais, setTribunais] = useState([])
    const [listaDescritores, setListaDescritores] = useState([])
    const [form, setForm] = useState({
        "Processo": "",
        "Data do Acordão": "",
        "tribunal": "",
        "Relator": "",
        "Descritores": [],
        "Votação": "",
        "Decisão": "",
        "Meio Processual": "",
        "Sumário": "",
        "Decisão Texto Integral": "",
        "Área Temática 1": [""],
        "Área Temática 2": [""]
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


    const handleTribunal = (e) => {
        form["tribunal"] = e.target.value
        setRefresh(new Date().toISOString())

        axios.get(env.apiTribunaisAccessPoint + "/" + e.target.value + "/descritores" + `?token=${localStorage.token}`)
            .then((response) => {
                setListaDescritores(response.data.descritores.map((descritor) => ({ label: descritor, value: descritor })))
            })
            .catch((error) => {
                toast.error("Não foi possível obter a lista de descritores!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        var descritores = []
        selectedDescritores.map(obj => descritores.push(obj.label))
        form["Descritores"] = descritores

        axios.post(env.apiAcordaosAccessPoint + `?token=${localStorage.token}`, form)
            .then((response) => {
                toast.success("O acórdão foi adicionado com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            .catch((error) => {
                toast.error("Não foi possível adicionar o acórdão!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }


    const handleAddField = () => {
        setSelectedInfo(true)
    }


    const handleFieldChange = (event) => {
        var campo = campos[event.target.selectedIndex - 1]
        setCamposSelecionados(current => [...current, campo])
        setCampos(current => { return current.filter(i => i.field !== campo.field) })

        if (campo.multiselect === "false") form[campo.field] = ""
        else form[campo.field] = [""]

        setSelectedInfo(false)
    }


    const handleSingleRemoveField = (e, item) => {
        delete form[item.field]
        setCamposSelecionados(current => { return current.filter(i => i.field !== item.field) })
        setCampos(current => [...current, item].sort((a, b) => {
            let f1 = a.field.toLowerCase(),
                f2 = b.field.toLowerCase()

            if (f1 < f2) return -1
            if (f1 > f2) return 1
            return 0
        }))
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


    const handleMultiRemoveField = (e, item, index) => {
        if (form[item.field].length > 1) {
            var list = []
            for (let i = 0; i < form[item.field].length; i++) {
                if (i !== index) {
                    list.push(form[item.field][i])
                }
            }

            form[item.field] = list
        }
        else {
            delete form[item.field]
            setCamposSelecionados(current => { return current.filter(i => i.field !== item.field) })
            setCampos(current => [...current, item].sort((a, b) => {
                let f1 = a.field.toLowerCase(),
                    f2 = b.field.toLowerCase()

                if (f1 < f2) return -1
                if (f1 > f2) return 1
                return 0
            }))
        }
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
                                            <Form.Label style={{ marginLeft: '10px' }}>Processo:</Form.Label>
                                            <Form.Control required type="text" placeholder="Processo" value={form["Processo"]} onChange={(e) => handleChange(e, "Processo")} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Data do Acordão:</Form.Label>
                                            <Form.Control required type="date" placeholder="Data do Acórdão" onChange={(e) => form["Data do Acordão"] = e.target.value} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Tribunal:</Form.Label>
                                            <Form.Select onChange={(e) => handleTribunal(e)}>
                                                {tribunais.map(tribunal => (
                                                    <option key={tribunal._id} value={tribunal._id}>{tribunal.nome}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label style={{ marginLeft: '10px' }}>Relator:</Form.Label>
                                            <Form.Control required type="text" placeholder="Relator" onChange={(e) => form["Relator"] = e.target.value} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ marginLeft: '10px' }}>Área Temática 1</Form.Label>
                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 1 " + 1} value={form["Área Temática 1"][0]} onChange={(e) => handleMultiChangeField(e, "Área Temática 1", 0)} />

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["Área Temática 1"].map((value, index) => {
                                                    {
                                                        return (
                                                            index !== 0 &&
                                                            <Row>
                                                                <Col md={11}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label style={{ marginLeft: '10px' }}>{"Área Temática 1 " + (index + 1)}</Form.Label>
                                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 1 " + (index + 1)} value={form["Área Temática 1"][index]} onChange={(e) => handleMultiChangeField(e, "Área Temática 1", index)} />

                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => { handleATRemoveField(e, "Área Temática 1", index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, "Área Temática 1")}>Adicionar {"Área Temática 1"}</Button>
                                            </Row>
                                        </>
                                    </Col>
                                    <Col md={6}>
                                        <>
                                            <Row>
                                                <Col md={11}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ marginLeft: '10px' }}>Área Temática 2</Form.Label>
                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 2 " + 1} value={form["Área Temática 2"][0]} onChange={(e) => handleMultiChangeField(e, "Área Temática 2", 0)} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {
                                                form["Área Temática 2"].map((value, index) => {
                                                    {
                                                        return (
                                                            index !== 0 &&
                                                            <Row>
                                                                <Col md={11}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label style={{ marginLeft: '10px' }}>{"Área Temática 2 " + (index + 1)}</Form.Label>
                                                                        <Form.Control className="my-3" type="text" placeholder={"Área Temática 2 " + (index + 1)} value={form["Área Temática 2"][index]} onChange={(e) => handleMultiChangeField(e, "Área Temática 2", index)} />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => { handleATRemoveField(e, "Área Temática 2", index) }} /></Link>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })
                                            }
                                            <Row>
                                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, "Área Temática 2")}>Adicionar {"Área Temática 2"}</Button>
                                            </Row>
                                        </>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Descritores:</Form.Label>
                                    <MultiSelect options={listaDescritores} value={selectedDescritores} onChange={setSelectedDescritores} labelledBy="Selecionar" />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Votação:</Form.Label>
                                    <Form.Control required type="text" placeholder="Votação" onChange={(e) => form["Votação"] = e.target.value} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Decisão</Form.Label>
                                    <Form.Control required type="text" placeholder="Decisão" onChange={(e) => form["Decisão"] = e.target.value} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label style={{ marginLeft: '10px' }}>Meio Processual:</Form.Label>
                                    <Form.Control required type="text" placeholder="Meio Processual" onChange={(e) => form["Meio Processual"] = e.target.value} />
                                </Form.Group>

                                <Form.Group className="my-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Sumário:</Form.Label>
                                    <textarea required class="form-control" style={{ height: '200px' }} placeholder="Sumário" onChange={(e) => form["Sumário"] = e.target.value} />
                                </Form.Group>

                                <Form.Group className="my-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Decisão Texto Integral:</Form.Label>
                                    <textarea required class="form-control" style={{ height: '200px' }} placeholder="Decisão Texto Integral" onChange={(e) => form["Decisão Texto Integral"] = e.target.value} />
                                </Form.Group>
                            </Container>

                            <Container className="my-4 mb-5">
                                <h4>Outras Informações</h4>
                                <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={handleAddField}>Adicionar Informação</Button>
                                {selectedInfo && (
                                    <Form.Select className="my-3" defaultValue="" onChange={(e) => handleFieldChange(e)}>
                                        <option disabled hidden value="">Campo:</option>
                                        {campos.map(item => {
                                            return <option>{item.field}</option>
                                        })}
                                    </Form.Select>
                                )}
                                {camposSelecionados.map(item => {
                                    return (
                                        item.multiselect === "false"
                                            ?
                                            <Row>
                                                <Col md={10}>
                                                    <FloatingLabel className="form-outline" label={item.field} style={{ transform: 'scale(0.90)' }}>
                                                        <Form.Control className="my-3" type="text" placeholder={item.field} onChange={(e) => form[item.field] = e.target.value} />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col md={1} className="d-flex justify-content-start">
                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => handleSingleRemoveField(e, item)} /></Link>
                                                </Col>
                                            </Row>
                                            :
                                            <>
                                                {
                                                    form[item.field].map((value, index) => {
                                                        return (
                                                            <Row>
                                                                <Col md={11}>
                                                                    <FloatingLabel className="form-outline" label={item.field + " " + (index + 1)} style={{ transform: 'scale(0.90)' }}>
                                                                        <Form.Control className="my-3" type="text" placeholder={item.field + " " + (index + 1)} value={form[item.field][index]} onChange={(e) => handleMultiChangeField(e, item.field, index)} />
                                                                    </FloatingLabel>
                                                                </Col>
                                                                <Col md={1} className="d-flex justify-content-start">
                                                                    <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-3em' }} size={25} color="black" onClick={e => handleMultiRemoveField(e, item, index)} /></Link>
                                                                </Col>
                                                            </Row>)
                                                    })
                                                }
                                                <Row>
                                                    <Button variant="outline-dark" startIcon={<PlusCircle />} style={{ padding: '0.3rem 0.6rem', fontSize: '12px' }} onClick={e => handleMultiAddField(e, item.field)}>Adicionar {item.field}</Button>
                                                </Row>
                                            </>
                                    )
                                })}
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
