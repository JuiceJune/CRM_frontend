import {useEffect, useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/slices/userSlice.js";
import AddUser from "../user/AddUser.jsx";

export default function UserTable() {
    const dispatch = useDispatch();
    const [addUserWindow, setAddUserWindow] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const users = useSelector(state => state.user);

    const roleTemplate = (data) => {
            return (
                <div>{data.role.title}</div>
            )
    }

    const positionTemplate = (data) => {
        return (
            <div>{data.position.title}</div>
        )
    }

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    <h2>Users</h2>
                </div>
                <div className="flex">
                    <Button label="Add user"
                            icon="pi pi-plus"
                            severity="success"
                            rounded
                            onClick={() => setAddUserWindow(true)}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <AddUser visible={addUserWindow} setVisible={setAddUserWindow}/>
            <DataTable value={users.users}
                       loading={users.loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator
                       rows={10}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No projects found."
                       selectionMode="single"
            >
                <Column field="name" header="Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field={roleTemplate} header="Role" sortable></Column>
                <Column field={positionTemplate} header="Position" sortable></Column>
            </DataTable>
        </div>
    );
}
