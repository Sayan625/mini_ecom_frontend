import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import API from "../config";
import ProductCard from "../component/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../component/Pagination";
import { updateProduct, setPage } from "../store/productSlice";


export default function AddProduct({ fetchProducts }) {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const {
        products,
        page
    } = useSelector(state => state.product);

    const [formData, setFormData] = useState({
        name: "",
        stock: 0,
        price: 0,
        bgColor: "",
        featured: false,
        category: {},
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    async function fetchCategory() {
        try {
            const res = await fetch(API.category.get);
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setCategory(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [page]);

    function resetForm() {
        setFormData({
            name: "",
            stock: 0,
            price: 0,
            bgColor: "",
            featured: false,
            category: {},
            description: ""
        });
        setEditingProductId(null);
        setOriginalData(null);
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleCategoryChange(e) {
        setFormData({
            ...formData,
            category: {
                id: Number(e.target.value)
            }
        });
    }

    function handleCheckboxChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            return;
        }
        setLoading(true);
        if (
            editingProductId &&
            JSON.stringify(formData) === JSON.stringify(originalData)
        ) {
            alert("No update made");
            setLoading(false);
            return;
        }

        const isEdit = Boolean(editingProductId);

        const url = isEdit
            ? `${API.products.update}/${editingProductId}`
            : API.products.create;

        const method = isEdit ? "PUT" : "POST";

        try {

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to submit");

            const data = await res.json();

            if (isEdit) {
                dispatch(updateProduct(data));
            } else {
                await fetchProducts();
            }

            alert(isEdit ? "Product updated!" : "Product created!");
            resetForm();
        } catch (err) {
            console.error(err);
            alert("Error submitting form");
        } finally {
            setLoading(false);
        }
    }

    async function addCategory() {
        setLoading(true);
        console.log(user?.token)
        console.log(newCategory)
        try {
            const res = await fetch(API.category.create, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    name: newCategory
                })
            });

            if (!res.ok) throw new Error("Failed to submit");

            await res.json();
            await fetchCategory();
            alert("category added successfully");
            setNewCategory("");

        } catch (error) {

        }

        setLoading(false);


    }

    function handleEdit(p) {

        setFormData({
            name: p.name,
            stock: p.stock,
            price: p.price,
            bgColor: p.bgColor,
            featured: p.featured,
            category: { id: p.category.id },
            description: p.description
        });
        setOriginalData({
            name: p.name,
            stock: p.stock,
            price: p.price,
            bgColor: p.bgColor,
            featured: p.featured,
            category: { id: p.category.id },
            description: p.description
        });
        setEditingProductId(p.id);
    }


    return (
        <div className="container-fluid h-100">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <div className="row h-100">
                {/* Left form */}
                <div className="col-5 h-100">
                    <div className="card h-100 border rounded-0 border-white bg-dark overflow-y-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="d-flex flex-column gap-2 p-4   text-start"
                        >
                            <h4 className="mb-3 text-white">Add Product</h4>

                            <label className="form-label text-white">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                
                            />

                            <label className="form-label text-white">Description</label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="2"
                            />

                            <div className="d-flex gap-2">
                                <div className="flex-fill">
                                    <label className="form-label text-white">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        placeholder="Stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="flex-fill">
                                    <label className="form-label text-white">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between gap-2">
                                <div className="">
                                    <label className="form-check-label text-white">
                                        Featured
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleCheckboxChange}
                                        className="form-control form-check-input"
                                    />
                                </div>

                                <div className="d-flex flex-column">
                                    <label className="form-label text-white" >BG Color</label>
                                    <input

                                        type="color"
                                        name="bgColor"
                                        value={formData.bgColor}
                                        onChange={handleChange}
                                        className="form-control form-control-color flex-grow-1 w-100"
                                        style={{ height: "30px" }}
                                    />
                                </div>
                            </div>

                            <label className="form-label text-white">Category</label>
                            <select
                                name="category"
                                value={formData.category.id || ""}
                                onChange={handleCategoryChange}
                                className="form-select"
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {category.map((item, index) => (

                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}

                            </select>

                            <div className="d-flex gap-2 mt-2">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Add new category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-light px-3"
                                    onClick={() => addCategory()}
                                // disabled={addingCategory || !newCategory.trim()}
                                >
                                    Add
                                </button>
                            </div>

                            {editingProductId ? (
                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-warning w-100"
                                        disabled={loading}
                                    >
                                        Update
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                <div className="col-7 h-100">
                    <div className="card h-100 border border-white bg-dark rounded-0  p-2 pb-0 d-flex flex-column">
                        <h5 className="text-white mb-2">Products</h5>
                        <div className="mb-2">
                            {/* <input
                                type="text"
                                placeholder="Search by product name"
                                className="form-control mb-2"
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Search by category"
                                className="form-control"
                            // value={categoryFilter}
                            // onChange={(e) => setCategoryFilter(e.target.value)}
                            /> */}
                        </div>
                        {products.length === 0 ? (
                            <p className="text-white">No products found.</p>
                        ) : (
                            <div className="flex-grow-1 overflow-y-auto overflow-x-hidden">
                                <div className="row g-1">
                                    {products.map(p => (
                                        <div key={p.id} className="col-12 col-md-6">
                                            <ProductCard
                                                product={p}
                                                admin={true}
                                                onEdit={handleEdit}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-2">
                            <Pagination slice="product" setPageAction={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
