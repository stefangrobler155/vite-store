import { useNavigate } from "react-router-dom";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts().then(setProducts)
    },[]);
    const navigate = useNavigate()
    const singlePageRedirect = (productId) => navigate(`/product/${productId}`);
    
    return (
        <>
        
        <div className="container">
            <h1 className="my-4">Products</h1>
            <div className="row">
                {console.log(products)}
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
                                    <p className="card-text">R{product.price}</p>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: product.short_description || product.description,
                                        }}
                                    />
                                    <p className="card-text">Category: {}</p>
                                    <button className="btn btn-primary">
                                    Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })} 
            </div>
        </div>
        </>
    )
}