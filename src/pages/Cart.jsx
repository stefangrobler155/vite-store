import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")))


  const navigate = useNavigate();
  const redirectToCheckout = () => {
    navigate('/checkout');
  }
  useEffect(() => {
    console.log(cartItems);
    
  }, [cartItems])
  const calcCartTotal = () => {
    return cartItems.reduce( (total, item) => {
      const price = item.price ? parseFloat(item.price) : 0
      return total + (price * item.quantity)
    }, 0).toFixed(2)
  }
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
            cartItems.length > 0 && cartItems.map((cartItem) => {
              return (
                <tr key={cartItem.id}>
                  <td><img src={cartItem?.images?.[0].src} alt={cartItem?.images?.[0].alt} style={{width: "50px"}} /></td>
                  <td>{cartItem.name}</td>
                  <td>R {(cartItem.quantity * cartItem.price).toFixed(2)} {cartItem.on_sale ? <span className="cart-regular-price"><br />R { (cartItem.regular_price * cartItem.quantity).toFixed(2) }</span> : null}</td>
                  <td>{cartItem.quantity}</td>
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
          <h3>Total: R {calcCartTotal()}</h3>
        </div>
        <div className="col text-end">
          
          <button className="btn btn-success" onClick={redirectToCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  
    
    <div id="empty-cart-message">
      {cartItems.length <= 0 && <p>Your cart is empty.</p>}
    </div>
  </div>
  
  );
}
