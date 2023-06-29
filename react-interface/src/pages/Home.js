import { useState, useEffect } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { Container, Card, Row, Col } from "react-bootstrap"
import { Pagination } from "@mui/material"
import { ToastContainer, toast } from "react-toastify"
import NavBar from "../components/NavBar"
import Accordions from "../components/Accordions"
import Search from "../components/Search"
import axios from "axios"
import env from "../config/env"
import jwt_decode from "jwt-decode"

function Home() {
    const [data, setData] = useState([])
    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1)
    const [pagesNumber, setPagesNumber] = useState(0)
    const [search, setSearch] = useState("?")
    const [onSearch, setOnSearch] = useState(false)
    const [searchParams] = useSearchParams()
    const limit = 25

    useEffect(() => {
        const fetchData = async () => {
            try {
                var lastID = -1

                if (searchParams.get('start')){
                    setPage(Math.ceil(searchParams.get('start') / limit) + 1)
                    lastID = searchParams.get('start')
                }
                    

                const response = await axios.get(`${env.apiAcordaosAccessPoint}?lastID=${lastID}&limit=${limit}&token=${localStorage.token}`)
                setData(response.data)
            } catch (error) {
                toast.error("Não foi possível obter a lista de acórdãos!", { position: toast.POSITION.TOP_CENTER })
            }
        }

        const fetchPagesNumber = async () => {
            try {
                const response = await axios.get(env.apiAcordaosAccessPoint + `/number?token=${localStorage.token}`)
                setPagesNumber(Math.ceil(response.data / limit))
            } catch (error) { }
        }

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`${env.authAccessPoint}/${decodedToken.username}/favorites?token=${localStorage.token}`)
                setFavorites(response.data.favorites);
            } catch (error) {
                toast.error("Não foi possível obter a lista de favoritos!", { position: toast.POSITION.TOP_CENTER })
            }
        }

        fetchData()
        fetchPagesNumber()
        fetchFavorites()
    }, [])

    try {
        var decodedToken = jwt_decode(localStorage.getItem("token"))
    } catch {
        return <Navigate to="/login" />
    }

    const handleChangePage = async (event, page) => {
        setPage(page);

        try {
            if (!onSearch) {
                const lastID = ((page - 1) * limit) - 1;
                const response = await axios.get(env.apiAcordaosAccessPoint + `?lastID=${lastID}&limit=${limit}&token=${localStorage.token}`);
                setData(response.data);
            }
            else {
                const skip = (page - 1) * limit;
                const response = await axios.get(env.apiAcordaosAccessPoint + `${search}&skip=${skip}&limit=${limit}&token=${localStorage.token}`)
                setData(response.data)
            }
            window.scrollTo(0, 0)
        } catch (error) {
            toast.error("Não foi possível obter a lista de acórdãos!", { position: toast.POSITION.TOP_CENTER })
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        setPage(0)
        setOnSearch(true)
        try {
            const response1 = await axios.get(
                env.apiAcordaosAccessPoint + `/number${search}&token=${localStorage.token}`
            )
            setPagesNumber(Math.ceil(response1.data / limit));

            const response2 = await axios.get(
                env.apiAcordaosAccessPoint + `${search}&skip=0&limit=${limit}&token=${localStorage.token}`
            )
            setData(response2.data);
        } catch (error) {
            toast.error("Não foi possível obter a lista de acórdãos!", { position: toast.POSITION.TOP_CENTER })
        }
    }


    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <Row>
                    <Col md={3}>
                        <Card className='d-flex justify-content-center mb-xl-0' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                            <Card.Body className="text-center">
                                <Search setSearch={setSearch} handleSearch={handleSearch} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Card className='d-flex justify-content-center' style={{ 'box-shadow': '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }} >
                            <Card.Body>
                                <Container className='mt-4'>
                                    <Accordions data={data} setData={setData} favorites={favorites} setFavorites={setFavorites} token={decodedToken} page={page} />
                                    <Container className='d-flex justify-content-center mb-4'>
                                        <Pagination className="mt-3" page={page} onChange={handleChangePage} count={pagesNumber} shape="rounded" />
                                    </Container>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
