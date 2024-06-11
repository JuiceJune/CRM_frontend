import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProject} from "../../store/slices/projectsSlice.js";
import {useParams} from "react-router-dom";
import TabNavbar from "../../components/navbars/TabNavbar.jsx";
import ProjectMailboxes from "../../components/project/ProjectMailboxes.jsx";
import ProjectEditForm from "../../components/project/ProjectEditForm.jsx";

const ProjectSettings = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProject(id));
    }, [dispatch, id]);

    const projects = useSelector(state => state.projects);

    if (projects.loading || !projects.project) { // Додали перевірку на projects.project
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='my-4'>{projects.project.name}</h2>
            <TabNavbar content={[
                {
                    name: "Project profile",
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

export default ProjectSettings;