import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrdersPage() {
    // mock example data
    const orders = [
        {
            id: 101,
            userEmail: "user1@gmail.com",
            totalAmount: 1299,
            paymentStatus: "PENDING",
            createdAt: "2026-01-18T12:30:00"
        },
        {
            id: 102,
            userEmail: "user2@gmail.com",
            totalAmount: 499,
            paymentStatus: "PAID",
            createdAt: "2026-01-18T14:10:00"
        }
    ];

    return (
        <div className="container-fluid p-4 text-white">
            <div className="card bg-dark border-light rounded-0 p-3">
                <h4 className="mb-3">Admin Orders</h4>

                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle">
                        <thead>
                            <tr>
                                <th>OrderId</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.userEmail}</td>
                                    <td>₹{order.totalAmount}</td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                order.paymentStatus === "PAID"
                                                    ? "bg-success"
                                                    : order.paymentStatus === "FAILED"
                                                    ? "bg-danger"
                                                    : "bg-warning"
                                            }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>

                                    <td style={{ width: 120 }}>
                                        <select
                                            className="form-select form-select-sm"
                                            defaultValue={order.paymentStatus}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="PAID">PAID</option>
                                        </select>
                                        <button className="mt-1" style={{ width: 120 }}>update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state example */}
                {/* <div className="text-center py-4 text-muted">
                    No orders found
                </div> */}
            </div>
        </div>
    );
}
