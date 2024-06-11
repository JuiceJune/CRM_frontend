import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../services/axiosClient.js";
import {NotificationType, showNotification} from "./notificationsSlice.js";
import errorHandler from "../../services/errorHandler.js";

export const fetchCampaigns = createAsyncThunk('campaigns', async (my = null) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    let url = '/campaigns';

    if(my) {
        url += '?my=' + my;
    }

    try {
        const res = await axiosClient.get(url, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const fetchCampaign = createAsyncThunk('campaign', async (id) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/campaigns/${id}`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const editCampaign = createAsyncThunk('edit-campaign', async (id) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/campaigns/${id}/edit`, config);
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const createCampaign = createAsyncThunk('create-campaign', async (project) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    let url = '/campaigns/create';

    if(project) {
        url += '?project_id=' + project;
    }

    try {
        const res = await axiosClient.get(url, config);
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const updateCampaign = createAsyncThunk('update-campaign', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.put(`/campaigns/${data.id}`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Campaign updated", message: res.data.name, type: NotificationType.Success }));
        console.log(res.data)
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err.response.data);
        throw err;
    }
});

export const storeCampaign = createAsyncThunk('store-campaign', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.post(`/campaigns`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Campaign created", message: res.data.name, type: NotificationType.Success }));
        console.log(res.data)
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err.response.data);
        throw err;
    }
});

export const deleteCampaign = createAsyncThunk('delete-campaign', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.delete(`/campaigns/${data}`, config);
        thunkAPI.dispatch(showNotification({ subject: "Campaign deleted", message: res.data.success, type: NotificationType.Success }));
        console.log(res.data)
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err.response.data);
        throw err;
    }
});

export const startCampaign = createAsyncThunk('start-campaign', async (campaignId, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/campaigns/${campaignId}/start`, config);
        thunkAPI.dispatch(showNotification({ subject: "Campaign started", message: res.data.success, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err.response.data);
        throw err;
    }
});

export const stopCampaign = createAsyncThunk('stop-campaign', async (campaignId, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/campaigns/${campaignId}/stop`, config);
        thunkAPI.dispatch(showNotification({ subject: "Campaign stopped", message: res.data.success, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err.response.data);
        throw err;
    }
});

export const sendTestMail = createAsyncThunk('send-test-mail', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.post(`/campaigns/sendTestEmail`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Test message sent", message: res.data.success, type: NotificationType.Success }));
        console.log(res.data)
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        console.log(err);
        throw err;
    }
});

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        loading: true,
        campaigns: [],
        campaign: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCampaigns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampaigns.fulfilled, (state, action) => {
                state.campaigns = action.payload;
                state.loading = false;
            })
            .addCase(fetchCampaigns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampaign.fulfilled, (state, action) => {
                state.campaign = action.payload;
                state.loading = false;
            })
            .addCase(fetchCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.project_id = action.payload.project_id;
                state.mailboxes = action.payload.mailboxes;
                state.timezones = action.payload.timezones;
                state.snippets = action.payload.snippets;
                state.loading = false;
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCampaign.fulfilled, (state, action) => {
                state.campaign = action.payload.campaign;
                state.mailboxes = action.payload.mailboxes;
                state.timezones = action.payload.timezones;
                state.snippets = action.payload.snippets;
                state.loading = false;
            })
            .addCase(editCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCampaign.fulfilled, (state, action) => {
                state.campaign = action.payload;
                state.loading = false;
            })
            .addCase(updateCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(storeCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(storeCampaign.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(storeCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCampaign.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(sendTestMail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendTestMail.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendTestMail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(startCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startCampaign.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(startCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(stopCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(stopCampaign.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(stopCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default campaignsSlice.reducer;
