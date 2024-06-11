import { Button } from 'primereact/button';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Link, useParams} from "react-router-dom";
import {deleteMailbox, getUrlForConnect} from "../../store/slices/mailboxesSlice.js";
import MailboxForm from "../mailbox/MailboxForm.jsx";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {fetchProject} from "../../store/slices/projectsSlice.js";

const ProjectMailboxes = ({mailboxes}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        dispatch(getUrlForConnect({"connection_type": "gmail", "project": id, "url": window.location.href}));
    }, [id])

    const url = useSelector(state => state.mailboxes.url);

    const urlRedirect = () => {
        window.location.href = url;
    }

    const emailAccountTemplate = (data) => {
        return (
            <div>
                {data.name} - {data.email}
            </div>
        )
    };

    const mailboxActions = (data) => {
        return (
            <div className='flex gap-3 align-items-center'>
                <div className='align-items-center'>
                    <Link to="#" className="pi pi-cog text-black-alpha-90" style={{ fontSize: '1.5rem', textDecoration: "none" }}></Link>
                </div>
                <div>
                    <i className="pi pi-trash cursor-pointer" style={{ fontSize: '1.4rem' }} onClick={() => handleDeleteMailbox(data.id)}></i>
                </div>
                <div>
                    <i className="pi pi-refresh cursor-pointer" style={{ fontSize: '1.4rem' }} onClick={() => handleReconnectMailbox(data.id)}></i>
                </div>
            </div>
        );
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 my-3">
                <MailboxForm mailbox={data}/>
            </div>
        );
    };

    const handleDeleteMailbox = (mailboxId) => {
        confirmDialog({
            message: 'Are you sure you want to delete the mailbox?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: () => {
                dispatch(deleteMailbox(mailboxId)).then(() => {
                    dispatch(fetchProject(id));
                });
            },
        });
    };

    const handleReconnectMailbox = () => {
        confirmDialog({
            message: 'Are you sure you want to reconnect the mailbox?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: urlRedirect
        });
    };


    return (
        <div className="card">
            <div className='my-2 flex flex-row-reverse'>
                <Button label="Add Gmail" severity="secondary" outlined onClick={urlRedirect}/>
            </div>
            <DataTable value={mailboxes}
                       expandedRows={expandedRows}
                       onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}
                       ableStyle={{ minWidth: '50rem' }}>
                <Column expander={true} style={{ width: '5rem' }} />
                <Column body={emailAccountTemplate} header="Email Accounts"></Column>
                <Column field="emailProvider" header="Provider"></Column>
                <Column field="activeCampaignsCount" header="Running Campaigns"></Column>
                <Column body={mailboxActions} header="Actions"></Column>
            </DataTable>
        </div>
    );
};

export default ProjectMailboxes;