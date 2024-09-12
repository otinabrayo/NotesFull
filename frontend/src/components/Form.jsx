import {useState, useEffect} from "react"
import api from '../api'
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator"


function Form({route, method}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {

        if (typeof window !== 'undefined') {
            // Access localStorage here
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
        }

        setLoading(true);
        e.preventDefault()
        try {
            const response = await api.post(route, {username, password})
            if (method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                alert("logged in")
                // navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form
