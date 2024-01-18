import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "/primereact/multiSelect";
import {InputText} from "/primereact/inputText";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";


export default function MailboxTable(props) {
    const {mailboxes, loading} = props
    const { showToast } = useStateContext();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        email: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        phone: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        domain: {value: null, matchMode: FilterMatchMode.IN},
        password: {value: null, matchMode: FilterMatchMode.EQUALS},
        app_password: {value: null, matchMode: FilterMatchMode.EQUALS},
        email_provider: {value: null, matchMode: FilterMatchMode.EQUALS},
        created_at: {value: null, matchMode: FilterMatchMode.EQUALS},
    });

    const columns = [
        { field: "password", header: 'Password'},
        { field: 'app_password', header: 'App Password'},
        { field: 'phone', header: 'Phone'},
        { field: 'domain', header: 'Domain'},
        { field: 'created_at', header: 'Created At'}
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const onRowSelect = (event) => {
        navigate(`/mailboxes/${event.data.id}`);
    };

    const onCellCopy = (value) => {
        navigator.clipboard.writeText(value)
        showToast('success', 'Value copied', value);
    };

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));
        setVisibleColumns(orderedSelectedColumns);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({ ...filters, global: { value, matchMode: FilterMatchMode.CONTAINS } });
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

    const passwordTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <i className="pi pi-key" style={{ color: 'grey', fontSize: '1rem' }}></i>
                <span>{rowData.password}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.password)} />
            </div>
        );
    };

    const appPasswordTemplate = (rowData) => {
        return rowData.app_password ? (
            <div className="flex align-items-center gap-2">
                <i className="pi pi-key" style={{ color: 'grey', fontSize: '1rem' }}></i>
                <span>{rowData.app_password}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.app_password)} />
            </div>
        ) : (
            <div className="flex align-items-center gap-2"></div>
        )
    };

    const phoneTemplate = (rowData) => {
        return rowData.phone ? (
            <div className="flex align-items-center gap-2">
                <i className="pi pi-phone" style={{ color: 'grey', fontSize: '1rem' }}></i>
                <span>{rowData.phone}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.phone)} />
            </div>
        ) : (
            <div className="flex align-items-center gap-2"></div>
        )
    };

    const domainTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.domain}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.domain)} />
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
        <div className='card'>
            <DataTable value={mailboxes}
                       filters={filters}
                       loading={loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator rows={10}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No customers found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="name" header="Name" body={nameAvatarTemplate} sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                {visibleColumns.map((col, index) => {
                    if (col.field === "password")
                        return <Column key={index} body={passwordTemplate} field={col.field} header={col.header} sortable/>
                    if (col.field === "app_password")
                        return <Column key={index} body={appPasswordTemplate} field={col.field} header={col.header} sortable/>
                    if (col.field === "phone")
                        return <Column key={index} body={phoneTemplate} field={col.field} header={col.header} sortable/>
                    if (col.field === "domain")
                        return <Column key={index} body={domainTemplate} field={col.field} header={col.header} sortable/>
                    return <Column key={index} field={col.field} header={col.header} sortable/>
                })}
            </DataTable>
        </div>
    );
}
