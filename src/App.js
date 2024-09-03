import { useState } from 'react';
import './App.css';
import React  from 'react';
import {Home, SingleProfilePage, SignInSignUpPage, WishListPage, ProfilePage} from './pages';
import { Route, Routes } from "react-router-dom";

export const Context = React.createContext();

function App() {

  
  const [UserDetailsContext, setUserDetailsContext] = useState({
    'accessToken': '',
    'ContactMail': '',
    'loginAs': '',
    'ContactNumber': '',
    'Name': '',
    '_id': ''
  })

  return (
    <Context.Provider value={[UserDetailsContext, setUserDetailsContext]}>
       <Routes>
      <Route path="/" element={<SignInSignUpPage />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/SingleProfile/:id" element={<SingleProfilePage/>} />
      <Route path="/wishlist" element={<WishListPage/>} />
      <Route path="/profile" element= {<ProfilePage/>}/>
    </Routes>
    </Context.Provider>
  );
}
export default App;