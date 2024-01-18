import React, {useState, useEffect, useRef} from 'react';
import {Toast} from 'primereact/toast';
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import UserTable from "../../components/user/userTable.jsx";

export default function RowExpansionDemo() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);

    useEffect(() => {
        setLoading(true)
        getEmployees()
    }, []);

    const getEmployees = () => {
        axiosClient.get('/users')
            .then(response => {
                setUsers(response.data)
                setLoading(false)
            })
            .catch((e) => {
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
                    <Toast ref={toast} />
                    <div className="card mb-3 flex justify-content-between align-items-center">
                        <h1>Users</h1>
                    </div>
                    <UserTable users={users} loading={loading} toast={toast}/>
                </div>
            )}
        </div>
    );
}
