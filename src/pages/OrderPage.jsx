import { useState, useEffect } from "react";
import API from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
    const user = useSelector((state) => state.auth.user);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();
    async function fetchOrders() {
        if (!user?.token) {
            navigate("/");
            return;
        }



        try {
            const res = await fetch(API.order.get + `/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch orders");

            const data = await res.json();
            setOrders(data);
            console.log(data)
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        console.log(order)
        // setShowModal(true);
    };

    return (
        <div className="container-fluid h-100 text-white">
            <div className="row h-100">

                <div className="col-9 h-100">
                    <div className="card bg-dark border-light h-100 p-3 rounded-0">

                        <h4 className="mb-3 text-white">Orders</h4>
                        <div className="d-flex gap-2 mb-3">
                            {orders?.map((order, index) => (
                                <div key={index} className="card bg-dark text-white border-secondary px-3 py-2">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="fw-semibold small">Order #{order.id}</span>
                                        <span className=" ms-4 small">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold">₹{order.totalAmount}</span>
                                        <button
                                            className="btn btn-sm btn-outline-light px-2 py-0"
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-3 h-100">
                    <div className="card bg-dark border-light h-100 p-3 rounded-0">
                        <h4 className="mb-3 text-white">Details</h4>
                        {selectedOrder ? (
                            <>
                                <div className="d-flex justify-content-between mb-4 text-white">
                                    <span>ID: {selectedOrder.id} </span>
                                    <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                </div>
                                {selectedOrder?.items?.map((order, index) => (
                                    <div className="text-white">
                                        <div key={index} className="d-flex justify-content-between mb-2">
                                            <span>{order.product.name} x {order.quantity}</span>
                                            <span>₹{order.product.price * order.quantity}</span>
                                        </div>
                                        <hr className="border-light" />
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between fw-bold text-white">
                                    <span>Total:</span>
                                    <span>₹{selectedOrder?.totalAmount}</span>
                                </div>
                            </>
                        ) : <p>No Order Selected</p>}

                    </div>
                </div>
            </div>
        </div>
    );
}
