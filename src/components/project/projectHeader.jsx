import React from 'react';
import { Button } from 'primereact/button';
import axiosClient from "../../services/axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";

const ProjectHeader = (props) => {
    const {project, navigate, setLoading, id} = props;
    const { showToast } = useStateContext();

    const deleteProject = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.delete(`/projects/${id}`);
            showToast('success', 'Project deleted successfully', response.data);
            navigate("/projects");
        } catch (error) {
            handleAxiosError(error, showToast);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round mb-3">
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <Button icon="pi pi-arrow-left" onClick={() => navigate(-1)} className="mr-2" rounded outlined aria-label="Filter" />
                    <h1>{project.name}</h1>
                </div>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-pencil" onClick={() => { }} className="mr-2" severity="info" rounded outlined />
                    <Button icon="pi pi-trash" onClick={deleteProject} className="mr-2 red" severity="danger" rounded outlined />
                </div>
            </div>
        </div>
    );
}

export default ProjectHeader;
