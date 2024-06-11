import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProject, fetchProject} from "../../store/slices/projectsSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import CampaignTable from "../../components/tables/CampaignTable.jsx";
import { Button } from 'primereact/button';
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import TabNavbar from "../../components/navbars/TabNavbar.jsx";
import ProjectEditForm from "../../components/project/ProjectEditForm.jsx";
import ProjectMailboxes from "../../components/project/ProjectMailboxes.jsx";

const Project = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProject(id));
    }, [dispatch, id]);

    const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete this project?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
        });
    };

    const accept = () => {
        dispatch(deleteProject(id));
        navigate(-1);
    }

    const projects = useSelector(state => state.projects);

    if (projects.loading || !projects.project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={'flex align-items-center justify-content-between px-4'}>
                <h2 className='my-4'>{projects.project.name}</h2>
                <Button label="Delete" severity="danger" outlined onClick={confirmDelete}/>
            </div>
            <ConfirmDialog />
            <TabNavbar content={[
                {
                    name: "Campaigns",
                    component: <CampaignTable campaigns={projects.project.campaigns}/>
                },
                {
                    name: "Settings",
                    component: <ProjectEditForm project={projects.project}/>
                },
                {
                    name: "Accounts",
                    component: <ProjectMailboxes mailboxes={projects.project.mailboxes}/>
                },
            ]}/>
        </div>
    );
};

export default Project;