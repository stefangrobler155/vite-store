import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function SingleProduct () {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(params);
    
    const redirectSinglePage = () => navigate('/cart/100')
    return (
        <>
            <div className="container my-5">
                <div className="row">
               
                <div className="col-md-6">
                    <div className="card">
                    <img className="card-img-top" src="product-image.jpg" alt="Product Name" />
                    </div>
                </div>
                
                <div className="col-md-6">
                    <h1 className="my-4">Product Name {id}</h1>
                    <div className="mb-4">
                    <p>This is a detailed description of the product. It might include features, specifications, and other important information.</p>
                    </div>
                    <div className="mb-4">
                    <h5>Price:</h5>
                    $99.99
                    </div>
                    <div className="mb-4">
                    <h5>Category: Category 1, Category 2</h5>
                    </div>
                    <button className="btn btn-primary mt-4" onClick={redirectSinglePage}>
                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
        </>
    )
}