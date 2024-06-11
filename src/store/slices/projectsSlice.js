import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "../../services/axiosClient.js";
import errorHandler from "../../services/errorHandler.js";
import {NotificationType, showNotification} from "./notificationsSlice.js";

export const fetchProjects = createAsyncThunk('projects', async (status = null) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    let url = '/projects';

    if(status) {
        url += '?status=' + status;
    }

    try {
        const res = await axiosClient.get(url, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const fetchProject = createAsyncThunk('project', async (id) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.get(`/projects/${id}`, config);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
        throw err;
    }
});

export const createProject = createAsyncThunk('create-project', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.post(`/projects`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Project created", message: res.data.name, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const updateProject = createAsyncThunk('update-project', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.put(`/projects/${data.id}`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Project updated", message: res.data.name, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

export const deleteProject = createAsyncThunk('delete-project', async (data, thunkAPI) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const res = await axiosClient.delete(`/projects/${data}`, data, config);
        thunkAPI.dispatch(showNotification({ subject: "Project deleted", message: res.data.success, type: NotificationType.Success }));
        return res.data;
    } catch (err) {
        errorHandler(thunkAPI.dispatch, err);
        throw err;
    }
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        loading: true,
        projects: [],
        project: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.project = action.payload;
                state.loading = false;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.project = action.payload;
                state.loading = false;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.project = action.payload;
                state.loading = false;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default projectsSlice.reducer;
