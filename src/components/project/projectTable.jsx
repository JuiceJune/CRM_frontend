import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiSelect";
import {InputText} from "primereact/inputText";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function ProjectTable(props) {
    const {projects, loading} = props
    const { showToast } = useStateContext();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        client: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        csm: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        sdrs: {value: null, matchMode: FilterMatchMode.IN},
        research_manager: {value: null, matchMode: FilterMatchMode.EQUALS},
        it_specialist: {value: null, matchMode: FilterMatchMode.EQUALS},
        mailboxes: {value: null, matchMode: FilterMatchMode.EQUALS},
        start_date: {value: null, matchMode: FilterMatchMode.EQUALS},
        price: {value: null, matchMode: FilterMatchMode.EQUALS},
    });

    const columns = [
        { field: "csm", header: 'CSM'},
        { field: 'sdrs', header: 'SDRs'},
        { field: 'research_manager', header: 'Research Manager'},
        { field: 'it_specialist', header: 'IT Specialist'},
        { field: 'mailboxes', header: 'Mailboxes'},
        { field: 'start_date', header: 'Created At'},
        { field: 'price', header: 'Price'}
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const onRowSelect = (event) => {
        navigate(`/projects/${event.data.id}`);
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
    const nameLogoTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="Avatar" src={`${rowData.logo}`} width="32" />
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const csmTemplate = (rowData) => {
        if(rowData.csm) {
            return (
                <div className="flex align-items-center gap-2">
                    <img alt="Avatar" src={`${rowData.csm.avatar}`} width="32" />
                    <span>{rowData.csm.name}</span>
                    <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.csm.name)} />
                </div>
            );
        }
    };

    const clientTemplate = (rowData) => {
        if(rowData.client) {
            return (
                <div className="flex align-items-center gap-2">
                    <img alt="Logo" src={`${rowData.client.avatar}`} width="32" />
                    <span>{rowData.client.name}</span>
                    <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.client.name)} />
                </div>
            );
        }
    };

    const researchManagerTemplate = (rowData) => {
        if(rowData.research_manager) {
            return (
                <div className="flex align-items-center gap-2">
                    <img alt="Avatar" src={`${rowData.research_manager.avatar}`} width="32" />
                    <span>{rowData.research_manager.name}</span>
                    <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.research_manager.name)} />
                </div>
            );
        }
    };

    const itSpecialistTemplate = (rowData) => {
        if(rowData.it_specialist) {
            return (
                <div className="flex align-items-center gap-2">
                    <img alt="Avatar" src={`${rowData.it_specialist.avatar}`} width="32" />
                    <span>{rowData.it_specialist.name}</span>
                    <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.it_specialist.name)} />
                </div>
            );
        }
    };

    const sdrsTemplate = (rowData) => {
        return (
            <div>
                {rowData.sdrs.map((sdr, index) => {
                    return (
                        <div key={index} className="flex align-items-center gap-2">
                            <img alt="Avatar" src={`${sdr.avatar}`} width="32" />
                            <span>{sdr.name}</span>
                            <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(sdr.name)} />
                        </div>
                    )
                })}
            </div>
        );
    };

    const mailboxesTemplate = (rowData) => {
        return (
            <div>
                {rowData.mailboxes.map((mailbox, index) => {
                    return (
                        <div key={index} className="flex align-items-center gap-2">
                            <img alt="Avatar" src={`${mailbox.avatar}`} width="32" />
                            <span>{mailbox.email}</span>
                            <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(mailbox.email)} />
                        </div>
                    )
                })}
            </div>
        );
    };

    const projectPriceTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>${rowData.price}</span>
            </div>
        )
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
            <DataTable value={projects}
                       filters={filters}
                       loading={loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator
                       rows={10}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No customers found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="name" header="Name" body={nameLogoTemplate} sortable></Column>
                <Column field="client" header="Client" body={clientTemplate} sortable></Column>
                {visibleColumns.map((col, index) => {
                    if( col.field === "csm" )
                        return <Column key={index} body={csmTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "sdrs" )
                        return <Column key={index} body={sdrsTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "research_manager" )
                        return <Column key={index} body={researchManagerTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "it_specialist" )
                        return <Column key={index} body={itSpecialistTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "mailboxes" )
                        return <Column key={index} body={mailboxesTemplate} field={col.field} header={col.header} sortable/>
                    if( col.field === "price" )
                        return <Column key={index} body={projectPriceTemplate} field={col.field} header={col.header} sortable/>
                    return <Column key={index} field={col.field} header={col.header} sortable/>
                })}
            </DataTable>
        </div>
    );
}
