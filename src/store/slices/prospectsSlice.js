import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../services/axiosClient.js";
import {NotificationType, showNotification} from "./notificationsSlice.js";
import errorHandler from "../../services/errorHandler.js";

export const fetchProspects = createAsyncThunk('prospects', async (campaignId) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    let url = '/prospects';

    // Додаємо параметр campaign_id до URL, якщо він не є null
    if (campaignId !== null) {
        url += `?campaign_id=${campaignId}`;
    }

    try {
        const res = await axiosClient.get(url, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const fetchProspect = createAsyncThunk('prospect', async (id) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/prospects/${id}`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const uploadCSVProspectFile = createAsyncThunk('upload-file-prospects', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
        const res = await axiosClient.post(`/prospects/csv-upload`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Prospect upload", message: res.data.success, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const updateProspect = createAsyncThunk('update-prospect', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.put(`/prospects/${data.id}`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Prospect updated", message: res.data.success, type: NotificationType.Success }));
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err)
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const deleteProspect = createAsyncThunk('delete-prospect', async (id, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.delete(`/prospects/${id}`, config);
        thunkAPI.dispatch(showNotification({ subject: "Prospect deleted", message: res.data.success, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

const prospectsSlice = createSlice({
    name: 'prospects',
    initialState: {
        loading: true,
        prospects: [],
        prospect: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProspects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProspects.fulfilled, (state, action) => {
                state.prospects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProspects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProspect.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProspect.fulfilled, (state, action) => {
                state.prospect = action.payload;
                state.loading = false;
            })
            .addCase(fetchProspect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(uploadCSVProspectFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadCSVProspectFile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(uploadCSVProspectFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProspect.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProspect.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteProspect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProspect.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProspect.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProspect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default prospectsSlice.reducer;
