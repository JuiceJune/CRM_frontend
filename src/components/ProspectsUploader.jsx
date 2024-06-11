import { FileUpload } from 'primereact/fileupload';
import {useDispatch} from "react-redux";
import {uploadCSVProspectFile} from "../store/slices/prospectsSlice.js";

// eslint-disable-next-line react/prop-types
const ProspectsUploader = ({campaignId}) => {
    const dispatch = useDispatch();

    const handleUpload = (event) => {
        const formData = new FormData();
        formData.append('csv_file', event.files[0]);
        formData.append('campaign_id', campaignId);
        dispatch(uploadCSVProspectFile(formData));
    };

    return (
        <div className="card flex justify-content-center">
            <FileUpload chooseLabel="Upload from file" mode="basic" name="prospectsFile" uploadHandler={handleUpload} customUpload />
        </div>
    )
};

export default ProspectsUploader;