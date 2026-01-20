const ProductCard = ({ product, onEdit, admin, addToCart }) => {


    return (
        <div className="card mb-2 shadow-sm rounded-0" style={{borderColor: product?.bgColor,borderStyle: "solid", borderWidth: "4px"}}>
            <div className="card-body p-2" >
                <div className="d-flex align-items-center gap-2">

                    {/* Product Image */}
                    <img
                        src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={product.name}
                        className="rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />

                    {/* Info */}
                    <div className="flex-grow-1 me-2">
                        <div className="d-flex justify-content-between">
                            <span className="fw-semibold small">{product.name}</span>
                            <span className="fw-semibold text-success small">
                                ₹{product.price}
                                
                            </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-1">
                            <div className="text-muted small">
                                {product.category?.name || "N/A"}
                            </div>
                            {product.featured && <span>🔖</span>}

                            {/* <span className="small">⭐ {product.rating ?? "4.5"}</span> */}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex flex-column gap-2">
                        {/* <button className="btn btn-outline-primary btn-sm py-0 px-2">
                            View
                        </button> */}
                        {admin ? (<button className="btn btn-outline-secondary btn-sm py-0 px-2"
                            onClick={() => onEdit(product)}
                        >
                            Edit
                        </button>) : (
                            <button className="btn btn-outline-secondary btn-sm py-0 px-2"
                                onClick={() => addToCart(product.id)}
                            >
                                Add
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductCard