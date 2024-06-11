import {useState} from 'react';
import { Button } from 'primereact/button';
import {useParams} from "react-router-dom";

const UnsubscribePage = () => {
    const {id} = useParams()
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsUnsubscribed(true);
    //     axiosClient
    //         .get(`/unsubscribe/${id}`)
    //         .then((response) => {
    //             console.log('Unsubscribe')
    //         })
    // };

    return (
        <div className='unsubscribe'>
            {isUnsubscribed ? (
                <div>
                    <h1>You are unsubscribed</h1>
                </div>
            ) : (
                <div>
                    <h1>
                        Click the button below
                        to unsubscribe
                    </h1>
                    <Button className="mt-4"
                            label="Unsubscribe"
                            severity="success"
                            rounded size="large"
                            // onClick={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default UnsubscribePage;
