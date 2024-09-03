import { Fragment, useState, useContext, useEffect } from 'react';
import './ProfilePage.css';
import { Navbar } from '../../Components';
import { Context } from "../../App";
import axios from 'axios';

export const ProfilePage = () => {

    const [activeTab, setActiveTab] = useState('personalDetails');
    const [UserDetailsContext, setUserDetailsContext] = useContext(Context);
    

    useEffect(() => {
        if (UserDetailsContext && UserDetailsContext.ContactMail) {
        (async () => {
            try {
                const {data} = await axios.postt('http://localhost:3500/api/auth/find/faculty/details',  {
                    ContactMail: UserDetailsContext.ContactMail
                })
                console.log(data);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ...data
                }));
                console.log(formData)
            } catch (error) {
                console.log(error)
            }
        })();
    }
    },[UserDetailsContext])

    const [formData, setFormData] = useState({
        ContactNumber: UserDetailsContext.ContactNumber,
        Address: '',
        City: '',
        State: '',
        PinCode: '',
    });

    useEffect(() => {
        // Check if UserDetailsContext is in local storage
        const storedUserDetails = localStorage.getItem('UserDetailsContext');
        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);
          setUserDetailsContext(parsedUserDetails);
        }
        
      }, []);
    console.log(UserDetailsContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:3500/api/auth/login/faculty',  {
                ContactMail: UserDetailsContext.ContactMail,
                ...formData
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'personalDetails':
                return (
                    <div className="tab-content">
                        <label>
                            UserName:
                            <input type="text" name="Name" value={UserDetailsContext.Name} disabled/>
                        </label>
                        <label>
                            Email:
                            <input type="email" name="ContactMail" value={UserDetailsContext.ContactMail} disabled />
                        </label>
                        <label>
                            Phone Number:
                            <input type="tel" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="Address" value={formData.Address} onChange={handleChange}/>
                        </label>
                        <label>
                            City:
                            <input type="text" name="City" value={formData.City} onChange={handleChange}/>
                        </label>
                        <label>
                            State:
                            <input type="text" name="State" value={formData.State} onChange={handleChange}/>
                        </label>
                        <label>
                            PinCode:
                            <input type="text" name="PinCode" value={formData.PinCode} onChange={handleChange}/>
                        </label>
                        <button className="Updatebutton" onClick={handleUpdate}>Update</button>
                    </div>
                );
            case 'coursesOffered':
                return (
                    <div className="tab-content">
                        <label>
                            Classes:
                            <input type="text" name="classes" />
                        </label>
                        <label>
                            Subject:
                            <input type="text" name="subject" />
                        </label>
                        <button className="Updatebutton" onClick={handleUpdate}>Update</button>
                    </div>
                );
            case 'aboutYourself':
                return (
                    <div className="tab-content">
                        <label>
                            Tell us about yourself:
                            <textarea name="aboutYourself"></textarea>
                        </label>
                        <button className="Updatebutton" onClick={handleUpdate}>Update</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (<Fragment>
        <Navbar/>
        <div className="profile-page">
                <div className="secondary-navbar">
                    <ul className="secondary-navbar-list">
                    <li className={`secondary-navbar-item ${activeTab === 'personalDetails' ? 'active' : ''}`} onClick={() => setActiveTab('personalDetails')}>Personal Details</li>
                    <li className={`secondary-navbar-item ${activeTab === 'coursesOffered' ? 'active' : ''}`} onClick={() => setActiveTab('coursesOffered')}>Courses Offered</li>
                    <li className={`secondary-navbar-item ${activeTab === 'aboutYourself' ? 'active' : ''}`} onClick={() => setActiveTab('aboutYourself')}>About Yourself</li>
                    </ul>
                </div>
                <div className="profile-content">
                {renderContent()}
                </div>
            </div>
    </Fragment>)
}