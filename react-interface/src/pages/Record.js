import { useParams, Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import { Container, ListGroup, ListGroupItem, Card, Modal} from 'react-bootstrap'
import { Button as BootstrapButton } from 'react-bootstrap'
import { Eye, Pencil, Trash3, Heart, HeartFill } from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import NoPage from "../pages/NoPage"
import axios from "axios"
import env from "../config/env"
import jwt_decode from 'jwt-decode'

function Record() {
    var params = useParams();
    const [records, setRecords] = useState(null);
    const [favorites, setFavorites] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [deleteItemID, setDeleteItemID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(env.apiAcordaosAccessPoint + `/${params.id}`)
                if (response.data) setRecords([response.data])
                else setRecords("NoPage")
            }
            catch (error) {
                console.log(error)
            }
        }

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(env.authAccessPoint + `/${decodedToken.username}` + '/favorites')
                setFavorites(response.data.favorites)
            } catch (error) {
                toast.error('Não foi possível obter a lista de favoritos!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }

        fetchData()
        fetchFavorites()
    }, []);

    try {
        var decodedToken = jwt_decode(localStorage.getItem('token'))
    }
    catch {
        return (<Navigate to="/login" />)
    }

    const handleFavorite = async (event, id) => {
        try {
            if (favorites.includes(id)) {
                await axios.delete(env.authAccessPoint + `/${decodedToken.username}/favorites/${id}`)

                setFavorites(current => {
                    return current.filter((item) => item !== id)
                })

                toast.success('O acórdão foi removido da lista de favoritos com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else {
                await axios.post(env.authAccessPoint + `/${decodedToken.username}/favorites`, { favorite: id })

                setFavorites(current => [...current, id])

                toast.success('O acórdão foi adicionado à lista de favoritos com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        } catch (error) {

            toast.error('Não foi possível adicionar o acórdão à lista de favoritos!', {
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

            return <Navigate to="/"/>
        } catch (error) {
            toast.error('Não foi possível remover o acórdão!', {
                position: toast.POSITION.TOP_CENTER
            })
        }

        handleHideModal();
    }

    return (
        <>
            <ToastContainer/>
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
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
                            {decodedToken.level === 'admin' && (
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
                        <Container className="my-4">
                            <ListGroup>
                                {records && (records === "NoPage" ? <NoPage /> : Object.keys(records[0]).map((key) => { return (<ListGroupItem><b>{key}: </b>{records[0][key]}</ListGroupItem>) }))}
                            </ListGroup>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Record;