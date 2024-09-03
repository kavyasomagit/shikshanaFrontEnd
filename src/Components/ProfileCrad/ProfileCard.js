import axios from 'axios';
import './ProfileCard.css'
import { useNavigate } from 'react-router-dom';
import {useContext, useState} from 'react'
import { Context } from "../../App";

export const ProfileCard = ({profile}) => {
    const {_id, Category, Name, Address, City, State, PinCode, ContactNumber, ContactMail, Course} = profile;
    // console.log(Course)
    //Object.keys(Course).map((key) => (console.log(key,Course[key].join(' '))))

    const navigate = useNavigate();

    const [UserDetailsContext, setUserDetailsContext] = useContext(Context);
    const [wishlistState, setwishlistState] = useState(false);

    const handleProfileCardClick = () => {
        navigate(`/SingleProfile/${_id}`);
    }

    const checkWishlistIconState = async () => {
        try {
            const {data} = await axios.get('http://localhost:3500/api/wishList/check',{params:{
                "profileId": _id,
                "email": UserDetailsContext.ContactMail
            }})
            setwishlistState(data.exists);
        } catch (error) {
            console.log(error)
        }
    }

    const handleWishlistIcon = async () => {
        setwishlistState(prevState => !prevState)
        if(!wishlistState){
            try {
                const response = await axios.post('http://localhost:3500/api/wishList',{
                    "profileId": _id,
                    "email": UserDetailsContext.ContactMail
                })
            } catch (error) {
                console.log(error)
            }
        }
        else{
            try {
                const response = await axios.delete('http://localhost:3500/api/wishList',{params:{
                    "profileId": _id,
                    "email": UserDetailsContext.ContactMail
                }})
            } catch (error) {
                console.log(error)
            }
        } 
    }
        checkWishlistIconState()
    
    

    return (
        <div className='d-felx align-center padding-bottom'>
            <div className="profilecard-container shadow cursor-pointer relative">
                <div onClick={handleProfileCardClick}>
                        <div className="starter">
                            <h3 className='padding-left'>{Name}</h3>
                        </div>
                        <div className="profilecard-details" >
                            <div className="d-flex align-center">
                            <span className="location">{Address},&nbsp;{City},&nbsp;{State},&nbsp;{PinCode}</span>
                            </div>
                            <div className="contact-details d-flex align-center">
                                <div>
                                    <p className="category">Ready to teach: {Category}</p>
                                    <p className="contact-details">Contact Details</p>
                                    <p className="contact-phone">{ContactNumber}</p>
                                    <p className="email-details">{ContactMail}</p>
                                </div>
                                <div>
                                    <span className="rating d-flex align-center">
                                        <span className="material-icons-outlined">star</span>
                                        <span>4.3</span>
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div className="wishlist" onClick={handleWishlistIcon}>
                    <button className="button btn-wishlist absolute">
                        <span className={`material-icons favorite cursor ${wishlistState ? "fav-selected" : ""
            }`}>favorite</span>
                    </button>
                </div>
            </div>
        </div>
    )
}