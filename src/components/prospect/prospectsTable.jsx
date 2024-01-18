import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {InputText} from "primereact/inputText";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "primereact/button";
import axiosClient from "../../services/axios-client.js";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function ProspectsTable({prospects, loading, setLoading, deleteProspect}) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();
    const {showToast} = useStateContext();
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        mailbox: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        project: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    });


    const onRowSelect = (event) => {
        navigate(`/prospects/${event.data.id}`);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const header = () => {
        return (
            <div className="flex justify-content-between">
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
            </div>
        );
    };

    const deleteProspectButton = (rowData) => {
        return (
            <Button icon="pi pi-trash" rounded text severity="secondary" onClick={() => deleteProspect(rowData.id)} />
        );
    };

    return (
        <div>

            <DataTable value={prospects}
                       filters={filters}
                       loading={loading}
                       style={{width: '100%'}}
                       scrollable
                       dataKey="id"
                       paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No prispects found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="first_name" header="First Name" sortable></Column>
                <Column field="last_name" header="Last Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="prospect_status_in_campaign" header="Status" sortable></Column>
                <Column field="step" header="Step" sortable></Column>
                <Column body={deleteProspectButton} header="Action" sortable></Column>
            </DataTable>
        </div>
    );
}
