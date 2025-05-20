import React, { useEffect } from 'react';
import axios from 'axios';


    const fetchCompanyNames = async () => {
        const options = {
            method: 'GET',
            url: 'https://gaialens-company-names.p.rapidapi.com/companynames',
            headers: {
                'x-rapidapi-key': 'c891c10464mshb9caeab8511487dp10b501jsn2d14fb3b860bs',
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