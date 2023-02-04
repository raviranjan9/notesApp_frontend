import './Navbar.css';
import {NavLink} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const name = localStorage.getItem('name');
    return(
        <div className="navbar">
           <h2 className="logo">Notes App </h2>
           <ul>
                {location.pathname === '/notes' && !localStorage.getItem('token') && <li> <NavLink to= "/login" style = {{textDecoration: 'none', color: 'white', fontSize:'1.8rem'
                }}> Login </NavLink> </li>}

                {localStorage.getItem('token') && (location.pathname === '/notes' || location.pathname === '/') && <li style = {{fontSize: '1.8rem', cursor: 'default', color:'white'}}> Welcome
                <span style={{fontWeight:'bold', marginLeft:'.3rem'}}>{"   " + name.substring(0, 1).toUpperCase() + name.substring(1, name.length)}</span> </li>}

                {(location.pathname === '/notes' || location.pathname ==="/") && localStorage.getItem('token') && localStorage.getItem('msg') !== "Token Expired" && <li> <NavLink to="/login" style = {{textDecoration: 'none', fontSize: '1.8rem', color: 'white'}} onClick = {()=> {localStorage.removeItem('token'); localStorage.removeItem('name'); localStorage.removeItem('msg'); location.replace("/")}}> Logout </NavLink> </li>}
            </ul>
        </div>
    );
};

export default Navbar;