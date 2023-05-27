import React, {useEffect, useState, useRef} from 'react';
import axiosClient from "../../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {Button} from "primereact/button";
import {BounceLoader} from "react-spinners";
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";
import ProjectHeaderCards from "../../components/project/projectHeaderCards.jsx";


const Project = () => {
    const {id} = useParams()
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showProject, setShowProject] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getProject();
    }, [])


    const getProject = () => {
        axiosClient.get(`/projects/${id}`)
            .then(response => {
                console.log(response)
                setProject(response.data.data)
                setLoading(false)
                setShowProject(true)
            })
            .catch((e) => {
                setLoading(false)
                if(e.response.status === 403 || e.response.status === 404) {
                    // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Not Found', life: 3000 });
                    navigate('/not-found');
                }
            })
    }

    if (loading) {
        return <BounceLoader color="#5B08A7" loading={loading} size={100} aria-label="Loading Spinner"
                             data-testid="loader"/>;
    }

    return (
        <div>
            {showProject && (
                <div>
                    <Toast ref={toast} />
                    <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
                        <div className="flex justify-content-between align-items-center ">
                            <div className="flex align-items-center">
                                <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded outlined aria-label="Filter" />
                                <h1>{project.name}</h1>
                            </div>
                        </div>
                    </div>
                    <ProjectHeaderCards project={project}/>
                </div>
            )}
        </div>
    );
};

export default Project;
