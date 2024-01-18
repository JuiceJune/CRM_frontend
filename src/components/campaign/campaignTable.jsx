import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiSelect";
import {InputText} from "primereact/inputText";
import {useNavigate} from "react-router-dom";


export default function CampaignTable(props) {
    const {campaigns, loading, toast} = props

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        mailbox: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        project: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    });

    const columns = [
        { field: "name", header: 'Name'},
        { field: 'mailbox', header: 'Mailbox'},
        { field: 'project', header: 'Project'}
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const onRowSelect = (event) => {
        navigate(`/campaigns/${event.data.id}`);
    };

    const onCellCopy = (value) => {
        navigator.clipboard.writeText(value)
        toast.current.show({ severity: 'success', summary: 'Value copied', detail: value , life: 3000 });
    };

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    //Templates
    const campaignNameTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const mailboxTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.mailbox.email}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.email)} />
            </div>
        );
    };

    const projectTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.project}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.project)} />
            </div>
        );
    };
    //Templates

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </div>
                <div>

                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={campaigns}
                       filters={filters}
                       loading={loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator rows={10} owsperpageoptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No customers found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="name" header="Name" body={campaignNameTemplate} sortable></Column>
                <Column field="mailbox" header="Mailbox" body={mailboxTemplate} sortable></Column>
                <Column field="project" header="Project" body={projectTemplate} sortable></Column>
            </DataTable>
        </div>
    );
}
