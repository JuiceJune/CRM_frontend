import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/MultiSelect";
import {InputText} from "primereact/inputText";
import {useNavigate} from "react-router-dom";
import {Avatar} from "primereact/avatar";


export default function UserTable(props) {
    const {users, loading, toast} = props
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        email: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        position: {value: null, matchMode: FilterMatchMode.EQUALS},
        created_at: {value: null, matchMode: FilterMatchMode.EQUALS},
    });
    const columns = [
        {field: 'email', header: 'Email'},
        {field: 'created_at', header: 'Created At'}
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

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

    const expandAll = () => {
        let _expandedRows = {};

        users.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const allowExpansion = (rowData) => {
        return rowData.projects.length > 0;
    };

    const onRowSelect = (event) => {
        navigate(`/users/${event.data.id}`);
    };

    //Templates
    const projectNameTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Avatar image={'../' + rowData.logo} size="large" shape="circle" />
                <span>{rowData.name}</span>
            </div>
        )
    };

    const employeeNameTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Avatar image={'../' + rowData.avatar} shape="circle" />
                <span>{rowData.name}</span>
            </div>
        )
    };

    const projectPriceTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>${rowData.price} / {rowData.period}</span>
            </div>
        )
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <DataTable value={data.projects}>
                    <Column field="name" body={projectNameTemplate} header="Project" sortable></Column>
                    <Column field="start_date" header="Start" sortable></Column>
                    <Column field="period" body={projectPriceTemplate} header="Price" sortable></Column>
                </DataTable>
            </div>
        );
    };
    //Templates

    const header = (
        <div className="flex flex-wrap justify-content-between gap-2">
            <div className="flex gap-3">
                <div>
                    <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle}
                                 className="w-full sm:w-20rem" display="chip"/>
                </div>
                <div>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </div>
            </div>
            <div className="flex">
                <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text/>
                <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text/>
            </div>
        </div>
    );

    return (
        <div className="card">
            <DataTable value={users}
                       filters={filters}
                       loading={loading}
                       style={{ width: '100%' }}
                       scrollable
                       paginator rows={10} owsperpageoptions={[5, 10, 25, 50]}
                       expandedRows={expandedRows}
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}
                       emptyMessage="No customers found."
                       onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}
                       dataKey="id"
                       header={header}>
                <Column expander={allowExpansion}/>
                <Column field="name" body={employeeNameTemplate} header="Name" sortable/>
                <Column field="position" header="Position" sortable/>
                {visibleColumns.map((col, index) => {
                    return <Column key={index} field={col.field} header={col.header} sortable/>
                })}
            </DataTable>
        </div>
    );
}
