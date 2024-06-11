import {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FilterMatchMode} from "primereact/api";

export default function ProspectTable() {
    const prospects = useSelector(state => state.prospects);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [status, setStatus] = useState('active');
    const navigate = useNavigate();

    const filteredProspects = prospects.prospects.filter(prospect => prospect.status === status);

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

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <div>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={prospects.prospects}
                       filters={filters}
                       loading={prospects.loading}
                       style={{ width: '100%' }}
                       scrollable
                       dataKey="id"
                       paginator
                       rows={10}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       header={header}
                       emptyMessage="No prospects found."
                       selectionMode="single"
                       selection={selectedRow}
                       onRowSelect={onRowSelect}
                       metaKeySelection={false}
            >
                <Column header="Email" field='email' sortable></Column>
                <Column header="Status" field='status' sortable></Column>
                <Column header="First Name" field='first_name' sortable></Column>
                <Column header="Last Name" field='last_name' sortable></Column>
            </DataTable>
        </div>
    );
}
