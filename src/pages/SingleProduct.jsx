import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../utils/api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function SingleProduct ({ handleAddToCart }) {
    const { productId } = useParams(); // Get productId from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        // console.log("Product Data:", data);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);
  
    if (loading) return <Loader />;
    if (error) return <div className="container text-danger">{error}</div>;
    if (!product) return <div className="container">Product not found.</div>
    
        return (
            <>
              
              <h1>{product.name}</h1>
              <div className="row">
                  <div className="col-md-6">
                  <img
                      src={product.images[0]?.src || "https://via.placeholder.com/300"}
                      alt={product.name}
                      className="img-fluid"
                  />
                  </div>
                  <div className="col-md-6">
                  <p><strong>Price:</strong> R{product.price}</p>
                  <div
                      dangerouslySetInnerHTML={{
                      __html: product.description || product.short_description,
                      }}
                  />
                  <p>
                      <strong>Category:</strong>{" "}
                      {product.categories?.map((cat) => cat.name).join(", ") || "N/A"}
                  </p>
                  <p><strong>Stock Status:</strong> {product.stock_status}</p>
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={ () => {handleAddToCart(product)}}>Add to Cart</button>
                    <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>
                            Back
                    </button>
                  </div>
                  
              
                  </div>
              </div>
            </>
        );
        }