import NavBar from '../components/NavBar'
import { useState } from 'react'
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap'
import axios from 'axios'

var env = require('../config/env')

function Insert(){
  const [processo, setProcesso] = useState("")
  const [relator, setRelator] = useState("")
  const [descritores, setDescritores] = useState([])
  const [data, setData] = useState("")
  const [votacao, setVotacao] = useState("")
  const [sumario, setSumario] = useState("")
  const [texto_integral, setTextoIntegral] = useState("")
  const [tribunal, setTribunal] = useState("")
  const [decisao, setDecisao] = useState("")
  const [meio_processual, setMeioProcessual] = useState("")
  const [legislacao_nacional, setLegislacaoNacional] = useState("")
  const [legislacao_comunitaria, setLegislacaoComunitaria] = useState("")
  const [legislacao_estrangeira, setLegislacaoEstrangeira] = useState("")
  const [area_tematica, setAreaTematica] = useState("")
  const [area_tematica2, setAreaTematica2] = useState("")
  const [referencias, setReferencias] = useState("")
  const [jurisp_nacional, setJurispNacional] = useState("")
  const [jurisp_internacional, setJurispInternacional] = useState("")
  const [tribunal_recorrido, setTribunalRecorrido] = useState("")
  const [proc_tribunal_recorrido, setProcTribunalRecorrido] = useState("")
  const [ref_processo, setRefProcesso] = useState("")
  const [indicacoes_eventuais, setIndicacoesEventuais] = useState("")
  const [n_convencional, setNConvencional] = useState("")
  const [n_doc, setNDoc] = useState("")

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
        // o q fazer??????
      })
      .catch(error => {
        setProcesso("")
        setRelator("")
        setDescritores([])
        setData("")
        setVotacao("")
        setSumario("")
        setTextoIntegral("")
        setTribunal("")
        setDecisao("")
        setMeioProcessual("")
        setLegislacaoNacional("")
        setLegislacaoComunitaria("")
        setLegislacaoEstrangeira("")
        setAreaTematica("")
        setAreaTematica2("")
        setReferencias("")
        setJurispNacional("")
        setJurispInternacional("")
        setTribunalRecorrido("")
        setProcTribunalRecorrido("")
        setRefProcesso("")
        setIndicacoesEventuais("")
        setNConvencional("")
        setNDoc("")
      })
  }

  return (
    <>
      <NavBar/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel className="mt-5 mb-3 form-outline" label="Processo">
            <Form.Control type="text" placeholder="Processo" value={processo} onChange={(e) => setProcesso(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form-outline" label="Relator">
            <Form.Control type="text" placeholder="Relator" value={relator} onChange={(e) => setRelator(e.target.value)} />
          </FloatingLabel>

          { /* meter isto em lista (varias labels) */ }
          <FloatingLabel className="mb-3 form-outline" label="Descritores">
            <Form.Control type="text" placeholder="Descritores" value={descritores} onChange={(e) => setDescritores(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form-outline" label="Data do Acórdão">
            <Form.Control type="date" placeholder="Data do Acórdão" value={data} onChange={(e) => setData(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form-outline" label="Votação">
            <Form.Control type="text" placeholder="Votação" value={votacao} onChange={(e) => setVotacao(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form-outline" label="Sumário">
            <textarea class="form-control" style={{height: '200px'}} placeholder="Sumário" value={sumario} onChange={(e) => setSumario(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form-outline" label="Decisão Texto Integral">
            <textarea class="form-control" style={{height:'200px'}} placeholder="Decisão Texto Integral" value={texto_integral} onChange={(e) => setTextoIntegral(e.target.value)} />
          </FloatingLabel>
          
          { /* maybe lista com os tribunais */ }
          <FloatingLabel className="mb-3 form-outline" label="Tribunal">
            <Form.Control type="text" placeholder="Tribunal" value={tribunal} onChange={(e) => setTribunal(e.target.value)} />
          </FloatingLabel>

          { /* radio buttons ou lista tmbm */ }
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
            <textarea class="form-control" style={{height: '200px'}} placeholder="Indicações Eventuais" value={indicacoes_eventuais} onChange={(e) => setIndicacoesEventuais(e.target.value)} />
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
      </Container>
    </>
  )
}

export default Insert