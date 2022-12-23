import { Audio } from "react-loader-spinner";
import classes from "./Login.module.css";
import { login } from "../../API/loginAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // handle event after clicking on submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError(null);
            const response = await login({ email, password });
            const data = response.data?.data;
            setIsLoading(false);

            const { token, id } = data;
            token && navigate(`/users/${id}`, { state: { token, id } });
        } catch (error) {
            setError(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

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
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Audio height="18px" width="18px" color="#33ebeb" />
                </div>
            ) : (
                <button className={classes.btn}>Login</button>
            )}
            {error && <em>{error}</em>}
        </form>
    );
};

export default Login;
