import React, {useState} from 'react';
import {FileUpload} from 'primereact/fileupload';
import axiosClient from "../../services/axios-client.js";
import {BounceLoader} from "react-spinners";
import handleAxiosError from "../../services/AxiosErrorHandler.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const ProspectUpload = ({id, getProspects, loading, setLoading}) => {
    const [selectedFile, setSelectedFile] = useState('');
    const { showToast } = useStateContext();

    const onSelect = (event) => {
        setSelectedFile(event.files[0]);
    };

    const handleUpload = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('csv_file', selectedFile);
        formData.append('campaign_id', id);
        axiosClient.post('/prospects/csv-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                showToast('success', 'Success', response.data)
                getProspects();
            })
            .catch((error) => {
                handleAxiosError(error, showToast);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <div className="card">
            {loading ? (
                <BounceLoader
                    color={"#5B08A7"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <FileUpload
                    name="prospectsFile"
                    onSelect={onSelect}
                    uploadHandler={handleUpload}
                    customUpload
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                />
            )}
        </div>
    );
};

export default ProspectUpload;
