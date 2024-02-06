import { useState } from 'react';

import { Box, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';

import AddRow from './AddRow';

const CreateTable = ({ text, data, setData }) => {
    const [rows, addRows] = useState([0]);
    
    return (
        <main className='mt-6'>
            <p>{text}</p>
            <Table sx={{ minWidth: '100%', border: '1px solid rgba(224, 224, 224, 1)', marginY:'15px' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>KEY</TableCell>
                        <TableCell>VALUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, index) => {
                            return <AddRow 
                                addRows={addRows} 
                                rowId={index} 
                                key={index}
                                setData={setData}
                                data={data} 
                            />
                        })
                    }
                </TableBody>
            </Table>
        </main>
    )
}

export default CreateTable;