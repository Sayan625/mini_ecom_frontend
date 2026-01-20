import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../config";
import { updateUser } from "../store/authSlice"; // adjust path

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (user) setForm(user);
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API.user.update}/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Update failed");

            const updatedUser = await res.json();

            // ✅ update Redux state
            dispatch(updateUser(updatedUser));

            setEditing(false);
            alert("Profile updated");
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <p className="text-center text-white">Not logged in</p>;
    }

    return (
        <div className="container mt-4" style={{ maxWidth: 500 }}>
            <div className="card bg-dark text-white border-secondary p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">My Profile</h5>
                    {!editing && (
                        <button
                            className="btn btn-sm btn-outline-light"
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>

                {/* Name */}
                <div className="mb-2">
                    <label className="form-label text-start d-block small">Name</label>
                    <input
                        name="name"
                        className="form-control form-control-sm"
                        value={form.name || ""}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div className="mb-2">
                    <label className="form-label text-start d-block small">Email</label>
                    <input
                        className="form-control form-control-sm"
                        value={form.email || ""}
                        disabled
                    />
                </div>

                {/* Address */}
                <div className="mb-2">
                    <label className="form-label text-start d-block small">Address</label>
                    <input
                        name="address"
                        className="form-control form-control-sm"
                        value={form.address || ""}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="form-label text-start d-block small">Phone</label>
                    <input
                        name="phone"
                        className="form-control form-control-sm"
                        value={form.phone || ""}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                </div>

                {editing && (
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success btn-sm w-100"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-secondary btn-sm w-100"
                            onClick={() => {
                                setForm(user);
                                setEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
