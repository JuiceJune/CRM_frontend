import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {createCampaign, storeCampaign} from "../../store/slices/campaignsSlice.js";
import { Divider } from 'primereact/divider';
import CampaignHeaderCreate from "../../components/campaign/create/CampaignHeaderCreate.jsx";
import CampaignSettings from "../../components/campaign/CampaignSettings.jsx";

const AddCampaign = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const campaigns = useSelector(state => state.campaigns);
    const [campaign, setCampaign] = useState({
        name: '',
        mailbox_id: null,
        project_id: id,
        timezone: 'Europe/Kyiv',
        start_date: new Date(),
        send_limit: 20,
        steps: [
            {
                step: 1,
                sending_time_json: {
                    Mon: [true, "08:00", "15:00"],
                    Tues: [true, "08:00", "15:00"],
                    Wed: [true, "08:00", "15:00"],
                    Thurs: [true, "08:00", "15:00"],
                    Fri: [true, "08:00", "15:00"],
                    Sat: [false, "08:00", "15:00"],
                    Sun: [false, "08:00", "15:00"]
                },
                period: 120,
                start_after: {
                    time: 3,
                    time_type: "days"
                },
                reply_to_exist_thread: {
                    reply: false,
                    step: null
                },
                versions: [
                    {version: 'A', subject: 'Subject', message: 'Message'}
                ]
            }
        ],
    });
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(createCampaign(id)).then((response) => {
            handleInputChange('project_id', response.payload.project_id);
            setLoading(false);
        });
    }, [dispatch, id]);


    const handleSave = async () => {
        let response = await dispatch(storeCampaign(campaign)).unwrap();
        navigate(`/campaigns/${response.success}`)
    };

    const handleInputChange = (field, value) => {
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            [field]: value,
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-8'>
            <CampaignHeaderCreate handleInputChange={handleInputChange} campaign={campaign} onSave={handleSave} mailboxes={campaigns.mailboxes}/>
            <Divider/>
            <CampaignSettings campaign={campaign} handleInputChange={handleInputChange} setCampaign={setCampaign}/>
        </div>
    );
};

export default AddCampaign;