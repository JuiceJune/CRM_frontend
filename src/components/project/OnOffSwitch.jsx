import {useState} from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { confirmDialog } from 'primereact/confirmdialog';
import {useDispatch} from "react-redux";
import {fetchProjects, updateProject} from "../../store/slices/projectsSlice.js";

// eslint-disable-next-line react/prop-types
const OnOffSwitch = ({ rowData }) => {
    const [check, setCheck] = useState(rowData.status === 'active');
    const dispatch = useDispatch();

    const accept = () => {
        if(rowData.status === 'active') {
            dispatch(updateProject({
                id: rowData.id,
                status: 'inactive',
                client_id: 1,
                name: rowData.name
            }))
        } else {
            dispatch(updateProject({
                id: rowData.id,
                status: 'active',
                client_id: 1,
                name: rowData.name
            }))
        }
        setCheck(!check);
        dispatch(fetchProjects());
    };

    const handleSwitchClick = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
        });
    };

    return (
        <div className="flex align-items-center gap-2">
            <InputSwitch checked={check} onClick={handleSwitchClick} />
        </div>
    );
};

export default OnOffSwitch;
