import { Fragment, useContext, useEffect } from 'react'
import './WishList.css'
import { Context } from "../../App";
import axios from 'axios';

export const WishList = () => {

    const [UserDetailsContext, setUserDetailsContext] = useContext(Context);

    useEffect( () => {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:3500/api/wishList', {params: {
                    "email":UserDetailsContext.ContactMail
                }})
                console.log('wishhh',data);
            } catch (error) {
                console.log(error)
            }
        } )();
    }, [])



    return (
        <Fragment>
            <h1>WishList</h1>
        </Fragment>
    )
}