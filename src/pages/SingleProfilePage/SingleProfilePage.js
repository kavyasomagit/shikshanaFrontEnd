import {Navbar, ProfileDetails, RelatedCourses} from '../../Components'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../SingleProfilePage/SingleProfilePage.css'


export const SingleProfilePage = () => {

    const {id} = useParams();
    const [singleProfile, SetsingleProfile] = useState([])
    console.log(id)
    const [queryParameters_Nav, setQueryParameters_Nav] = useState({ });


   
    const handleSearchQuery = (searchText) => {
        setQueryParameters_Nav((prevParameters) => ({
            ...prevParameters,
            NameContains: searchText,
          }));
    }
   


    useEffect (() => {
        (async() => {
            try {
                const {data} = await axios.get(`https://shikshana.vercel.app/api/SingleProfile/${id}`)
                console.log(data)
                SetsingleProfile(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])


    return (<>
        <Navbar handleSearchQuery={handleSearchQuery}/>
        <h2 className='heading-single-profile'>Single Profile Page</h2>
        <div className='single-profile-layout'>
            <main className='Single-Profile'>
                <span>{singleProfile.Name}</span>
                <div>
                    <ProfileDetails singleProfile={singleProfile}/>
                </div>
                
            </main>
            <main className='Related-Courses'>
                    <RelatedCourses singleProfile={singleProfile} queryParameters_Nav={queryParameters_Nav}/>
            </main>    
        </div> 
    </>)
};