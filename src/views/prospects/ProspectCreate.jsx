import React, {useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axiosClient from "../../services/axios-client.js";
import {Button} from "primereact/button";
import ProspectForm from "../../components/prospect/prospectForm.jsx";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {BounceLoader} from "react-spinners";

const ProspectCreate = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {showToast} = useStateContext();
    const [loading, setLoading] = useState(false)
    const [prospects, setProspects] = useState([
        {first_name: '', last_name: '', email: ''},
    ])

    const onSubmit = () => {
        setLoading(true);
        axiosClient.post(`/prospects`, {prospects, campaign_id: id})
            .then((response) => {
                console.log(response);
                showToast('success', 'Success', response.data.message);
                navigate(`/campaigns/${id}`)
            })
            .catch(error => {
                console.log(error)
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    const handleAddProspect = () => {
        let newProspect = {first_name: '', last_name: '', email: '', campaign_id: id}
        setProspects([...prospects, newProspect]);
    };

    const handleRemoveProspect = (index) => {
        let data = [...prospects];
        data.splice(index, 1)
        setProspects(data)
    };

    const handleInputChange = (index, event) => {
        let data = [...prospects];
        data[index][event.target.name] = event.target.value;
        setProspects(data);
    };

    return (
        <div>
            <div className='card animated faidInDown'>
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
                        {prospects.map((prospect, index) => (
                            <ProspectForm key={index}
                                          index={index}
                                          prospect={prospect}
                                          handleInputChange={handleInputChange}
                                          handleRemoveProspect={handleRemoveProspect}
                            />
                        ))}
                        <div className="flex gap-2 mb-3 mt-4">
                            <Button icon="pi pi-plus" loading={loading} label="Add Prospect"
                                    onClick={handleAddProspect}/>
                            <Button icon="pi pi-check" loading={loading} label="Save" onClick={onSubmit}/>
                            <Button loading={loading} label="Cancel" severity="danger" onClick={() => navigate(-1)}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProspectCreate;
