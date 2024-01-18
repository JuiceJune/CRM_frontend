import React from 'react';
import 'primeicons/primeicons.css';
import MyProjectsCard from "./myProjectsCard.jsx";
import MyMailboxesCard from "./myMailboxesCard.jsx";
import MyLinkedinAccountsCard from "./myLinkedinAccountsCard.jsx";

const DashboardCards = (props) => {
    const {loading, setLoading} = props;

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <MyProjectsCard/>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full">
                    <MyMailboxesCard/>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
