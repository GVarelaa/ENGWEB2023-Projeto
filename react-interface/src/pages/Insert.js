import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import { Container, Form, FloatingLabel, Col, Row, Card, Button } from "react-bootstrap"
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"

var env = require("../config/env")

function Insert() {
    const [selected, setSelected] = useState([]);

    const [listaTribunais, setListaTribunais] = useState([])
    const [listaDescritores, setListaDescritores] = useState([])
    const [listaAreaTematica1, setListaAreaTematica1] = useState([])
    const [listaAreaTematica2, setListaAreaTematica2] = useState([])

    const [processo, setProcesso] = useState("")
    const [data, setData] = useState("")
    const [tribunal, setTribunal] = useState("")
    const [relator, setRelator] = useState("")
    const [votacao, setVotacao] = useState("")
    const [decisao, setDecisao] = useState("")
    const [meioProcessual, setMeioProcessual] = useState("")
    const [textoIntegral, setTextoIntegral] = useState("")
    const [sumario, setSumario] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            axios.get(env.apiTribunaisAccessPoint + `?token=${localStorage.token}`)
                .then((response) => {

                    setListaTribunais(response.data)

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



                    axios.get(env.apiTribunaisAccessPoint + "/" + response.data[0]._id + "/areatematica1" + `?token=${localStorage.token}`)
                        .then((response) => {
                            setListaAreaTematica1(
                                response.data.areaTematica1.map((area) => ({
                                    label: area,
                                    value: area,
                                }))
                            )
                        })
                        .catch((error) => {
                            toast.error("Não foi possível obter a lista de áreas temáticas!", {
                                position: toast.POSITION.TOP_CENTER
                            })
                        })

                    axios.get(env.apiTribunaisAccessPoint + "/" + response.data[0]._id + "/areatematica2" + `?token=${localStorage.token}`)
                        .then((response) => {
                            setListaAreaTematica2(
                                response.data.areaTematica2.map((area) => ({
                                    label: area,
                                    value: area,
                                }))
                            )
                        })
                        .catch((error) => {
                            toast.error("Não foi possível obter a lista de áreas temáticas!", {
                                position: toast.POSITION.TOP_CENTER
                            })
                        })
                })
                .catch((error) => {
                    toast.error("Não foi possível obter a lista de tribunais!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
        }

        fetchData()
    }, [])


    const handleTribunal = (e) => {
        setTribunal(e.target.value)

        axios.get(env.apiTribunaisAccessPoint + "/" + e.target.value + "/descritores" + `?token=${localStorage.token}`)
            .then((response) => {
                setListaDescritores(response.data.descritores.map((descritor) => ({ label: descritor, value: descritor })))
            })
            .catch((error) => {
                toast.error("Não foi possível obter a lista de descritores!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })

        axios.get(env.apiTribunaisAccessPoint + "/" + e.target.value + "/areatematica1" + `?token=${localStorage.token}`)
            .then((response) => {
                setListaAreaTematica1(response.data.areaTematica1.map((area) => ({ label: area, value: area })))
            })
            .catch((error) => {
                toast.error("Não foi possível obter a lista de descritores!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })

        axios.get(env.apiTribunaisAccessPoint + "/" + e.target.value + "/areatematica2" + `?token=${localStorage.token}`)
            .then((response) => {
                setListaAreaTematica2(response.data.areaTematica2.map((area) => ({ label: area, value: area })))
            })
            .catch((error) => {
                toast.error("Não foi possível obter a lista de descritores!", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        // SIMPLIFICAR ISTO
        axios.post(env.apiAcordaosAccessPoint + `?token=${localStorage.token}`, {
            Processo: processo,
            "Data do Acordão": data,
            Tribunal: tribunal,
            Relator: relator,
            //"Área Temática 1": area_tematica,
            //"Área Temática 2": area_tematica2,
            Descritores: listaDescritores,
            Votação: votacao,
            Sumário: sumario
        })
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


    const handleSelectChange = (field) => {

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
                            <Container className="my-4 mb-5">
                                <h4>Informação Principal</h4>

                                <Row className="gx-3 mb-3">
                                    <Col md={6}>
                                        <FloatingLabel className="mb-3 form-outline" label="Processo">
                                            <Form.Control type="text" placeholder="Processo" value={processo} onChange={(e) => setProcesso(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel className="mb-3 form-outline" label="Data do Acórdão">
                                            <Form.Control type="date" placeholder="Data do Acórdão" value={data} onChange={(e) => setData(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Tribunal:</Form.Label>
                                            <Col>
                                                <Form.Select onChange={(e) => handleTribunal(e)}>
                                                    {listaTribunais.map(tribunal => (
                                                        <option key={tribunal._id} value={tribunal._id}>{tribunal.nome}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel className="mb-3 mt-3 form-outline" label="Relator">
                                            <Form.Control type="text" placeholder="Relator" value={relator} onChange={(e) => setRelator(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>


                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Descritores:</Form.Label>
                                    <MultiSelect options={listaDescritores}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Selecionar" />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Votação:</Form.Label>
                                    <Form.Control type="text" placeholder="Votação" value={votacao} onChange={(e) => setVotacao(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Decisão</Form.Label>
                                    <Form.Control type="text" placeholder="Decisão" value={decisao} onChange={(e) => setDecisao(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label style={{ marginLeft: '10px' }}>Meio Processual:</Form.Label>
                                    <Form.Control type="text" placeholder="Meio Processual" value={meioProcessual} onChange={(e) => setMeioProcessual(e.target.value)} />
                                </Form.Group>


                                <Form.Group className="my-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Sumário:</Form.Label>
                                    <textarea class="form-control" style={{ height: '200px' }} placeholder="Sumário" value={sumario} onChange={(e) => setSumario(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="my-3">
                                    <Form.Label style={{ marginLeft: '10px' }}>Decisão Texto Integral:</Form.Label>
                                    <textarea class="form-control" style={{ height: '200px' }} placeholder="Decisão Texto Integral" value={textoIntegral} onChange={(e) => setTextoIntegral(e.target.value)} />
                                </Form.Group>

                            </Container>

                            <Container className="my-4 mb-5">
                                <h4>Outras Informações</h4>

                                <Form.Group>
                                    <Form.Label style={{ marginLeft: '10px' }}>Adicionar campo</Form.Label>
                                    <Form.Select defaultValue="" onChange={(e) => handleSelectChange(e.target.value)}>
                                        <option disabled hidden value="">Campo</option>
                                    </Form.Select>
                                </Form.Group>


                                {/*filters.map(item => {
                                    return (
                                        <Row>
                                            <Col md={10}>
                                                <FloatingLabel className="form-outline" label={item} style={{ transform: 'scale(0.90)' }}>
                                                    <Form.Control className="my-3" type="search" placeholder={item} onChange={(e) => handleFilterChange(e.target.value, item)} />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={1} className="d-flex justify-content-start">
                                                <Link><Trash3 style={{ marginTop: '2em', marginLeft: '-1em' }} size={20} color="black" onClick={e => handleRemoveFilter(e, item)} /></Link>
                                            </Col>
                                        </Row>
                                    )
                                })*/}


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
