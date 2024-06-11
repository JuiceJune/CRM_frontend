import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchProspects} from "../../../store/slices/prospectsSlice.js";
import {useParams} from "react-router-dom";
import ProspectTable from "../../tables/ProspectTable.jsx";

const Prospects = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProspects(id));
    }, [dispatch, id]);

    return (
        <div>
            <ProspectTable/>
        </div>
    );
};

export default Prospects;