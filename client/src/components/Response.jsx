

import { Typography, Box, TextareaAutosize } from "@mui/material"

const textareaStyle = { 
    width: '100%', 
    padding: 10,  
    background: `url(http://i.imgur.com/2cOaJ.png)`,
    backgroundAttachment: 'local',
    backgroundRepeat: 'no-repeat',
    paddingLeft: 35,
    paddingTop: 10,
    border: '1px solid #bae6fd',
    height:'240px'

}

const Response = ({ data }) => {
    let obj = data;
    const jsonString = JSON.stringify(data, null, 2);
    
    let readableobj = '{ \n';
    for(let key in obj) {
        readableobj += '\t'
        readableobj += (typeof obj[key] === "string")? `${key}: "${obj[key]}"` : `${key}: ${obj[key]}`; 
        if (Object.keys(obj).pop() !== key.toString()) {
            readableobj += ',\n'
        }
    }
    readableobj += '\n}';

    return (
        <main className="mt-4">
            <h1 className="mb-3">Response</h1>
            <TextareaAutosize 
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                disabled="disabled"
                value={jsonString}
            />
        </main>
    )
}

export default Response;