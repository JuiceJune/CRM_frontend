import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProspectsUploader from "../ProspectsUploader.jsx";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const AddProspectsDialog = ({visible, setVisible}) => {
    const campaignId = useSelector(state => state.campaigns.campaign.id);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Add Prospects</span>
        </div>
    );

    const footerContent = (
        <div>

        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '30rem' }} onHide={() => setVisible(false)}>
                <div className={'flex gap-4 justify-content-around'}>
                    <ProspectsUploader campaignId={campaignId}/>
                    <Button label="Create manualy" severity="secondary" outlined />
                </div>
            </Dialog>
        </div>
    )
};

export default AddProspectsDialog;