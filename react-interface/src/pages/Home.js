import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Container, Accordion, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap'
import { Eye, Pencil, Trash3, Heart, HeartFill } from 'react-bootstrap-icons'
import { Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import axios from 'axios'
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Home() {
    const [data, setData] = useState([])
    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1)
    const [pagesNumber, setPagesNumber] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [deleteItemID, setDeleteItemID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(env.apiAcordaosAccessPoint + '?skip=0&limit=25')
                setData(response.data)
            } catch (error) {
                toast.error('Não foi possível obter a lista de acórdãos!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        };

        const fetchPagesNumber = async () => {
            try {
                const response = await axios.get(env.apiAcordaosAccessPoint + '/number')
                setPagesNumber(Math.ceil(response.data / 25))
            } catch (error) {
                toast.error('Não foi possível obter a lista de acórdãos!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(env.authAccessPoint + `/${decodedToken.username}` + '/favorites')
                setFavorites(response.data.favorites)
            } catch (error) {
                toast.error('Não foi possível obter a lista de favoritos!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        };

        fetchData()
        fetchPagesNumber()
        fetchFavorites()
    }, []);


    try {
        var decodedToken = jwt_decode(localStorage.getItem('token'))
    }
    catch {
        return (<Navigate to="/login" />)
    }


    const handleChangePage = async (event, page) => {
        setPage(page)
        const skip = (page - 1) * 100

        try {
            const response = await axios.get(env.apiAcordaosAccessPoint + `?skip=${skip}&limit=25`)
            setData(response.data)
            window.scrollTo(0, 0);
        } catch (error) {
            toast.error('Não foi possível obter a lista de acórdãos!', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }


    const handleFavorite = async (event, id) => {
        try {
            if(favorites.includes(id)){
                await axios.delete(env.authAccessPoint + `/${decodedToken.username}/favorites/${id}`,)
                setFavorites(current => {
                    return current.filter((item) => item !== id)
                })
                toast.success('O acórdão foi removido da lista de favoritos com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else{
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

            setData(current => {
                return current.filter((item) => item._id !== id)
            })

            toast.success('O acórdão foi removido com sucesso!', {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            toast.error('Não foi possível remover o acórdão!', {
                position: toast.POSITION.TOP_CENTER
            })
        }

        handleHideModal();
    }

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container className='mt-4'>
                <Accordion className='mb-4'>
                    {data.map((obj, index) => {
                        return (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <Container><b>Processo: </b>{obj.Processo}</Container>
                                    <Container className='d-flex justify-content-end px-3'>
                                        <Link to={obj._id}> <Eye size={20} color='black' className='mx-3' /> </Link>
                                        {favorites.includes(obj._id)
                                            ? <Link> <HeartFill size={20} color='black' className='mx-3' onClick={(event) => handleFavorite(event, obj._id)} /> </Link>
                                            : <Link> <Heart size={20} color='black' className='mx-3' onClick={(event) => handleFavorite(event, obj._id)} /> </Link>
                                        }
                                        <Link to={"/edit/" + obj._id}> <Pencil size={20} color='black' className='mx-3' /> </Link>
                                        {decodedToken.level === 'admin' &&
                                            <>
                                                <Link><Trash3 size={20} color='black' className='mx-3' onClick={(event) => handleShowModal(event, obj._id)} /></Link>
                                                <Modal show={showModal} onHide={handleHideModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmação de Remoção</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="alert alert-danger">Tem a certeza que pretende remover este acórdão?</div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="default" onClick={handleHideModal}>Cancelar</Button>
                                                        <Button variant="danger" onClick={(event) => handleDelete(event, deleteItemID)}>Remover</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </>
                                        }
                                    </Container>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroupItem><b>Data: </b>{obj.Data}</ListGroupItem>
                                        <ListGroupItem><b>Relator: </b>{obj.Relator}</ListGroupItem>
                                        <ListGroupItem><b>Descritores: </b>
                                            <ListGroup className='list-group-flush'>
                                                {obj.Descritores.map((content) => { return (<ListGroupItem>{content}</ListGroupItem>) })}
                                            </ListGroup>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>

                <Container className='d-flex justify-content-center mb-4'>
                    <Pagination page={page} onChange={handleChangePage} count={pagesNumber} shape="rounded" />
                </Container>
            </Container>
        </>
    );
}


export default Home;