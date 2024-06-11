import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateProject} from "../../store/slices/projectsSlice.js";

const ProjectEditForm = ({project}) => {
    const [name, setName] = useState(project.name);
    const dispatch = useDispatch();

    const handleSave = () => {
        const updatedProject = {
            client_id: 1,
            id: project.id,
            name: name
        };
        dispatch(updateProject(updatedProject));
    };

    const handleCancel = () => {
        setName(project.name);
    };

    return (
        <div className="card flex flex-column gap-5 justify-content-center w-5 m-auto pt-4">
            <div className="flex flex-column gap-2">
                <label htmlFor="name">Project name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className={'flex gap-2 justify-content-between'}>
                <Button label="Save" severity="success" outlined className={'w-5'} onClick={handleSave}/>
                <Button label="Cancel" severity="secondary" outlined className={'w-5'} onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default ProjectEditForm;