import {Button} from "primereact/button";
import BorderlessInput from "../../inputs/borderlessInput.jsx";
import BorderlessSelect from "../../selects/borderlessSelect.jsx";

const CampaignHeaderCreate = (props) => {
    // eslint-disable-next-line react/prop-types
    const {campaign, onSave, handleInputChange, mailboxes} = props;

    const handleSave = () => {
        onSave();
    };

    return (
        <div className='flex justify-content-between mb-4'>
            <div className='flex gap-3 align-items-center'>
                <div className='align-items-center'>
                    <i className='pi pi-play' style={{fontSize: '1.8rem'}}></i>
                </div>
                <div>
                    <div className='flex gap-1'>
                    </div>
                    <div>
                        <div className={'flex align-items-center gap-2'}>
                            <h3>Name: </h3>
                            <BorderlessInput value={campaign.name}
                                             onChange={(e) => {
                                                 handleInputChange('name', e.target.value)
                                             }}
                            />
                        </div>
                        <BorderlessSelect
                            label={'Mailbox'}
                            value={campaign.mailbox}
                            onChange={(e) => {
                                handleInputChange('mailbox', e.target.value)
                                handleInputChange('mailbox_id', e.target.value)
                            }}
                            options={mailboxes}
                            field={'email'}
                            className="custom-select"
                        />
                    </div>
                </div>
            </div>
            <div className='flex align-content-center gap-1'>
                <Button icon="pi pi-check" severity="success" rounded text size="large" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default CampaignHeaderCreate;