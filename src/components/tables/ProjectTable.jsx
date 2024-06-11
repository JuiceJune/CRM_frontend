import {useEffect, useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import {useDispatch, useSelector} from "react-redux";
import {FilterMatchMode} from "primereact/api";
import AddProject from "../project/AddProject.jsx";
import {ConfirmDialog} from "primereact/confirmdialog";
import OnOffSwitch from "../project/OnOffSwitch.jsx";
import {fetchProjects} from "../../store/slices/projectsSlice.js";

export default function ProjectTable() {
    const dispatch = useDispatch();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [status, setStatus] = useState('active');
    const [addProjectWindow, setAddProjectWindow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProjects(status));
    }, [dispatch, status]);

    const projects = useSelector(state => state.projects);

    const filteredProjects = projects.projects.filter(project => project.status === status);

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    const onRowSelect = (event) => {
        navigate(`/projects/${event.data.id}`);
    };

    const onCellCopy = (value) => {
        navigator.clipboard.writeText(value)
        // showToast('success', 'Value copied', value);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({ ...filters, global: { value, matchMode: FilterMatchMode.CONTAINS } });
    };

    const nameLogoTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                {/*<img alt="Avatar" src={`${rowData.logo}`} width="32" />*/}
                <span>{rowData.name}</span>
                <Button icon="pi pi-copy" rounded text severity="secondary" onClick={() => onCellCopy(rowData.name)} />
            </div>
        );
    };

    const onOffTemplate = (rowData) => {
        return <OnOffSwitch rowData={rowData} />;
    };

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </div>
                <div className="flex">
                    <div className="flex mr-2">
                        <Button label="Active" severity="secondary" onClick={() => setStatus('active')} text />
                        <Button label="Inactive" severity="warning" onClick={() => setStatus('inactive')} text />
                    </div>
                    <Button label="Add project"
                            icon="pi pi-plus"
                            severity="success"
                            rounded
                            onClick={() => setAddProjectWindow(true)}
                    />
                </div>
            </div>
        );
    };

    const activeMailboxTemplate = (data) => {
        return (
            <div>
                <div className='mb-1'><b>{data.name}</b></div>
                <div>{data.email}</div>
            </div>
        );
    }

    const mailboxActionTemplate = () => {
        return (
            <div>
                <Button icon="pi pi-cog" rounded text severity="secondary" size="large" />
                <Button icon="pi pi-play-circle" rounded text severity="secondary" size="large" />
            </div>
        );
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <TabView>
                    <TabPanel header="Mailboxes">
                        <DataTable value={data.mailboxes}>
                            <Column header="Active mailbox" body={activeMailboxTemplate} sortable></Column>
                            <Column field="email" header="Email" sortable></Column>
                            <Column field="emailProvider" header="Provider" sortable></Column>
                            <Column field="activeCampaignsCount" header="Active campaigns" sortable></Column>
                            <Column header="Actions" body={mailboxActionTemplate}></Column>
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Members">
                        <DataTable value={data.users}>
                            <Column field="name" header="Name" sortable></Column>
                        </DataTable>
                    </TabPanel>
                </TabView>
            </div>
        );
    };

    return (
        <div className="card">
            <ConfirmDialog />
            <AddProject visible={addProjectWindow} setVisible={setAddProjectWindow}/>
            <DataTable value={filteredProjects}
                       filters={filters}
                       loading={projects.loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator
                       rows={10}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No projects found."
                       selectionMode="single" selection={selectedRow}
                       onRowSelect={onRowSelect} metaKeySelection={false}
                       expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}
            >
                <Column expander={true} style={{ width: '5rem' }} />
                <Column field="name" header="Name" body={nameLogoTemplate} sortable></Column>
                <Column field="activeCampaignsCount" header="Active campaigns" sortable></Column>
                <Column header="on/off" body={onOffTemplate} sortable></Column>
            </DataTable>
        </div>
    );
}
