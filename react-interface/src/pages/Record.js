import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from '../components/NavBar';
import NoPage from "../pages/NoPage";
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from "axios"
import env from "../config/env"

function Record(){
    var params = useParams();
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(env.apiAccessPoint + `/${params.id}`)
                if(response.data) setRecords([response.data])
                else setRecords("NoPage")
            }
            catch (error){
                console.log(error)
            }
        }

        fetchData();
    }, []);

    console.log(records)

    return (
        <>
            <NavBar/>
            <Container className="my-4">
                <ListGroup>
                    {records && (records === "NoPage" ? <NoPage/> : Object.keys(records[0]).map((key) => {return (<ListGroupItem><b>{key}:</b>{records[0][key]}</ListGroupItem>)}))}
                </ListGroup>
            </Container>
        </>
    );
}

export default Record;