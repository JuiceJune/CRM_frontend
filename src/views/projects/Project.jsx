import React, {useEffect, useState} from 'react';
import axiosClient from "../../services/axios-client.js";
import {useParams} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import 'primeicons/primeicons.css';
import {useNavigate} from "react-router-dom";
import ProjectHeaderCards from "../../components/project/projectHeaderCards.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import ProjectHeader from "../../components/project/projectHeader.jsx";


const Project = () => {
    const {showToast} = useStateContext();
    const {id} = useParams()
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getProject();
    }, [])


    const getProject = () => {
        axiosClient.get(`/projects/${id}`)
            .then(response => {
                setProject(response.data)
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <div>
            {loading ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div>
                    <ProjectHeader project={project} navigate={navigate} setLoading={setLoading} id={id}/>
                    <ProjectHeaderCards project={project}/>
                </div>
            )}
        </div>
    );
};

export default Project;
