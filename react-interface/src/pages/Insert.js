import NavBar from '../components/NavBar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Form, FloatingLabel, Col, Row, Card } from 'react-bootstrap'
import { Trash3, PlusSquare } from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

var env = require('../config/env')

function Insert() {
    const [names, setNames] = useState([]);

    const [processo, setProcesso] = useState("")
    const [data, setData] = useState("")
    const [tribunal, setTribunal] = useState("")
    const [relator, setRelator] = useState("")
    const [descritores, setDescritores] = useState([])
    const [requerente, setRequerente] = useState("")
    const [requerido, setRequerido] = useState([])
    const [seccao, setSeccao] = useState("")
    const [votacao, setVotacao] = useState("")
    const [decisao, setDecisao] = useState("")
    const [meio_processual, setMeioProcessual] = useState("")
    const [area_tematica, setAreaTematica] = useState([])
    const [area_tematica2, setAreaTematica2] = useState([])
    const [n_convencional, setNConvencional] = useState("")
    const [n_doc, setNDoc] = useState("")
    const [privacidade, setPrivacidade] = useState("")
    const [sumario, setSumario] = useState("")
    const [texto_integral, setTextoIntegral] = useState("")
    const [data_entrada, setDataEntrada] = useState("")

    const [legislacao_nacional, setLegislacaoNacional] = useState("")
    const [legislacao_comunitaria, setLegislacaoComunitaria] = useState("")
    const [legislacao_estrangeira, setLegislacaoEstrangeira] = useState("")
    const [referencias, setReferencias] = useState("")
    const [jurisp_nacional, setJurispNacional] = useState("")
    const [jurisp_internacional, setJurispInternacional] = useState("")
    const [jurisp_estrangeira, setJurispEstrangeira] = useState("")
    const [jurisp_constitucional, setJurispConstitucional] = useState("")
    const [jursip_outra, setJurispOutra] = useState("")  //Outra Jurisprudência
    const [objeto, setObjeto] = useState("")
    const [doutrina, setDoutrina] = useState("")
    const [referencias_a_pareceres, setReferenciasAPareceres] = useState("")
    const [apendice, setApendice] = useState("")
    const [dataApendice, setDataApendice] = useState("")
    const [indicacoes_eventuais, setIndicacoesEventuais] = useState("")
    const [reclamacoes, setReclamacoes] = useState("")
    const [apenso, setApenso] = useState("")
    const [dataDecisao, setDataDecisao] = useState("")
    const [tribunal2, setTribunal2] = useState("")

    const [recurso, setRecurso] = useState("")
    const [tribunal_recorrido, setTribunalRecorrido] = useState("")
    const [proc_tribunal_recorrido, setProcTribunalRecorrido] = useState("")
    const [ref_processo, setRefProcesso] = useState("")

    const [info_auxiliar, setInfoAuxiliar] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(env.apiAccessPoint, {
            Processo: processo,
            Relator: relator,
            Descritores: descritores,
            "Data do Acordão": data,
            "Votação": votacao,
            "Sumário": sumario,
            "Decisão Texto Integral": texto_integral,
            Tribunal: tribunal,
            "Decisão": decisao,
            "Meio Processual": meio_processual,
            "Legislação Nacional": legislacao_nacional,
            "Legislação Comunitária": legislacao_comunitaria,
            "Legislação Estrangeira": legislacao_estrangeira,
            "Área Temática 1": area_tematica,
            "Área Temática 2": area_tematica2,
            "Referências Internacionais": referencias,
            "Jurisprudência Nacional": jurisp_nacional,
            "Jurisprudência Internacional": jurisp_internacional,
            "Tribunal Recorrido": tribunal_recorrido,
            "Processo no Tribunal Recorrido": proc_tribunal_recorrido,
            "Referência Processo": ref_processo,
            "Indicações Eventuais": indicacoes_eventuais,
            "Nº Convencional": n_convencional,
            "Nº do Documento": n_doc
        })
            .then(response => {
                toast.success('O acórdão foi adicionado com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            .catch(error => {
                toast.error('Não foi possível adicionar o acórdão!', {
                    position: toast.POSITION.TOP_CENTER
                })
            })
    }


    const handleNameChange = (e, index) => {
        const updatedNames = [...names];
        updatedNames[index] = e.target.value;
        setNames(updatedNames);
    }


    const handleAddName = () => {
        const updatedNames = [...names];
        updatedNames.push('');
        setNames(updatedNames);
    }


    const handleRemoveName = (index) => {
        const updatedNames = [...names];
        updatedNames.splice(index, 1);
        setNames(updatedNames);
    }


    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <Card className='d-flex justify-content-center' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                    <Card.Title className="mx-4 mt-4"> Informação Primária </Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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
                                    { /* MUDAR PARA LER DA BASE DE DADOS */}
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ marginLeft: '10px' }}>Tribunal:</Form.Label>
                                        <Col>
                                            <Form.Select>
                                                <option value="atco1">Tribunal Constitucional</option>
                                                <option value="jcon">Tribunal dos Conflitos</option>
                                                <option value="jdgpj">Direção Geral da Política de Justiça</option>
                                                <option value="jsta">Supremo Tribunal Administrativo</option>
                                                <option value="jstj">Supremo Tribunal de Justiça</option>
                                                <option value="jtca">Tribunal Central Administrativo Sul</option>
                                                <option value="jtcampca">Tribunal Central Administrativo Sul Contencioso Administrativo</option>
                                                <option value="jtcampt">Tribunal Central Administrativo Sul Contencioso Tributário</option>
                                                <option value="jtcn">Tribunal Central Administrativo Norte</option>
                                                <option value="jtrc">Tribunal da Relação de Coimbra</option>
                                                <option value="jtre">Tribunal da Relação de Évora</option>
                                                <option value="jtrg">Tribunal da Relação de Guimarães</option>
                                                <option value="jtrl">Tribunal da Relação de Lisboa</option>
                                                <option value="jtrp">Tribunal da Relação de Porto</option>
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

                            { /* meter isto em lista (varias labels) */}
                            <FloatingLabel className="mb-3 form-outline" label="Descritores">
                                <Form.Control type="text" placeholder="Descritores" value={descritores} onChange={(e) => setDescritores(e.target.value)} />
                            </FloatingLabel>

                            <Row>
                                <Col md={6} className="mt-2">
                                    <Form.Label style={{ marginLeft: '10px' }}>Requeridos:</Form.Label>
                                    {names.map((name, index) => (
                                        <div key={index}>
                                            <Col className="mb-2 t d-flex align-items-center">
                                                <Form.Control type="text" placeholder="Inserir Requerido" value={name} onChange={(e) => handleNameChange(e, index)} />
                                                <Link><Trash3 size={20} color='black' className='mx-3' onClick={() => handleRemoveName(index)} /></Link>
                                            </Col>
                                        </div>
                                    ))}
                                    <Link><PlusSquare size={20} color='black' className="mx-3" onClick={handleAddName} /></Link>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel className="mb-3 mt-4 form-outline" label="Requerente">
                                        <Form.Control type="text" placeholder="Requerente" value={requerente} onChange={(e) => setRequerente(e.target.value)} />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <FloatingLabel className="mb-3 mt-3 form-outline" label="Votação">
                                <Form.Control type="text" placeholder="Votação" value={votacao} onChange={(e) => setVotacao(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Sumário">
                                <textarea class="form-control" style={{ height: '200px' }} placeholder="Sumário" value={sumario} onChange={(e) => setSumario(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Decisão Texto Integral">
                                <textarea class="form-control" style={{ height: '200px' }} placeholder="Decisão Texto Integral" value={texto_integral} onChange={(e) => setTextoIntegral(e.target.value)} />
                            </FloatingLabel>

                            { /* radio buttons ou lista tmbm */}
                            <FloatingLabel className="mb-3 form-outline" label="Decisão">
                                <Form.Control type="text" placeholder="Decisão" value={decisao} onChange={(e) => setDecisao(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Meio Processual">
                                <Form.Control type="text" placeholder="Meio Processual" value={meio_processual} onChange={(e) => setMeioProcessual(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Legislação Nacional">
                                <Form.Control type="text" placeholder="Legislação Nacional" value={legislacao_nacional} onChange={(e) => setLegislacaoNacional(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Legislação Comunitária">
                                <Form.Control type="text" placeholder="Legislação Comunitária" value={legislacao_comunitaria} onChange={(e) => setLegislacaoComunitaria(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Legislação Estrangeira">
                                <Form.Control type="text" placeholder="Legislação Estrangeira" value={legislacao_estrangeira} onChange={(e) => setLegislacaoEstrangeira(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Área Temática 1">
                                <Form.Control type="text" placeholder="Área Temática 1" value={area_tematica} onChange={(e) => setAreaTematica(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Área Temática 2">
                                <Form.Control type="text" placeholder="Área Temática 2" value={area_tematica2} onChange={(e) => setAreaTematica2(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Referências">
                                <Form.Control type="text" placeholder="Referências Internacionais" value={referencias} onChange={(e) => setReferencias(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Jurisprudência Nacional">
                                <Form.Control type="text" placeholder="Jurisprudência Nacional" value={jurisp_nacional} onChange={(e) => setJurispNacional(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Jurisprudência Internacional">
                                <Form.Control type="text" placeholder="Jurisprudência Internacional" value={jurisp_internacional} onChange={(e) => setJurispInternacional(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Tribunal Recorrido">
                                <Form.Control type="text" placeholder="Tribunal Recorrido" value={tribunal_recorrido} onChange={(e) => setTribunalRecorrido(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Processo no Tribunal Recorrido">
                                <Form.Control type="text" placeholder="Processo no Tribunal Recorrido" value={proc_tribunal_recorrido} onChange={(e) => setProcTribunalRecorrido(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Referência Processo">
                                <Form.Control type="text" placeholder="Referência Processo" value={ref_processo} onChange={(e) => setRefProcesso(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Indicações Eventuais">
                                <textarea class="form-control" style={{ height: '200px' }} placeholder="Indicações Eventuais" value={indicacoes_eventuais} onChange={(e) => setIndicacoesEventuais(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Nº Convencional">
                                <Form.Control type="text" placeholder="Nº Convencional" value={n_convencional} onChange={(e) => setNConvencional(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 form-outline" label="Nº do Documento">
                                <Form.Control type="text" placeholder="Nº do Documento" value={n_doc} onChange={(e) => setNDoc(e.target.value)} />
                            </FloatingLabel>

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