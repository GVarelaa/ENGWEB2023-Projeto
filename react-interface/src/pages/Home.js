import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import Accordions from '../components/Accordions'
import Search from '../components/Search';
import axios from 'axios'
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Home() {
    const [data, setData] = useState([])
    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1)
    const [pagesNumber, setPagesNumber] = useState(0)

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


    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container className='mt-4'>
                <Search setData={setData}/>
                <Accordions data={data} setData={setData} favorites={favorites} setFavorites={setFavorites} token={decodedToken} />
                <Container className='d-flex justify-content-center mb-4'>
                    <Pagination page={page} onChange={handleChangePage} count={pagesNumber} shape="rounded" />
                </Container>
            </Container>
        </>
    )
}


export default Home;