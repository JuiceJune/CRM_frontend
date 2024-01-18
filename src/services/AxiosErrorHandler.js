const handleAxiosError = (error, showToast) => {
    if(error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach(errorKey => {
            showToast('error', `Error ${errorKey}`, error.response.data.errors[errorKey], 5000);
        })
    } else {
        const errorMessage = error.response?.data?.error_message;
        const message = error.response?.data?.message;

        const summary = message || 'Error';
        const detail = errorMessage || 'Error during query execution';

        showToast('error', summary, detail, 5000);
    }
};

export default handleAxiosError;
