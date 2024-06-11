import {Chip} from "primereact/chip";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import BorderlessInput from "../inputs/borderlessInput.jsx";
import BorderlessSelect from "../selects/borderlessSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {deleteCampaign, fetchCampaign, startCampaign, stopCampaign} from "../../store/slices/campaignsSlice.js";
import AddProspectsDialog from "./AddProspectsDialog.jsx";
import {useState} from "react";
import { Badge } from 'primereact/badge';

const CampaignHeader = (props) => {
    // eslint-disable-next-line react/prop-types
    const {campaign, onUpdate, handleInputChange, edit = false} = props;
    const mailboxes = useSelector(state => state.campaigns.mailboxes);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [showAddProspectDialog, setShowAddProspectDialog] = useState(false);

    const handleUpdate = () => {
        onUpdate();
    };

    const handleStartCampaign = async () => {
        await dispatch(startCampaign(campaign.id))
        dispatch(fetchCampaign(campaign.id));
    }

    const confirmStart = () => {
        confirmDialog({
            message: 'Do you want to start this campaign?',
            header: 'Start Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: handleStartCampaign
        });
    };

    const handleStopCampaign = async () => {
        await dispatch(stopCampaign(campaign.id))
        dispatch(fetchCampaign(campaign.id));
    }

    const confirmStop = () => {
        confirmDialog({
            message: 'Do you want to stop this campaign?',
            header: 'Stop Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: handleStopCampaign
        });
    };

    const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete this campaign?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
        });
    };

    const accept = () => {
        dispatch(deleteCampaign(campaign.id));
        navigation(-1)
    }

    return (
        <div className='flex justify-content-between mb-4'>
            <div className='flex gap-3 align-items-center'>
                <div>
                    {/*<div className='flex gap-1'>*/}
                    {/*    <Chip label="A/B" className='text-xs'/>*/}
                    {/*    <Chip label="Oleg Bortovsky" className='text-xs'/>*/}
                    {/*</div>*/}
                    <div>
                        {
                            campaign.status === 'stopped' ?
                                <Badge value="Stopped" severity="danger"></Badge> :
                                <Badge value="Active" severity="success"></Badge>
                        }
                    </div>
                    {edit ?
                        (
                            <div>
                                <BorderlessInput value={campaign.name}
                                    onChange={(e) => {
                                        handleInputChange('name', e.target.value)
                                    }}
                                />
                                <BorderlessSelect
                                    label={'Mailbox'}
                                    value={campaign.mailbox?.id ?? campaign.mailbox_id}
                                    onChange={(e) => {
                                        handleInputChange('mailbox', e.target.value)
                                        handleInputChange('mailbox_id', e.target.value)
                                    }}
                                    options={mailboxes}
                                    field={'email'}
                                    className="custom-select"
                                />
                            </div>
                        )
                        :
                        (
                            <div>
                                <h2 className='my-2'>
                                    {campaign.name}
                                </h2>
                                <div>
                                    Mailbox: <span><b>{campaign.mailbox?.email ?? '-'}</b></span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='flex align-content-center gap-1'>
                {campaign.status === 'stopped' ? <Button label="Add prospects" outlined severity="secondary" className='flex align-self-start mr-4' onClick={setShowAddProspectDialog}/> : null}
                {campaign.status === 'stopped' ?
                    <div>
                        <Button icon="pi pi-play-circle" severity="success" onClick={confirmStart} rounded text size="large"/>
                        {edit ?
                            <Button icon="pi pi-check" severity="success" rounded text size="large" onClick={handleUpdate}/>
                            :
                            <Button icon="pi pi-file-edit" severity="secondary" rounded text size="large" onClick={() => navigation('edit')}/>
                        }
                    </div> :
                    <Button icon="pi pi-stop-circle" severity="danger" onClick={confirmStop} rounded text size="large"/>
                }
                <ConfirmDialog />
                <AddProspectsDialog visible={showAddProspectDialog} setVisible={setShowAddProspectDialog}/>
                <Button icon="pi pi-trash" severity="danger" rounded text size="large" onClick={confirmDelete}/>
            </div>
        </div>
    );
};

export default CampaignHeader;