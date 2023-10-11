import {createBrowserRouter} from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import Users from "./views/users/Users.jsx";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import UserForm from "./views/users/UserForm.jsx";
import Projects from "./views/projects/Projects.jsx";
import Mailboxes from "./views/mailboxes/Mailboxes.jsx";
import Mailbox from "./views/mailboxes/Mailbox.jsx";
import LinkedinAccounts from "./views/linkedinAccounts/LinkedinAccounts.jsx";
import Linkedin from "./views/linkedinAccounts/Linkedin.jsx";
import Project from "./views/projects/Project.jsx";
import User from "./views/users/User.jsx";
import Profile from "./views/users/Profile.jsx";

const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
          {
              path: '/',
              element: <Dashboard />
          },
          {
              path: '/dashboard',
              element: <Dashboard />
          },
          {
              path: '/users',
              element: <Users />,
          },
          {
              path: '/users/new',
              element: <UserForm key="userCreate" />
          },
          {
              path: '/users/:id',
              element: <User/>
          },
          {
              path: '/projects',
              element: <Projects />
          },
          {
              path: '/mailboxes',
              element: <Mailboxes />,
          },
          {
              path: '/mailboxes/:id',
              element: <Mailbox />
          },
          {
              path: '/linkedin-accounts',
              element: <LinkedinAccounts />,
          },
          {
              path: '/linkedin-accounts/:id',
              element: <Linkedin />,
          },
          {
              path: '/projects',
              element: <Projects />,
          },
          {
              path: '/projects/:id',
              element: <Project />,
          },
          {
              path: '/users',
              element: <Users />,
          },
          {
              path: '/profile',
              element: <Profile />,
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
    }
])

export default router;
