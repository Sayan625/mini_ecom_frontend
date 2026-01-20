import { useState } from "react";
import API from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";


export default function Login({ path = null,fetchCart }) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("Login payload:", form);
        const res = await fetch(API.user.login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        if (!res.ok) {
            alert("Failed to login")
            return;
        }
        const data = await res.json();
        dispatch(loginSuccess(data));
        await fetchCart();
        alert("successfully logged in")
        if (!path) navigate("/")
        else navigate(path);
        setLoading(false);


    };
    console.log(loading)

    return (
        <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
            <div className="card p-4" style={{ width: "350px" }}>
                <h4 className="text-center mb-3">🔐 Login</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {!loading ? "Login" : <span class="spinner-border text-primary" role="status">
                        </span>}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small>
                        Don’t have an account? <a href="/register">Register</a>
                    </small>
                </div>
            </div>
        </div>
    );
}
