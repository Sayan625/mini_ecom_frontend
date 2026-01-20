import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

export default function HomePage() {
    const {
        products
    } = useSelector(state => state.product);

    console.log(products)
    return (
        <div className="container-fluid h-100 text-white p-0">

            {/* FEATURES */}
            <div className="container py-5">
                <div className="row g-3">
                    {[
                        {
                            title: "Fast Checkout",
                            desc: "Minimal steps, secure payments"
                        },
                        {
                            title: "Quality Products",
                            desc: "Carefully curated catalog"
                        },
                        {
                            title: "Admin Control",
                            desc: "Full order & product management"
                        }
                    ].map((item, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card bg-dark border-light h-100 p-3 rounded-0">
                                <h5 className="mb-2 text-white">{item.title}</h5>
                                <p className="text-white mb-0">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* POPULAR PRODUCTS PLACEHOLDER */}
            <div className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Popular Products</h4>
                    <a className="btn btn-sm btn-outline-light" href="/explore">
                        View All
                    </a>
                </div>

                <div className="row g-2">

                    {products && [1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="col-6 col-md-3">
                            <div className="card bg-dark border-light rounded-0 p-2">
                                <img
                                    src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="bg-secondary mb-2"
                                    style={{ height: 120 }}
                                />
                                <div className="fw-semibold text-white small">
                                    {products[index]?.name}
                                </div>
                                <div className="text-white small">
                                    ₹{products[index]?.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <div className="bg-dark border-top border-secondary py-3 text-white">
                <div className="container d-flex justify-content-between small">
                    <span>© 2026 Your Store</span>
                    <span>Built with React</span>
                </div>
            </div>

        </div>
    );
}
