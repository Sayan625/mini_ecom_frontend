import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../config";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: ""
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("Register payload:", form);

        const res = await fetch(API.user.register, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        if (!res.ok) throw new Error("Failed to create user");
        //  await res.json();
        alert("registered successfully")
        navigate("/login");
        // console.log(data)
        // localStorage.setItem("user", JSON.stringify(data));
    };

    return (
        <div className="container d-flex pt-4 flex-column justify-content-center align-items-center">
            <div className="card p-2 mt-2" style={{ width: "400px" }}>
                <h4 className="mb-3 text-center">User Registration</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        className="form-control mb-3"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="phone"
                        placeholder="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className="form-control mb-3"
                        name="address"
                        value={form.address}
                        rows="2"
                        placeholder="address"
                        onChange={handleChange}
                        required
                    ></textarea>

                    <input
                        type="password"
                        className="form-control mb-3"
                        name="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        className="form-control  mb-3"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-dark w-100" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
