import { Fragment, useContext, useEffect, useState } from 'react'
import { Navbar, ProfileCard } from '../../Components'
import '../WishListPage/WishListPage.css'
import { Context } from "../../App";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const WishListPage = () => {


    const [UserDetailsContext, setUserDetailsContext] = useContext(Context);  
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    const handleWishListClick = () => {
        navigate('/home');
    }

    useEffect( () => {
        (async () => {
            try {
                const {data} = await axios.get('https://shikshana.vercel.app/api/wishList', {params: {
                    "email":UserDetailsContext.ContactMail
                }})
                // console.log('wishhh',data);
                setProfiles(data)
            } catch (error) {
                console.log(error)
            }
        } )();
    }, [UserDetailsContext, profiles])

    return (
        <Fragment>
            <Navbar/>
            <h3 className='heading-wishlist-page'>WishListPage</h3>
            <main className='main'>
            {
                profiles.length>0 ? profiles.map((profile) => <ProfileCard key={profile._id} profile={profile}/>) : 
                <div>
                    <p>WishList is Empty</p>
                   <a onClick={handleWishListClick}><button>Add Profiles</button></a> 
                </div>
            }
            </main>
        </Fragment>
    )
}