import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiSelect";
import {InputText} from "primereact/inputText";
import {useNavigate} from "react-router-dom";

export default function UserProjectsTable(props) {
    const {projects, loading, toast} = props
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    console.log(projects)

    const onRowSelect = (event) => {
        navigate(`/projects/${event.data.id}`);
    };

    const onCellCopy = (value) => {
        navigator.clipboard.writeText(value)
        toast.current.show({ severity: 'success', summary: 'Value copied', detail: value , life: 3000 });
    };

    //Templates
    const nameLogoTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="Avatar" src={`../${rowData.logo}`} width="32" />
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const projectPriceTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>${rowData.price} / {rowData.period}</span>
            </div>
        )
    };
    //Templates

    return (
        <div className='card h-full'>
            <DataTable value={projects}
                       loading={loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator rows={10} owsperpageoptions={[5, 10, 25, 50]}
                       emptyMessage="No projects found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="name" header="Name" body={nameLogoTemplate} sortable></Column>
                <Column field="start_date" header="Start" sortable></Column>
                <Column body={projectPriceTemplate} field="price" header="Prie" sortable/>
            </DataTable>
        </div>
    );
}
