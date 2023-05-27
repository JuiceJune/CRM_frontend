import React from 'react';
import 'primeicons/primeicons.css';
import ProjectClientCard from "./projectClientCard.jsx";
import ProjectUserCard from "./projectUserCard.jsx";
import ProjectMailboxesCard from "./projectMailboxesCard.jsx";
import ProjectLinkedinAccountsCard from "./projectLinkedinAccountsCard.jsx";


const ProjectHeaderCards = (props) => {
    const {project} = props
    return (
        <div className="grid">
            {/*1*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectClientCard project={project}/>
                </div>
            </div>
            {/*2*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectUserCard user={project.csm} position="CSM"/>
                </div>
            </div>
            {/*3*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectUserCard user={project.it_specialist} position="IT Specialist"/>
                </div>
            </div>
            {/*4*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectUserCard user={project.research_manager} position="Research Manager"/>
                </div>
            </div>
            {/*5*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectUserCard user={project.sdrs} position="SDRs"/>
                </div>
            </div>
            {/*6*/}
            <div className="col-12 md:col-6 lg:col-4">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectUserCard user={project.researchers} position="Researchers"/>
                </div>
            </div>
            {/*7*/}
            <div className="col-12 md:col-6">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectMailboxesCard mailboxes={project.mailboxes}/>
                </div>
            </div>
            {/*8*/}
            <div className="col-12 md:col-6">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <ProjectLinkedinAccountsCard linkedinAccounts={project.linkedin_accounts} position="Researchers"/>
                </div>
            </div>
        </div>
    );
};

export default ProjectHeaderCards;
