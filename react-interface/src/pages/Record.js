import { useParams, useSearchParams, Link, Navigate } from "react-router-dom"
import { useState, useEffect, React } from "react"
import Button from "@mui/material/Button"
import { Container, ListGroup, ListGroupItem, Card, Modal } from "react-bootstrap"
import { Button as BootstrapButton } from "react-bootstrap"
import { Pencil, Trash3, Heart, HeartFill, ArrowLeftShort } from "react-bootstrap-icons"
import { ToastContainer, toast } from "react-toastify"
import NavBar from "../components/NavBar"
import NoPage from "../pages/NoPage"
import axios from "axios"
import env from "../config/env"
import jwt_decode from "jwt-decode"

function Record() {
    var params = useParams()
    const [searchParams] = useSearchParams()
    const [record, setRecord] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [deleteItemID, setDeleteItemID] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${env.apiAcordaosAccessPoint}/${params.id}?token=${localStorage.token}`)
                if (response.data) setRecord([response.data])
                else setRecord("NoPage")
            } catch (error) {
                console.log(error)
            }
        }

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`${env.authAccessPoint}/${decodedToken.username}/favorites?token=${localStorage.token}`)
                setFavorites(response.data.favorites)
            } catch (error) {
                toast.error("Não foi possível obter a lista de favoritos!", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }

        fetchData()
        fetchFavorites()
    })

    try {
        var decodedToken = jwt_decode(localStorage.getItem("token"))
    } catch {
        return <Navigate to="/login" />
    }

    const handleFavorite = async (event, id) => {
        try {
            if (favorites.includes(id)) {
                await axios.delete(`${env.authAccessPoint}/${decodedToken.username}/favorites/${id}?token=${localStorage.token}`)

                setFavorites((current) => {
                    return current.filter((item) => item !== id)
                })

                toast.success("O acórdão foi removido da lista de favoritos com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else {
                await axios.post(`${env.authAccessPoint}/${decodedToken.username}/favorites?token=${localStorage.token}`, { favorite: id });

                setFavorites((current) => [...current, id])

                toast.success("O acórdão foi adicionado à lista de favoritos com sucesso!", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        } catch (error) {
            toast.error("Não foi possível adicionar o acórdão à lista de favoritos!", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const handleShowModal = (event, id) => {
        setDeleteItemID(id)
        setShowModal(true)
    }

    const handleHideModal = () => {
        setShowModal(false)
        setDeleteItemID(null)
    }

    const handleDelete = async (event, id) => {
        try {
            await axios.delete(env.apiAcordaosAccessPoint + `/${id}`)

            toast.success('O acórdão foi removido com sucesso!', {
                position: toast.POSITION.TOP_CENTER
            })

            return <Navigate to="/" />
        } catch (error) {
            toast.error('Não foi possível remover o acórdão!', {
                position: toast.POSITION.TOP_CENTER
            })
        }

        handleHideModal()
    }

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <div className="d-flex justify-content-start mb-4">
                    <Link to={searchParams.get('returnStart') ? `/?start=${searchParams.get('returnStart') - 1}` : "/"} style={{ "text-decoration": "none", color: "inherit" }}>
                        <Button variant="outline-dark" startIcon={<ArrowLeftShort />}>Voltar atrás</Button>
                    </Link>
                </div>
                <Card className='d-flex justify-content-center' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                    <Card.Body>
                        <div className="d-flex justify-content-end mb-4">
                            {favorites.includes(params.id) ? (
                                <Button variant="outline-dark" startIcon={<HeartFill />} onClick={(event) => handleFavorite(event, params.id)}>Adicionar aos Favoritos</Button>
                            ) : (
                                <Button variant="outline-dark" startIcon={<Heart />} onClick={(event) => handleFavorite(event, params.id)}>Adicionar aos Favoritos</Button>
                            )}
                            <Link to={"/edit/" + params.id} style={{ 'text-decoration': 'none', 'color': 'inherit' }}>
                                <Button variant="outline-dark" startIcon={<Pencil />}>Editar Acórdão</Button>
                            </Link>
                            {decodedToken.level === 100 && (
                                <>
                                    <Button variant="outline-dark" startIcon={<Trash3 />} onClick={(event) => handleShowModal(event, params.id)}>Remover Acórdão</Button>
                                    <Modal show={showModal} onHide={handleHideModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirmação de Remoção</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="alert alert-danger">Tem a certeza que pretende remover este acórdão?</div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <BootstrapButton variant="default" onClick={handleHideModal}>Cancelar</BootstrapButton>
                                            <BootstrapButton variant="danger" onClick={(event) => handleDelete(event, deleteItemID)}>Remover</BootstrapButton>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )}
                        </div>
                        { /* INFORMAÇÃO PRINCIPAL */ }
                        <Container className="my-4 mb-5">
                            <h4>Informação Principal</h4>
                            <ListGroup>
                                {record && (record === "NoPage"? (
                                    <NoPage />
                                ) : [
                                    record[0].Processo && (
                                        <ListGroupItem><b>Processo: </b>{record[0].Processo}</ListGroupItem>
                                    ),
                                    record[0].tribunal && (
                                        <ListGroupItem><b>Tribunal: </b>{record[0].tribunal}</ListGroupItem>
                                    ),
                                    record[0].Relator && (
                                        <ListGroupItem><b>Relator: </b>{record[0].Relator}</ListGroupItem>
                                    ),
                                    record[0]["Data do Acordão"] && (
                                        <ListGroupItem><b>Data: </b>{record[0]["Data do Acordão"]}</ListGroupItem>
                                    ),
                                    record[0]["Área Temática 1"].length !== 0 && (
                                        <ListGroupItem key="area-tematica-1">
                                            <b>Área Temática 1: </b>
                                            <ListGroup className="list-group-flush">
                                                {record[0]["Área Temática 1"].map((obj) => (
                                                    <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </ListGroupItem>
                                    ),
                                    record[0]["Área Temática 2"].length !== 0 && (
                                        <ListGroupItem>
                                            <b>Área Temática 2: </b>
                                            <ListGroup className="list-group-flush">
                                                {record[0]["Área Temática 2"].map((obj) => (
                                                    <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </ListGroupItem>
                                    ),
                                    record[0].Descritores.length !== 0 && (
                                        <ListGroupItem>
                                            <b>Descritores: </b>
                                            <ListGroup className="list-group-flush">
                                                {record[0].Descritores.map((obj) => (
                                                    <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </ListGroupItem>
                                    ),
                                    record[0]["Sumário"] && (
                                        <ListGroupItem><b>Sumário: </b>{record[0]["Sumário"]}</ListGroupItem>
                                    )
                                ])}
                            </ListGroup>
                        </Container>
                        { /* OUTRAS INFORMAÇÕES */ }
                        <Container className="my-4">
                            <h4>Outras Informações</h4>
                            <ListGroup>
                                {record && record !== "NoPage" && Object.keys(record[0]).map((key) => {
                                    if (typeof record[0][key] === "object") {
                                        if (key === "Jurisprudências" || key === "Legislações") {
                                            return Object.keys(record[0][key]).map((subKey) => {
                                                if (subKey !== "_id" && record[0][key][subKey].length > 0) {
                                                    return (
                                                        <ListGroupItem key={`${key}-${subKey}`}>
                                                            <b>{subKey}: </b>
                                                            <ListGroup className="list-group-flush">
                                                                {record[0][key][subKey].map((obj) => (
                                                                    <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                                ))}
                                                            </ListGroup>
                                                        </ListGroupItem>
                                                    )
                                                }
                                                return null
                                            })
                                        } else if (key === "Informação Auxiliar") {
                                            return (
                                                <Container className="my-4">
                                                    <h4 style={{ 'margin-top' : '1.5rem' }}>Informação Auxiliar</h4>
                                                    {Object.keys(record[0][key]).map((subKey) => {
                                                        if (typeof subKey === Object && record[0][key][subKey].length > 0) {
                                                            return (
                                                                <ListGroupItem key={`${key}-${subKey}`}>
                                                                    <b>{subKey}: </b>
                                                                    <ListGroup className="list-group-flush">
                                                                        {record[0][key][subKey].map((obj) => (
                                                                            <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                                        ))}
                                                                    </ListGroup>
                                                                </ListGroupItem>
                                                            )
                                                        } else {
                                                            return (
                                                                <ListGroupItem subKey={subKey}>
                                                                    <b>{subKey}: </b>
                                                                    {record[0][key][subKey]}
                                                                </ListGroupItem>
                                                            )
                                                        }
                                                    })}
                                                </Container>
                                            )
                                        } else if (record[0][key].length !== 0) {
                                            return (
                                                <ListGroupItem key={key}>
                                                    <b>{key}: </b>
                                                    <ListGroup className="list-group-flush">
                                                        {record[0][key].map((obj) => (
                                                            <ListGroupItem key={obj}>{obj}</ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </ListGroupItem>
                                            )
                                        }
                                    } else if (record[0][key] && key !== "_id") {
                                        return (
                                            <ListGroupItem key={key}>
                                                <b>{key}: </b>
                                                {record[0][key]}
                                            </ListGroupItem>
                                        )
                                    }
                                    return null
                                }).filter((item) => {
                                    const keysDisplayed = [
                                        "Processo",
                                        "tribunal",
                                        "Relator",
                                        "Data do Acordão",
                                        "Área Temática 1",
                                        "Área Temática 2",
                                        "Descritores",
                                        "Sumário"
                                    ]
                                    return !keysDisplayed.includes(item?.key)
                                })}
                            </ListGroup>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Record
