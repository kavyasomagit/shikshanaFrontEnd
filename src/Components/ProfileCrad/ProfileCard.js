import './ProfileCard.css'

export const ProfileCard = ({profile}) => {
    const {_id, Category, Name, Address, City, State, PinCode, ContactNumber, ContactMail, Course} = profile;

    return (
        <div className='d-felx align-center padding-bottom'>
            <div className="profilecard-container shadow cursor-pointer relative">
                <div className="starter">
                    <h1 className='padding-left'>{Name}</h1>
                    <p>{Course}</p>
                </div>
                <div className="profilecard-details">
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
                <div className="wishlist">
                    <button className="button btn-wishlist absolute">
                        <span className="material-icons favorite cursor">favorite</span>
                    </button>
                </div>
            </div>

        </div>
    )
}