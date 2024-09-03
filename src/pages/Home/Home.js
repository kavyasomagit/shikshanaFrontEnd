import { Fragment, useEffect, useState } from 'react';
import { Navbar } from  '../../Components'
import { ProfileCard } from '../../Components'
import {FilterBox} from '../../Components'
import axios from 'axios'

import './Home.css'

export const Home = () => {
    const [queryParameters, setQueryParameters] = useState({ Category: [] });
   
    const handleSearchQuery = (searchText) => {
       
        setQueryParameters((prevParameters) => ({
            ...prevParameters,
            NameContains: searchText,
          }));
    }

    const handleQueryParametersChange = (updatedParameters) => {
        setQueryParameters(updatedParameters); 
    };

    //console.log('Home.js',queryParameters);

    

    const params = new URLSearchParams();
    for (const key in queryParameters) {
        if (Array.isArray(queryParameters[key])) {
            queryParameters[key].forEach(value => params.append(key, value));
        } else {
            //console.log(key, queryParameters[key]);
            params.append(key, queryParameters[key]);
        }
    }

    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`http://localhost:3500/api/filter`, { params });
                setProfiles(data)
                //console.log(profiles)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [queryParameters])
    return (
        <Fragment>
        <Navbar handleSearchQuery={handleSearchQuery}/>
        <div className='mainpage'>
            <div className='filter'>
                <FilterBox onQueryParametersChange={handleQueryParametersChange}/>
            </div>
            
            <main className='main'>
            {
                profiles && profiles.map((profile) => <ProfileCard key={profile._id} profile={profile}/>)
            }
            </main>
        </div>
        
        </Fragment>
    )
}