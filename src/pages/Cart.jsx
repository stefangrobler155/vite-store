import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  const redirectToCheckout = () => {
    navigate('/checkout');
  }
  useEffect(() => {
    setProducts( [
      
    ])
  },[])
  
  useEffect(() => {
    setProducts([{
      id: "1",
      image: "/no-entry.jpg",
      name: "Product 1",
      price: 20,
      quantity: 3,
    },{
      id: "2",
      image: "/no-entry.jpg",
      name: "Product 2",
      price: 80,
      quantity: 2,
    },{
      id: "3",
      image: "/no-entry.jpg",
      name: "Product 3",
      price: 60,
      quantity: 4,
    }])
  }, [])
  return (
   <div className="container">
    <h1 className="my-4">Cart</h1>
    <div id="cart-items">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.length > 0 && products.map((product) => {
              return (
                <tr key={product.id}>
                  <td><img src={product.image} alt="Product Name" style={{width: "50px"}} /></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    
                    <button className="btn btn-danger">Remove</button>
                  </td>
                </tr>
              )
              
            })
            
          }
          
          
        </tbody>
      </table>
      <div className="row align-items-center">
        <div className="col">
          <h3>Total: $50.00</h3>
        </div>
        <div className="col text-end">
          
          <button className="btn btn-success" onClick={redirectToCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  
    
    <div id="empty-cart-message">
      <p>Your cart is empty.</p>
    </div>
  </div>
  
  );
}
