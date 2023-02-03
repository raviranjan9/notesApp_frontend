import './Login.css';
import { BASE_URL } from '../constants.js';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate();
    const[user, setUser] = useState({email: "", password: ""});
    let name, value;
    const handleInput = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({...user, [name]: value});
    };

    const postData = async (event) => {
        const {email, password} = user;
        try{
            event.preventDefault();
            const res = await axios.post(`${BASE_URL}/login`, {
                email: email, password: password
            });
            const {token, name} = res.data;
            if(token) {
                localStorage.setItem('token', token); 
                localStorage.setItem('name', name); 
                navigate("/notes");
            };
        }catch(err){
            if(err.response.status == 400) document.getElementById("email").innerText = "User does not exist";
            else if(err.response.status == 401) document.getElementById("password").innerText = "Incorrect Password";
        }
    };

    return(
        <div className="login">
            <div className="login-container"> 
                <form method="POST" onSubmit={postData}>
                    <div className="form-group">
                        <input type="email" placeholder="Enter Your Email" name="email" required value={user.email} onChange={handleInput} />
                        <p id="email"></p>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Enter Your Password" name="password" required value={user.password} onChange={handleInput} />
                        <p id="password"></p>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login"/>
                    </div>
                    <p>Create an account?</p><a onClick={() => navigate("/signup")}>Signup</a>
                </form>
            </div>
        </div>
    );
};

export default Login;
