import classes from "./Login.module.css";
import { login } from "../../API/loginAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login({ email, password });
        const data = response.data?.data;
        const { token, id } = data;
        console.log(token, id, "!!!")
        token && navigate(`/users/${id}`, { state: { token, id } })

    }

    return (
        <form onSubmit={handleSubmit} className={classes.login}>
            <h4>Welcome to Cubii</h4>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button className={classes.btn}>Login</button>
        </form>
    )
}

export default Login
