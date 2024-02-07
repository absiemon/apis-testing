import { useContext, useState } from 'react';

import { TextField, Checkbox, TableCell, TableRow } from '@mui/material';
import { DataContext } from '../context/DataProvider';


const AddRow = ({ addRows, rowId, data, setData }) => {

    const { formData, paramData, setFormData} = useContext(DataContext);

    const [checkCheckbox, setCheckCheckbox] = useState(false);
    
    const handleChange = (e) => {
        
        let result = data.filter(entry => entry.id === Number(e.target.name))[0];

        result = {...result, check:!checkCheckbox}
        result.check = !checkCheckbox

        //storing parasm data in temp storage because state was updating late
        let newData = [...data]
        newData = newData.map((obj) => (obj.id === result.id ? result : obj));

        //updating Form data
        setFormData((prevData)=>{
            const {url, type}  = prevData;
            let newUrl = url.split('?')[0]
            let isAdded = false
            for (let obj of newData) {
                if(obj.check && isAdded){
                    obj?.key && (newUrl += '&' + (obj?.key || '') + '=' + (obj?.value || ''))
                }
                else if(obj.check){
                    obj?.key && (newUrl += '?' + (obj?.key || '') + '=' + (obj?.value || ''))
                    isAdded  = true
                }
            }
            return {url: newUrl, type:type}
        })


        
        if (!checkCheckbox) {
            setCheckCheckbox(true);
            if(rowId === newData.length){
                addRows(oldArr => [...oldArr, rowId]);
                result = { ...result, id: rowId, check: true }
            }
        } else {
            setCheckCheckbox(false);
            result = { ...result, id: rowId, check: false }
        }
        
        let index = data.findIndex((value) => value.id === Number(e.target.name));
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)    
        }
    }
    
    const onTextChange = (e) => {

        //Adding query param in the url in real time
        
        let result = data.filter(entry => entry.id === rowId)[0];
        result = { ...result, id: rowId, [e.target.name]: e.target.value }

        let index = data.findIndex((value) => value.id === rowId);

        //storing parasm data in temp storage because state was updating late
        let newData = [...data]
        newData = newData.map((obj) => (obj.id === result.id ? result : obj));
        
        //updating Params data
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)    
        }

        //updating Form data
        
        setFormData((prevData)=>{
            const {url, type}  = prevData;
            let newUrl = url.split('?')[0]
            let isAdded = false
            for (let obj of newData) {
                if(obj.check && isAdded){
                    obj?.key && (newUrl += '&' + (obj?.key || '') + '=' + (obj?.value || ''))
                }
                else if(obj.check){
                    obj?.key && (newUrl += '?' + (obj?.key || '') + '=' + (obj?.value || ''))
                    isAdded  = true
                }
            }
            return {url: newUrl, type:type}
        })

    }
    
    return (
        <TableRow>
            <TableCell >
                <Checkbox 
                    checked={checkCheckbox}
                    size='large' 
                    name={rowId}
                    onChange={(e) => handleChange(e)} />
            </TableCell>
            <TableCell >
                <TextField
                    inputProps={{ 
                        style: { 
                            height: 30, padding: '0 5px',
                            border:'1px solid #bae6fd',
                        } }
                    }
                    name="key"
                    onChange={(e) => onTextChange(e)}
                />
            </TableCell>
            <TableCell >
                <TextField
                     inputProps={{ 
                        style: { 
                            height: 30, padding: '0 5px',
                            border:'1px solid #bae6fd',
                        } }
                    }
                    name="value"
                    onChange={(e) => onTextChange(e)}
            /></TableCell>
        </TableRow>
    )
}

export default AddRow;