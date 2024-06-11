import {createBrowserRouter} from "react-router-dom";
import Projects from "../pages/projects/projects.jsx";
import Login from "../pages/auth/login.jsx";
import GuestLayout from "../components/layouts/GuestLayout.jsx";
import DefaultLayout from "../components/layouts/DefaultLayout.jsx";
import NotFound from "../pages/notFound.jsx";
import Project from "../pages/projects/project.jsx";
import Campaign from "../pages/campaigns/campaign.jsx";
import EditCampaign from "../pages/campaigns/editCampaign.jsx";
import ProjectSettings from "../pages/projects/projectSettings.jsx";
import AddCampaign from "../pages/campaigns/addCampaign.jsx";
import Users from "../pages/users/users.jsx";
import Campaigns from "../pages/campaigns/campaigns.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Projects/>
            },
            {
                path: '/projects',
                element: <Projects/>
            },
            {
                path: '/projects/:id',
                element: <Project/>
            },
            {
                path: '/projects/:id/campaigns/create',
                element: <AddCampaign/>
            },
            {
                path: '/projects/:id/edit',
                element: <ProjectSettings/>
            },
            {
                path: '/campaigns',
                element: <Campaigns/>
            },
            {
                path: '/campaigns/:id',
                element: <Campaign/>
            },
            {
                path: '/campaigns/:id/edit',
                element: <EditCampaign/>
            },
            {
                path: '/users',
                element: <Users/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;