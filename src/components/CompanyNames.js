import React, { useEffect } from 'react';
import axios from 'axios';


    const fetchCompanyNames = async () => {
        const options = {
            method: 'GET',
            url: 'https://gaialens-company-names.p.rapidapi.com/companynames',
            headers: {
                'x-rapidapi-key': 'b6023dda95msh5551fee874c5d4ap14c30bjsn872f7a5c88f6',
                'x-rapidapi-host': 'gaialens-company-names.p.rapidapi.com',
                'Content-Type': 'text'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

export default fetchCompanyNames;