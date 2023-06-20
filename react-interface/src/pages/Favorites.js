import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import { Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar';
import Accordions from '../components/Accordions'
import axios from 'axios';
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Favorites() {
    const [data, setData] = useState([])
    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1);
    const [pagesNumber, setPagesNumber] = useState(0)
    var decodedToken

    useEffect(() => {
        const fetchData = async () => {
            var favorites = []

            try {
                const response = await axios.get(env.authAccessPoint + `/${decodedToken.username}` + "/favorites");
                favorites = response.data.favorites
            } catch (error) {
                toast.error('Não foi possível obter a lista de favoritos!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }

            if (favorites.length > 0) {
                var queryString = "?"
                for (var i = 0; i < favorites.length; i++) {
                    queryString += "_id=" + favorites[i] + "&"
                }

                try {
                    const response = await axios.get(env.apiAcordaosAccessPoint + queryString);
                    setPagesNumber(Math.ceil(response.data.length / 25))
                    setData(response.data)
                    setFavorites(favorites)
                } catch (error) {
                    toast.error('Não foi possível obter a lista de favoritos!', {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            }
        }

        fetchData()
    }, [])


    try {
        decodedToken = jwt_decode(localStorage.getItem('token'))
    }
    catch {
        return (<Navigate to="/login" />)
    }

    const handleChangePage = async (event, page) => {
        setPage(page)
        window.scrollTo(0, 0);
    }


    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container className='mt-4'>
                <Accordions data={data} setData={setData} favorites={favorites} setFavorites={setFavorites} token={decodedToken} />
                <Container className='d-flex justify-content-center mb-4'>
                    <Pagination page={page} onChange={handleChangePage} count={pagesNumber} shape="rounded" />
                </Container>
            </Container>
        </>
    );
}

export default Favorites;