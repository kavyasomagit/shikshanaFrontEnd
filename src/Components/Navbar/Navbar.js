import "./Navbar.css";


export const Navbar = ({route}) => {

  return (
    <header className="heading d-flex align-center">
      <div>
      <h1 className="heading-1">
              <a className="link" href="/">Shikshana</a>
              <span className="book material-icons-outlined">menu_book</span>
          </h1>
      </div>
          
          <div className="form-container d-flex align-center cursor-pointer shadow">
              <span className="form-option">Search</span>
              <span className="search material-icons-outlined">search</span>
          </div>
      <nav className="d-flex align-center gap-large">
        <div className="nav d-flex align-center cursor-pointer">
        <span className="material-icons-outlined profile-option menu">menu</span>
        <span className="material-icons-outlined profile-option person">person_2</span>
        </div>
      </nav>
</header>
  );
};