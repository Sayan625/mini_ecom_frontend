import React from "react";

const CartItem = ({ cartItem, removeFromCart, addToCart }) => {
    return (
        <div className="d-flex w-100">

            {/* Image */}
            <div className="d-flex justify-content-center align-items-center gap-1 flex-grow-1 rounded-1 bg-white py-1 px-1 me-1">

                <img className=" me-2"
                    src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=300"
                    alt={cartItem.product.name}
                    style={{
                        width: 42,
                        height: 42,
                        objectFit: "cover",
                    }}
                />
                {/* Info */}
                <div className="flex-grow-1">
                    <div className="small fw-semibold text-truncate">
                        {cartItem.product.name}
                    </div>
                    <div className="small text-muted">
                        ₹{cartItem.product.price}
                    </div>
                </div>

                {/* Quantity */}
                <div className="d-flex align-items-center gap-1">
                    <button
                        className="btn btn-sm btn-outline-dark px-1 py-0"
                        onClick={() => addToCart(cartItem.product.id, -1)}
                    >
                        −
                    </button>

                    <span className="small px-1">
                        {cartItem.quantity}
                    </span>

                    <button
                        className="btn btn-sm btn-outline-dark px-1 py-0"
                        onClick={() => addToCart(cartItem.product.id, 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Remove */}
            <button
                className="btn btn-sm btn-link text-white text-decoration-none bg-danger"
                onClick={() => removeFromCart(cartItem.id)}
                title="Remove"
            >
                ✕
            </button>
        </div>
    );
};

export default CartItem;
