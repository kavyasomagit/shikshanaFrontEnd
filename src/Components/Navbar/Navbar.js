import "./Navbar.css";
import { useEffect, useState,  useContext} from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../App";


export const Navbar = ({handleSearchQuery}) => {


  const [searchInput, setsearchInput ] = useState(""); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [UserDetailsContext, setUserDetailsContext] = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if UserDetailsContext is in local storage
    const storedUserDetails = localStorage.getItem('UserDetailsContext');
    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails);
      setUserDetailsContext(parsedUserDetails);
    }
  }, []);

  const handleInputText = (event) => {
    const newValue = event.target.value;
    setsearchInput(newValue);
    // handleSearchQuery(newValue);
};

const handleSearchClick = () => {
  handleSearchQuery(searchInput);
  
};

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

const handleSignOut = () => {
  console.log(localStorage.accessToken);
  // localStorage.removeItem('accessToken');
  localStorage.removeItem('UserDetailsContext');
  navigate('/');
};

const handleWishListRoute = () => {
  navigate('/wishlist')
}

const handleLogInPgae = () => {
  navigate('/');
}

const handleProfileRoute = () => {
  navigate('/profile');
}

const shouldShowSearch = location.pathname !== "/profile";

  return (
    <header className="heading d-flex align-center">
      <div>
      <h1 className="heading-1">
              <a className="link" href="/home">Shikshana</a>
              <span className="book material-icons-outlined">menu_book</span>
          </h1>
      </div>
          
          { shouldShowSearch && (
              <div className="form-container d-flex align-center cursor-pointer shadow">
              <input
                  type="text"
                  placeholder="Search..."
                  className="searchBox"
                  value={searchInput}
                  onChange={handleInputText}
              />
          
            {/* <span className="form-option">Search</span> */}
            <span className="search material-icons-outlined" onClick={handleSearchClick}>search</span>
        </div>
          )}
          
      <nav className="d-flex align-center gap-large">
        <div className="nav d-flex align-center cursor-pointer">
        <span className="material-icons-outlined profile-option menu" onClick={toggleDropdown}>menu</span>
        <span className="material-icons-outlined profile-option person" onClick={toggleDropdown}>person_2</span>
                    {dropdownVisible && (
                        <div className="dropdown">
                          {
                            UserDetailsContext.Name ?  <ul>
                            <li onClick={handleProfileRoute} className="profile-edit"><a>{UserDetailsContext.Name}</a>
                            <span className="edit material-icons-outlined" >edit</span></li>
                            <li onClick={handleWishListRoute}><a href="/wishlist">Wishlist</a></li>
                              <li onClick={handleSignOut}><a>Log Out</a></li>
                          </ul> :
                              <ul>
                              <li onClick={handleLogInPgae}><a>Log In/ Sign Up</a></li>
                            </ul>
                          }      
                        </div>
                    )}
        </div>
      </nav>
</header>
  );
};