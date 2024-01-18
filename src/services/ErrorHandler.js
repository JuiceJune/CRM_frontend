class ErrorHandler {
    static handle(error, detail, toast) {
        toast.show({ severity: 'error', error, detail, life: 5000 });
    }
}

export default ErrorHandler;
