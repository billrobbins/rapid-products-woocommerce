import { useState, useEffect } from 'react';
import { listOptions } from './DataStore';

export const OptionList = () => {
    
    const [options, setOptions] = useState();

    useEffect(() => {
        const loadOptions = async () => {
            const response = await listOptions();
            setOptions(response);
        };
        loadOptions();
    })
    
    return (

    );
}