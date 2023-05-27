import React, {useState} from 'react';
import {BounceLoader} from "react-spinners";
import DashboardCards from "../../components/dashboard/dashboardCards.jsx";
import DashboardHeaderCards from "../../components/dashboard/dashboardHeaderCards.jsx";

const Dashboard = () => {
    const [loading, setLoading] = useState(false)

    return (
        <div>
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
                    <DashboardHeaderCards/>
                    <DashboardCards/>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
