import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import axiosClient from "../../services/axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {InputText} from "/primereact/inputText";
import {Button} from "primereact/button";
import {Dropdown} from 'primereact/dropdown';

const CampaignCreate = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [mailboxes, setMailboxes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [campaign, setCampaign] = useState({
        name: '',
        mailbox_id: '',
        project_id: ''
    })

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/campaigns/create`)
            .then((response) => {
                console.log(response)
                setMailboxes(response.data.mailboxes);
                setProjects(response.data.projects);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }, [])

    const onSubmit = () => {
        axiosClient.post(`/campaigns`, campaign)
            .then((response) => {
                setNotification("Campaign was successfully created")
                navigate('/campaigns')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='card animated faidInDown'>
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                {!loading &&
                    <div>
                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="text">Name</label>
                            <InputText id="name"
                                       onChange={event => setCampaign({...campaign, name: event.target.value})}/>
                            <small>
                                Enter your name.
                            </small>
                        </div>

                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="email">Email</label>
                            <Dropdown value={campaign.mailbox_id} id="email"
                                      onChange={(event) => setCampaign({...campaign, mailbox_id: event.target.value})}
                                      options={mailboxes}
                                      optionLabel="email"
                                      optionValue="id"
                                      filter
                                      placeholder="Select a mailbox" className="w-full"/>
                        </div>
                        <div className="flex flex-column gap-2 mb-4">
                            <label htmlFor="email">Project</label>
                            <Dropdown value={campaign.project_id} id="email"
                                      onChange={(event) => setCampaign({...campaign, project_id: event.target.value})}
                                      options={projects}
                                      optionLabel="name"
                                      optionValue="id"
                                      filter
                                      placeholder="Select a project" className="w-full"/>
                        </div>
                        <div className="flex gap-2 mb-3 mt-4">
                            <Button icon="pi pi-check" loading={loading} label="Save" onClick={onSubmit}/>
                            <Button loading={loading} label="Cancel" severity="danger" onClick={() => navigate(-1)}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CampaignCreate;
