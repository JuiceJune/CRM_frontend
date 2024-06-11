import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject, fetchProjects } from '../../store/slices/projectsSlice.js';

const AddProject = (props) => {
    // eslint-disable-next-line react/prop-types
    const { visible, setVisible } = props;
    const dispatch = useDispatch();
    const [project, setProject] = useState({
        name: '',
        client_id: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (field, value) => {
        setProject((prevProject) => ({
            ...prevProject,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(createProject(project)).unwrap();
            await dispatch(fetchProjects());
            setProject({ name: '', client_id: 1 }); // Clear the form input
            setVisible(false);
        } catch (err) {
            setError('Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Add new project</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button
                label="Add project"
                icon="pi pi-check"
                onClick={handleSubmit}
                loading={loading}
                autoFocus
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setVisible(false)}
                className="p-button-text"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: '30rem' }}
                onHide={() => setVisible(false)}
            >
                <div className="card flex flex-column justify-content-center gap-4">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Project name</label>
                        <InputText
                            id="name"
                            value={project.name}
                            onChange={(event) => handleInputChange('name', event.target.value)}
                            placeholder="Enter project name"
                        />
                        {error && <small className="p-error">{error}</small>}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AddProject;
