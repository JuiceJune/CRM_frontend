import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./slices/userSlice.js";
import projectsSlice from "./slices/projectsSlice.js";
import campaignsSlice from "./slices/campaignsSlice.js";
import prospectsSlice from "./slices/prospectsSlice.js";
import notificationsSlice from "./slices/notificationsSlice.js";
import mailboxesSlice from "./slices/mailboxesSlice.js";

export default configureStore({
    reducer: {
        user: userSlice,
        projects: projectsSlice,
        campaigns: campaignsSlice,
        prospects: prospectsSlice,
        notifications: notificationsSlice,
        mailboxes: mailboxesSlice
    },
});