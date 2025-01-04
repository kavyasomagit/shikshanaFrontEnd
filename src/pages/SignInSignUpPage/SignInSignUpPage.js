import { Fragment, useContext, useEffect, useState } from "react"
import '../SignInSignUpPage/SignInSignUpPage.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Context } from "../../App";

export const SignInSignUpPage = () => {
    const [activeTab, setActiveTab] = useState('Login');

    const renderContent = () => {
        if (activeTab === 'Login') {
            return <Login />;
        } else if (activeTab === 'SignUp') {
            return <SignUp setActiveTab={setActiveTab}/>;
        }
    };

    return (<Fragment>
        <div className="heading-1">
        <a className="link " href="/">Shikshana</a>
        </div>
        
        <div className="login-container">
        
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'Login' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Login')}
                >
                    Login
                </button>
                <button
                    className={`tab ${activeTab === 'SignUp' ? 'active' : ''}`}
                    onClick={() => setActiveTab('SignUp')}
                >
                   SignUp
                </button>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    </Fragment>)
}

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        loginAs:'',
        ContactMail: '',
        password: ''
    })
    const [error, setError] = useState('');

    const [UserDetailsContext, setUserDetailsContext] = useContext(Context);

    const handleChange = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(userDetails.loginAs == 'student'){
            try {
                const response = await axios.post(`https://shikshana.vercel.app/api/auth/login`,  {
                    ContactMail: userDetails.ContactMail,
                        password: userDetails.password
                    }
                )
                setUserDetailsContext(response.data)
                const accessToken = response.data.accessToken;
                // localStorage.setItem('accessToken', accessToken);
                localStorage.clear()
                localStorage.setItem('UserDetailsContext', JSON.stringify(response.data));
                navigate('/Home');   
            } catch (error) {
                console.error(error.response.data.message);
                setError(error.response.data.message)
            } 
        }else{
            try {
                const response = await axios.post(`https://shikshana.vercel.app/api/auth/login/faculty`,  {
                        ContactMail: userDetails.ContactMail,
                        password: userDetails.password
                    }
                )
                console.log(response.data)
                setUserDetailsContext(response.data)
                const accessToken = response.data.accessToken;
                // localStorage.setItem('accessToken', accessToken);
                localStorage.clear()
                localStorage.setItem('UserDetailsContext', JSON.stringify(response.data));
                navigate('/Home');   
            } catch (error) {
                console.error(error.response.data.message);
                setError(error.response.data.message)
            } 
        }
        
    }

    return (
        <div>
            <h2>Login Page</h2>
            <br/>
            <form className="login-wrapper" onSubmit={handleSubmit}>
            <label>
                    Login as:
                    <select name="loginAs" value={userDetails.loginAs} onChange={handleChange} required>
                    <option value="" disabled>Select user type</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" name="ContactMail" value={userDetails.ContactMail} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" value={userDetails.password} onChange={handleChange} required/>
                </label>
                <br/>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

const SignUp = ({setActiveTab}) => {
    const [formData, setFormData] = useState({
        loginAs: '',
        Name: '',
        ContactMail: '',
        ContactNumber: '',
        password: '',
        reenterPassword: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password != formData.reenterPassword){
            setError('Passwords do not match')
        }else{
            if(formData.loginAs == 'student'){
                try {
                    const response = await axios.post('https://shikshana.vercel.app/api/auth/register', formData);
                    console.log(response);
                    setActiveTab('Login');
                } catch (error) {
                    console.log(error);
                    setError(error.response.data.error)
                }
            }
            else{
                try {
                    const response = await axios.post('https://shikshana.vercel.app/api/profiles/addProfile', {
                        "loginAs" : formData.loginAs,
                        "password": formData.password,
                        "Name": formData.Name,
                        "ContactNumber": formData.ContactNumber,
                        "ContactMail": formData.ContactMail
                    })
                    console.log(response);
                    setActiveTab('Login');
                } catch (error) {
                    console.log(error)
                    setError(error.response.data.error)
                }
            } 
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    return (      
        <div>
            <h2> SignUp</h2>
            <form className="login-wrapper" onSubmit={handleSubmit}>
            <label>
                    SignUp as:
                    <select name="loginAs" value={formData.loginAs} onChange={handleChange} required>
                        <option value="" disabled>Select user type</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
            </label>
            <br/>
            <label>
                Username:
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required/>
            </label>
            <br/>
            <label>
                Email:
                <input type="email" name="ContactMail" value={formData.ContactMail} onChange={handleChange} required/>
            </label>
            <br/>
            <label>
                Phone Number:
                <input type="tel" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange}/>
                <span style={{ color: 'darkgray', fontSize: 'small' }}>(optional)</span>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            </label>
            <br/>
            <label>
                Re-enter Password:
                <input type="password" name="reenterPassword" value={formData.reenterPassword} onChange={handleChange} required/>
            </label>
            <br />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit">SignUp</button>
            </form>
        </div>
    )
}