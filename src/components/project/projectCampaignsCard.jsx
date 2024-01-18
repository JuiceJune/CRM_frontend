import React from 'react';
import 'primeicons/primeicons.css';
import {Link, useParams} from "react-router-dom";
import {Button} from "primereact/button";
import { useNavigate } from "react-router-dom";

const ProjectCampaignsCard = (props) => {
    const {id} = useParams();
    const {campaigns} = props;
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex align-content-center justify-content-between text-500 font-medium mb-2 border-bottom-1 border-300 pb-1 ">
                <div className="flex align-items-center">
                    Campaigns
                </div>
                <Button className="flex align-items-center" link icon="pi pi-plus" label="Add Campaign" onClick={() => {
                    navigate(`campaigns/create`);
                }}/>
            </div>
            {campaigns && campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <div key={campaign.id} className="transition-colors transition-duration-500 hover:surface-200">
                        <Link to={`/campaigns/${campaign.id}`} className="a-decoration">
                            <div className="flex justify-content-between align-items-center pt-1">
                                <div className="pl-2 my-auto hidden-overflow z-5">
                                    <div className="text-500">{campaign.name}</div>
                                    <div className="text-600 text-base">{campaign.mailbox.email}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="flex pt-1 text-500">
                    Not specified
                </div>
            )}
        </div>
    );
};

export default ProjectCampaignsCard;

