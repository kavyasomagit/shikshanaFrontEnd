import { Fragment, useEffect, useState } from 'react';
import { Navbar } from  '../../Components'
import { ProfileCard } from '../../Components'
import {FilterBox} from '../../Components'
import axios from 'axios';

import './Home.css'

export const Home = () => {

    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get("http://localhost:3500/api/profiledata");
                setProfiles(data)
                console.log(profiles)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])
    return (
        <Fragment>
        <Navbar/>
        <div className="home-container">
            <p className='filter'>
            <FilterBox/>
            </p>
            <main className='main'>
                {
                    profiles && profiles.map((profile) => <ProfileCard key={profile._id} profile={profile}/>)
                }
            </main>
        </div>
        
        
        </Fragment>
    )
}