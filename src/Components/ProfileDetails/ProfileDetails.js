import { Fragment } from 'react';
import '../ProfileDetails/ProfileDetails.css'

export const ProfileDetails = ({singleProfile}) => {

    const {_id, Category, Name, Address, City, State, PinCode, ContactNumber, ContactMail, Course = []} = singleProfile;
    // console.log(_id, Category, Name, Address, City, State, PinCode, ContactNumber, ContactMail, Course)

    return <Fragment>
        <div className='profile-details-container'>
            <div className='faculty-details'>
                <p className="p d-flex align-center gap">
                <span className="apps material-icons-outlined">apps</span> Faculty details
                </p>
                <p>Teaching Faculty Name: {Name}</p>
                <span className='span'>Teaching is done: {Category}</span>
            </div>
            <div className='Key-features faculty-details'>
                <p className="p d-flex align-center gap">
                    <span className="apps material-icons-outlined">apps</span> Location
                </p>
                <span>{Address}- {City}- {State}- {PinCode}</span>
            </div>

            <div className='Contact-details faculty-details'>
            <p className="p d-flex align-center gap">
                <span className="apps material-icons-outlined">apps</span> Contact details
            </p>
            <span>Number: {ContactNumber} </span>
            <br/>
            <span>Mail: {ContactMail}</span>
            </div>

            <div className='Courses details faculty-details'>
            <p className="p d-flex align-center gap"><span className="apps material-icons-outlined">apps</span> Courses</p>
                {Course.map((course, index) => (
                    <p key={index}>Class: {course.Class}, Subject: {course.Subject}</p>
                ))}
            </div>
        </div>
    </Fragment>
}