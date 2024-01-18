import React, {useEffect, useState} from 'react';
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import 'primeicons/primeicons.css';
import ProjectTable from "../../components/project/projectTable.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)
    const {showToast} = useStateContext();

    useEffect(() => {
        setLoading(true)
        getProjects();
    }, [])

    const getProjects = () => {
        axiosClient.get('/projects')
            .then(response => {
                setProjects(response.data)
                setLoading(false)
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
                <BounceLoader color={"#5B08A7"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />
            ) : (
                <div>
                    <div className="card mb-3 flex justify-content-between align-items-center">
                        <h1>Projects</h1>
                    </div>
                    <ProjectTable projects={projects} loading={loading}/>
                </div>
            )}
        </div>
    );
};

export default Projects;
