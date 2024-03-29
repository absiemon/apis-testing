import { useContext, useState } from 'react';

import { Box } from '@mui/material';


import { DataContext } from '../context/DataProvider';
import { checkParams } from '../utils/common-utils';
import { getData } from '../service/api';

//components
import Form from "./Form";
import SelectTab from './SelectTab';
import SnackBar from './SnackBar';
import Header from './Header';
import Response from './Response';
import ErrorScreen from './ErrorScreen';

// const useStyles = makeStyles({
//     component: {
//         width: '60%',
//         margin: '20px auto 0 auto'
//     }
// })

const Home = () => {
    
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({})

    const { formData, jsonText, paramData, headerData, setLoading} = useContext(DataContext);
    

    const onSendClick = async () => {
        if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
            setError(true);
            return false;
        }

        setErrorResponse(false);
        setLoading(true)
        let response = await getData(formData, jsonText, paramData, headerData);
        
        console.log(response)
        const doc = new DOMParser().parseFromString(response.error, 'text/html');
        console.log(doc.body.textContent);

        if (response?.type === 'error') {
            //checking if error contains html
            const errorRes = response.error;
            const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);
            if (containsHTML(errorRes)) {
                const doc = new DOMParser().parseFromString(response.error, 'text/html');
                setApiResponse({message: doc.body.textContent, status: 'Not found'})
            }
            else{
                setApiResponse(errorRes)
            }
            setLoading(false)
            return;
        }
        setLoading(false)
        setApiResponse(response.data)
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    }

    return (
        <main>
            <Header />
            <div className='w-[100%] flex flex-col items-center'>

            <div className='flex flex-col w-[70%] mt-6' >
                <Form onSendClick={onSendClick} />
                <SelectTab />
                { errorResponse ? <ErrorScreen /> : <Response data={apiResponse} /> }
            </div>
            </div>
            { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} /> }
        </main>
    )
}

export default Home;