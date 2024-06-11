import { useEffect, useState } from 'react';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../../store/slices/campaignsSlice.js";

export default function CampaignsTable() {
    const dispatch = useDispatch();
    const [my, setMy] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const campaigns = useSelector(state => state.campaigns);

    useEffect(() => {
        dispatch(fetchCampaigns(my));
    }, [dispatch, my]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters({ ...filters, global: { value, matchMode: FilterMatchMode.CONTAINS } });
    };

    function StatisticTemplate({ iconClass, value, whole }) {
        return (
            <div className='flex text-lg'>
                <i className={iconClass} style={{ fontSize: '1.4rem' }}></i>
                <div className='ml-2'>
                    {whole ? `${((value / whole) * 100).toFixed(0)}% (${value})` : value}
                </div>
            </div>
        );
    }

    const campaignNameTemplate = (data) => {
        return (
            <div className='flex gap-3 align-items-center'>
                <div className='align-items-center'>
                    {data.status === 'stopped' ?
                        <i className='pi pi-pause' style={{ fontSize: '1.8rem' }}></i> :
                        <i className='pi pi-play' style={{ fontSize: '1.8rem' }}></i>
                    }
                </div>
                <div>
                    <div>
                        <h2 className='my-2'>
                            {data.name}
                        </h2>
                    </div>
                    <div>
                        Mailbox: <span><b>{data.mailbox ?? '-'}</b></span>
                    </div>
                </div>
            </div>
        );
    };

    const campaignActions = (data) => {
        return (
            <div className='flex gap-3 align-items-center'>
                <div className='align-items-center'>
                    <Link to={`/campaigns/${data.id}/edit`} className="pi pi-file-edit" style={{ fontSize: '1.5rem', textDecoration: "none" }}></Link>
                </div>
                <div>
                    <Link to={`/campaigns/${data.id}`} className="pi pi-sign-in" style={{ fontSize: '1.5rem', textDecoration: "none" }}></Link>
                </div>
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between">
            <div className="flex align-items-center gap-4">
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
            <Button label={my ? 'Show All' : 'Show My'} onClick={() => setMy(!my)} />
        </div>
    );

    return (
        <div className="card">
            <DataTable
                value={campaigns.campaigns}
                loading={campaigns.loading}
                filters={filters}
                style={{ width: '100%' }}
                scrollable
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={header}
                emptyMessage="No campaigns found."
                metaKeySelection={false}
            >
                <Column header="Campaign Name" body={campaignNameTemplate} sortable />
                <Column header="Prospects" body={(data) => <StatisticTemplate iconClass="pi pi-users" value={data.prospectsCount} />} sortable />
                <Column header="Delivered"
                        body={(data) => <StatisticTemplate
                            iconClass="pi pi-send"
                            value={data.deliveredAllTimeCount}
                            whole={data.prospectsCount}
                        />} sortable></Column>
                <Column header="Open rate"
                        body={(data) => <StatisticTemplate
                            iconClass="pi pi-folder-open"
                            value={data.openedAllTimeCount}
                            whole={data.deliveredAllTimeCount}
                        />} sortable></Column>
                <Column header="Response rate"
                        body={(data) => <StatisticTemplate
                            iconClass="pi pi-reply"
                            value={data.respondedAllTimeCount}
                            whole={data.deliveredAllTimeCount}
                        />} sortable></Column>
                <Column header="Actions" body={campaignActions} />
            </DataTable>
        </div>
    );
}
