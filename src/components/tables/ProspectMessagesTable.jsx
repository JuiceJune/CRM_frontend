import {useEffect, useState, useCallback, useMemo} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {useDispatch, useSelector} from "react-redux";
import {FilterMatchMode} from "primereact/api";
import {Panel} from 'primereact/panel';
import {Divider} from 'primereact/divider';
import {Button} from "primereact/button";
import {confirmDialog} from "primereact/confirmdialog";
import {deleteProspect, fetchProspects, updateProspect} from "../../store/slices/prospectsSlice.js";
import {useParams} from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

export default function ProspectMessagesTable() {
    const {id: campaignId} = useParams();
    const dispatch = useDispatch();
    const prospects = useSelector(state => state.prospects);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState(null);

    const setStatus = useCallback(async (status, id) => {
        await dispatch(updateProspect({
            id: id,
            status: status.name
        }));
        dispatch(fetchProspects(campaignId));
    }, [dispatch, campaignId]);

    const statuses = [
        {name: 'active'},
        {name: 'inactive'},
        {name: 'opened'},
        {name: 'bounced'},
        {name: 'unsubscribed'},
        {name: 'responded'}
    ];

    const filters = useMemo(() => ({
        global: {value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS},
    }), [globalFilterValue]);

    useEffect(() => {
        dispatch(fetchProspects(campaignId));
    }, [dispatch, campaignId]);

    const onGlobalFilterChange = useCallback((e) => {
        setGlobalFilterValue(e.target.value);
    }, []);

    const header = useMemo(() => (
        <div className="flex justify-content-between">
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>
    ), [globalFilterValue, onGlobalFilterChange]);

    const status = (data) => (
        <div className="flex justify-content-between">
            <Dropdown value={{name: data.status}}
                      options={statuses}
                      optionLabel={"name"}
                      onChange={(e) => setStatus(e.value, data.id)}
                      className="w-full md:w-14rem" />
        </div>
    );

    const rowExpansionTemplate = useCallback((data) => (
        <div className='flex flex-column gap-5'>
            {data.sentMessages.map((message, index) => (
                <div key={index} className='flex gap-4'>
                    <Panel className='w-7' header={`Step: ${message.campaign_step_id}`}>
                        <h4>To: {message.to}</h4>
                        <Divider />
                        <div>Subject: {message.subject}</div>
                        <Divider />
                        <div dangerouslySetInnerHTML={{__html: message.message}} />
                    </Panel>
                    <div>
                        <h4 className='mb-4'>Last activity</h4>
                        <DataTable value={message.activities}>
                            <Column field="type" header="Name" />
                            <Column field="date_time" header="Date" />
                        </DataTable>
                    </div>
                </div>
            ))}
        </div>
    ), []);

    const allowExpansion = useCallback((rowData) => rowData.sentMessages.length > 0, []);

    const confirmDelete = useCallback((id) => {
        confirmDialog({
            message: 'Do you want to delete this prospect?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(id),
        });
    }, []);

    const handleDelete = useCallback(async (id) => {
        await dispatch(deleteProspect(id));
        dispatch(fetchProspects(campaignId));
    }, [dispatch, campaignId]);

    const prospectActions = useCallback((data) => (
        <div className='flex gap-3 align-items-center'>
            <Button icon="pi pi-trash" severity="danger" rounded text size="large" onClick={() => confirmDelete(data.id)} />
        </div>
    ), [confirmDelete]);

    return (
        <div className="card">
            <DataTable
                value={prospects.prospects}
                filters={filters}
                loading={prospects.loading}
                style={{width: '100%'}}
                scrollable
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={header}
                emptyMessage="No prospects found."
                selectionMode="single"
                metaKeySelection={false}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
            >
                <Column expander={allowExpansion} style={{width: '5rem'}} />
                <Column header="Email" field='email' sortable />
                <Column header="Status" body={status} sortable />
                <Column header="First Name" field='first_name' sortable />
                <Column header="Last Name" field='last_name' sortable />
                <Column header="Actions" body={prospectActions} />
            </DataTable>
        </div>
    );
}
