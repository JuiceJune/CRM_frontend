import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axiosClient from '../../services/axios-client.js';
import {useStateContext} from '../../contexts/ContextProvider.jsx';
import {InputText} from 'primereact/inputText';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {BounceLoader} from "react-spinners";
import {Calendar} from 'primereact/calendar';
import CampaignSteps from "../../components/campaign/step/campaignSteps.jsx";
import {Slider} from "primereact/slider";

const ProjectCampaignCreate = () => {
    const {id} = useParams();
    const {showToast} = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [mailboxes, setMailboxes] = useState([]);
    const [timezones, setTimezones] = useState([]);
    const [snippets, setSnippets] = useState([]);
    const [availableSendLimit, setAvailableSendLimit] = useState(0);
    const [selectedMailbox, setSelectedMailbox] = useState(false);
    const [campaign, setCampaign] = useState({
        name: '',
        mailbox_id: '',
        project_id: id,
        timezone: '',
        start_date: new Date(),
        send_limit: 0,
        steps: [
            {
                step: 1, sending_time_json: {
                    Mon: [true, "08:00", "15:00"],
                    Tues: [true, "08:00", "15:00"],
                    Wed: [true, "08:00", "15:00"],
                    Thurs: [true, "08:00", "15:00"],
                    Fri: [true, "08:00", "15:00"],
                    Sat: [false, "08:00", "15:00"],
                    Sun: [false, "08:00", "15:00"]
                }, period: 120, start_after: {
                    time: 3,
                    time_type: "days"
                }, versions: [
                    {version: 'A', subject: '', message: ''}
                ]
            }
        ],
        priority_config: {
            1: {1: 100},
            2: {1: 20, 2: 80},
            3: {1: 20, 2: 40, 3: 40},
            4: {1: 20, 2: 26, 3: 26, 4: 26},
            5: {1: 20, 2: 20, 3: 20, 4: 20, 5: 20},
            6: {1: 20, 2: 16, 3: 16, 4: 16, 5: 16, 6: 16},
            7: {1: 20, 2: 13, 3: 13, 4: 13, 5: 13, 6: 13, 7: 13},
            8: {1: 20, 2: 11, 3: 11, 4: 11, 5: 11, 6: 11, 7: 11, 8: 11},
            9: {1: 20, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10},
            10: {1: 20, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9, 10: 9},
        }
    });

    useEffect(() => {
        getCampaignCreateInfo();
    }, [id]);

    const getCampaignCreateInfo = () => {
        setLoading(true);

        axiosClient
            .get(`/campaigns/create`, {
                params: {
                    project_id: id,
                },
            })
            .then((response) => {
                console.log(response);
                setMailboxes(response.data.mailboxes);
                setTimezones(response.data.timezones);
                setSnippets(response.data.snippets);
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleMailboxChange = (value) => {
        handleInputChange('send_limit', 0);
        let mailbox = mailboxes.find(item => item.id === value);
        setAvailableSendLimit(mailbox.available_limit);
        setSelectedMailbox(true);
    };

    const saveCampaign = () => {
        console.log(campaign);
        axiosClient
            .post(`/campaigns`, campaign)
            .then((response) => {
                showToast("success", 'Campaign created successfully', campaign.name);
                // navigate(`/campaigns/${response.data}`);
            })
            .catch((error) => {
                console.log(error);
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleInputChange = (field, value) => {
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            [field]: value,
        }));
    };

    return (
        <div>
            <div className="card animated fadeInDown">
                {loading ? (
                    <BounceLoader
                        color={"#5B08A7"}
                        loading={loading}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <div>
                        <h1>Campaign</h1>
                        <hr/>
                        <br/>
                        <div className="flex flex-column gap-2 mb-3">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={campaign.name}
                                onChange={(event) => handleInputChange('name', event.target.value)}
                            />
                        </div>

                        <div className="flex flex-column gap-2 mb-5">
                            <label htmlFor="email">Email</label>
                            <Dropdown
                                value={campaign.mailbox_id}
                                id="email"
                                onChange={(event) => {
                                    handleInputChange('mailbox_id', event.target.value)
                                    handleMailboxChange(event.target.value);
                                }}
                                options={mailboxes}
                                optionLabel="email"
                                optionValue="id"
                                filter
                                placeholder="Select a mailbox"
                                className="w-full"
                            />
                        </div>

                        {selectedMailbox && (
                            <div className="flex flex-column gap-2 mb-5">
                                <label htmlFor="send_limit">Send limit</label>
                                <div className="pr-3 pl-3 pt-3">
                                    <div className='flex justify-content-between pb-4'>
                                        <span>{campaign.send_limit}</span>
                                        <span>{availableSendLimit}</span>
                                    </div>
                                    <Slider value={campaign.send_limit}
                                            max={availableSendLimit}
                                            onChange={(event) => {
                                                handleInputChange('send_limit', event.value)
                                            }}/>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-column gap-2 mb-5">
                            <label htmlFor="timezone">Timezone</label>
                            <Dropdown value={campaign.timezone}
                                      filter
                                      id="timezone"
                                      name="timezone"
                                      onChange={(event) => handleInputChange('timezone', event.target.value)}
                                      options={timezones}
                                      placeholder="Select a timezone" className="w-full"/>
                        </div>

                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="start_date">Schedule start</label>
                            <Calendar value={campaign.start_date} dateFormat="mm/dd/yy"
                                      onChange={(event) => handleInputChange('start_date', event.target.value)}/>
                        </div>

                        <hr/>
                        <h2>Steps</h2>
                        <hr/>
                        <br/>

                        <CampaignSteps campaign={campaign} setCampaign={setCampaign}
                                       snippets={snippets}/>

                        <hr/>
                        <div className="flex gap-2 mb-3 mt-4">
                            <Button icon="pi pi-check" loading={loading} label="Save" onClick={saveCampaign}/>
                            <Button
                                loading={loading}
                                label="Cancel"
                                severity="danger"
                                onClick={() => navigate(-1)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCampaignCreate;
