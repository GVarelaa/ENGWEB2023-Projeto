import NavBar from "../components/NavBar"
import NoPage from "../pages/NoPage"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container, Form, FloatingLabel, Col, Row, Card } from "react-bootstrap"
import Button from '@mui/material/Button'
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify"
import { Check, Trash3 } from 'react-bootstrap-icons'
import axios from "axios"

var env = require("../config/env")

function Edit() {
    var params = useParams()
    const [record, setRecord] = useState(null)
    const [campos, setCampos] = useState([])
    const [tribunais, setTribunais] = useState([])
    const [descritores, setDescritores] = useState([])
    const [form, setForm] = useState({})

    const [selectedDescritores, setSelectedDescritores] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            axios.get(env.apiTribunaisAccessPoint + `?token=${localStorage.token}`)
                .then(response => {
                    response.data.forEach(obj => { delete obj.descritores })
                    setTribunais(response.data)
                })
                .catch(error => {
                    toast.error("Não foi possível obter a lista de tribunais!", { position: toast.POSITION.TOP_CENTER })
                })

            axios.get(`${env.apiAcordaosAccessPoint}/${params.id}?token=${localStorage.token}`)
                .then(response => {
                    if (!response.data.error){
                        setRecord(response.data)
                        setSelectedDescritores(response.data.Descritores)

                        axios.get(`${env.apiTribunaisAccessPoint}/${response.data.tribunal}?token=${localStorage.token}`)
                            .then(response => {
                                response.data.descritores.sort()
                                setDescritores(response.data.descritores.map((descritor) => ({ label: descritor, value: descritor })))
                            })
                            .catch(error => {
                                toast.error("Não foi possível obter a lista de descritores!", { position: toast.POSITION.TOP_CENTER })
                            })
                    }

                    else setRecord("NoPage")

                    axios.get(env.apiFieldsAccessPoint + `?token=${localStorage.token}`)
                        .then(response => {
                            response.data.sort((a, b) => {
                                let f1 = a.field.toLowerCase(),
                                    f2 = b.field.toLowerCase()

                                if (f1 < f2) return -1
                                if (f1 > f2) return 1
                                return 0
                            })
                            setCampos(response.data)
                        })
                        .catch(error => {
                            toast.error("Não foi possível obter a lista de campos adicionais!", { position: toast.POSITION.TOP_CENTER })
                        })
                })
                .catch(error => {
                    toast.error("Não foi possível obter a informação do acórdão!", { position: toast.POSITION.TOP_CENTER })
                })
        }

        fetchData()
    }, [])


    function convertToISO8601(date) {
        var parts = date.split("/");
        var day = parts[0], month = parts[1], year = parts[2]
      
        if (day.length === 1) { day = "0" + day }
        if (month.length === 1) { month = "0" + month }

        return year + "-" + month + "-" + day
      }


    const handleTribunal = (e) => {
        form["tribunal"] = e.target.value

        axios.get(env.apiTribunaisAccessPoint + "/" + e.target.value + `?token=${localStorage.token}`)
            .then(response => {
                response.data.descritores.sort()
                setDescritores(response.data.descritores.map((descritor) => ({ label: descritor, value: descritor })))
            })
            .catch(error => {
                toast.error("Não foi possível obter a lista de descritores!", { position: toast.POSITION.TOP_CENTER })
            })
    }


    const handleChange = (e, field) => {
        form[field] = e.target.value
    }

    const handleSelectedDescritoresChange = (selectedOptions) => {
        setSelectedDescritores(selectedOptions.map(option => option.value))
      }


    const handleSubmit = (event) => {
        event.preventDefault()

        axios.put(env.apiAcordaosAccessPoint + `/${params.id}?token=${localStorage.token}`, form)
            .then(response => {
                toast.success("O acórdão foi atualizado com sucesso!", { position: toast.POSITION.TOP_CENTER })
            })
            .catch(error => {
                toast.error("Não foi possível atualizar o acórdão!", { position: toast.POSITION.TOP_CENTER })
            })
    }


    return (
        <>
         {record && (record === "NoPage"? (<NoPage />) : 
         (
            <div>
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
                                            <Form.Control required type="text" placeholder="Processo" value={record.Processo} onChange={(e) => handleChange(e, "Processo")} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Data do Acordão:</Form.Label>
                                            <Form.Control required type="date" placeholder="Data do Acórdão" value={convertToISO8601(record["Data do Acordão"])} onChange={(e) => form["Data do Acordão"] = e.target.value} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ marginLeft: '10px' }}>Tribunal:</Form.Label>
                                            <Form.Select value={record.tribunal} onChange={(e) => handleTribunal(e)}>
                                                {tribunais.map(tribunal => (
                                                    <option key={tribunal._id} value={tribunal._id}>{tribunal.nome}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label style={{ marginLeft: '10px' }}>Relator:</Form.Label>
                                            <Form.Control required type="text" placeholder="Relator" value={record.Relator} onChange={(e) => form["Relator"] = e.target.value} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Descritores:</Form.Label>
                                        <MultiSelect options={descritores} value={selectedDescritores.map(value => ({ label: value, value: value}))} onChange={handleSelectedDescritoresChange} labelledBy="Selecionar" />
                                    </Form.Group>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Votação:</Form.Label>
                                        <Form.Control required type="text" placeholder="Votação" value={record["Votação"]} onChange={(e) => form["Votação"] = e.target.value} />
                                    </Form.Group>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Decisão:</Form.Label>
                                        <Form.Control required type="text" placeholder="Decisão" value={record["Decisão"]} onChange={(e) => form["Decisão"] = e.target.value} />
                                    </Form.Group>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group>
                                        <Form.Label style={{ marginLeft: '10px' }}>Meio Processual:</Form.Label>
                                        <Form.Control required type="text" placeholder="Meio Processual" value={record["Meio Processual"]} onChange={(e) => form["Meio Processual"] = e.target.value} />
                                    </Form.Group>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group className="my-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Sumário:</Form.Label>
                                        <textarea required class="form-control" style={{ height: '200px' }} placeholder="Sumário" value={record["Sumário"]} onChange={(e) => form["Sumário"] = e.target.value} />
                                    </Form.Group>
                                </Row>

                                <Row className="gx-3 mb-3">
                                    <Form.Group className="my-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Decisão Texto Integral:</Form.Label>
                                        <textarea required class="form-control" style={{ height: '200px' }} placeholder="Decisão Texto Integral" value={record["Decisão Texto Integral"]} onChange={(e) => form["Decisão Texto Integral"] = e.target.value} />
                                    </Form.Group>
                                </Row>
                            </Container>
                            <div className="mb-3 d-flex justify-content-end padding-bottom">
                                <Button type="submit" className="mx-2" variant="outline-dark" startIcon={<Check />}>Salvar Alterações</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            </div>
        ))}
        </>
    )
}

export default Edit
