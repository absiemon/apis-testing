import { useContext } from 'react';

import { TextareaAutosize, Typography } from '@mui/material';

import { DataContext } from '../context/DataProvider';

const textareaStyle = { 
    width: '100%', 
    padding: 10,  
    background: `url(http://i.imgur.com/2cOaJ.png)`,
    backgroundAttachment: 'local',
    backgroundRepeat: 'no-repeat',
    paddingLeft: 35,
    paddingTop: 10,
    border: '1px solid #bae6fd' 
}

const CreateJsonText = () => {

    const { setJsonText } = useContext(DataContext);

    const onValueChange = (e) => {
        setJsonText(e.target.value);
    }

    return (
        <>
            <h1 className='mt-3 mb-3'>JSON</h1>
            <TextareaAutosize 
                minRows={3}
                maxRows={5}

                style={textareaStyle}
                onChange={(e) => onValueChange(e)}
            />
        </>
    )
}

export default CreateJsonText;