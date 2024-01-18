import {createContext, useContext, useRef, useState} from "react";
import {Toast} from "primereact/toast";

const StateContext = createContext({
    user: null,
    mailbox: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    showToast: () => {},
})


export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const toastRef = useRef(null);

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const showToast = (severity, summary, detail, life = 3000) => {
        toastRef.current.show({ severity, summary, detail, life });
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            showToast
        }}>
            {children}
            <Toast ref={toastRef} />
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
