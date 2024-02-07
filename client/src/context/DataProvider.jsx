
import React, { useState, createContext } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    
    const [formData, setFormData] = useState({ 
        url: 'http://localhost:8000/v1/question', type: 'GET' 
    })

    const [jsonText, setJsonText] = useState('');
    const [paramData, setParamData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [loading, setLoading] = useState(false)

    return (
        <DataContext.Provider
            value={{
                formData,
                setFormData,
                jsonText,
                setJsonText,
                paramData,
                setParamData,
                headerData,
                setHeaderData,
                loading, setLoading
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;