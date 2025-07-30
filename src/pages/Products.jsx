import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../utils/api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Products({handleAddToCart}) {
    const [products, setProducts] = useState([]);;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts()
    },[]);

    const navigate = useNavigate()
    const singlePageRedirect = (productId) => navigate(`/product/${productId}`);

    if (loading) return <Loader />;
    if (error) return <div className="container text-danger">{error}</div>;
    if (!products) return <div className="container">Product not found.</div>

    return (
        <>
            
            <h1 className="my-4">Products</h1>
                <div className="row">
                    
                    {products.length > 0 && products.map((product) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                                <div className="card product-card">
                                    <img className="card-img-top" src={product.images[0]?.src} alt="Product Name" />
                                    <div className="card-body">
                                        <h5 
                                            className="card-title" 
                                            style={{cursor: "pointer"}}
                                            onClick={ () => singlePageRedirect(product.id) } 
                                        >
                                        {product.name}
                                        </h5>
                                        {!product.on_sale ? <p className="card-text">R{product.regular_price}</p> : 
                                        <div className="card-text">
                                            <span className="regular-price">R{product.regular_price}</span>
                                            <span className="sale-price">R{product.price}</span></div>
                                        }
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: product.short_description || product.description,
                                            }}
                                        />
                                        <p className="card-text">Category: {product?.categories.map( (category) => category.name).join(", ")}</p>
                                        <button onClick={() => handleAddToCart(product)} className="btn btn-primary">
                                        Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            
        </>
    )
}