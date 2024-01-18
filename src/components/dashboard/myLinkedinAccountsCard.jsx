import React, {useEffect, useState, useRef} from 'react';
import 'primeicons/primeicons.css';
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import {Toast} from "primereact/toast";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const MyLinkedinAccountsCard = (props) => {
    const [linkedinAccounts, setLinkedinAccounts] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getLinkedinAccounts();
    }, [])

    const getLinkedinAccounts = () => {
        axiosClient.get('/linkedin-accounts')
            .then(response => {
                console.log(response)
                setLinkedinAccounts(response.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onCellCopy = (value) => {
        navigator.clipboard.writeText(value)
        toast.current.show({ severity: 'success', summary: 'Value copied', detail: value , life: 3000 });
    };

    const nameLogoTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="Avatar" src={`${rowData.avatar}`} width="32" />
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const onRowSelect = (event) => {
        navigate(`/linkedinAccounts/${event.data.id}`);
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="mb-3 text-center">
                <h2>My Linkedin Accounts</h2>
            </div>
            <DataTable value={linkedinAccounts}
                       loading={loading}
                       scrollHeight="200px"
                       style={{ width: '100%' }}
                       dataKey="id"
                       emptyMessage="No customers found."
                       selectionMode="single"
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="name" header="Name" body={nameLogoTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default MyLinkedinAccountsCard;
