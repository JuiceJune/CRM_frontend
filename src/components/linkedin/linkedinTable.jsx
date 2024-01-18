import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiSelect";
import {InputText} from "primereact/inputText";
import {useNavigate} from "react-router-dom";


export default function LinkedinTable(props) {
    const {linkedinAccounts, loading, toast} = props

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        email: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        link: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        password: {value: null, matchMode: FilterMatchMode.EQUALS},
        create_date: {value: null, matchMode: FilterMatchMode.EQUALS},
    });

    const columns = [
        { field: "password", header: 'Password'},
        { field: 'link', header: 'Link'},
        { field: 'create_date', header: 'Created At'}
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const onRowSelect = (event) => {
        navigate(`/linkedin-accounts/${event.data.id}`);
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
    const nameAvatarTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="Avatar" src={`${rowData.avatar}`} width="32" />
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const providerEmailTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.email}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.email)} />
            </div>
        );
    };

    const passwordTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <i className="pi pi-key" style={{ color: 'grey', fontSize: '1rem' }}></i>
                <span>{rowData.password}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.password)} />
            </div>
        );
    };

    const linkTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.link}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.link)} />
            </div>
        );
    };
    //Templates

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle}
                                 className="w-full sm:w-20rem" display="chip"/>
                </div>
                <div>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={linkedinAccounts}
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
                <Column field="name" header="Name" body={nameAvatarTemplate} sortable></Column>
                <Column field="email" header="Email" body={providerEmailTemplate} sortable></Column>
                {visibleColumns.map((col, index) => {
                    if( col.field === "password" )
                        return <Column key={index} body={passwordTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "link" )
                        return <Column key={index} body={linkTemplate} field={col.field} header={col.header} sortable/>
                    return <Column key={index} field={col.field} header={col.header} sortable/>
                })}
            </DataTable>
        </div>
    );
}
