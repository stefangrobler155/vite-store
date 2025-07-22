export default function Checkout() {
  const handleCheckout = () => {
    console.log('Checkout process initiated');
    // Here you would typically handle the checkout logic, e.g., redirecting to a payment gateway
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Thank you for your order! Please review your cart and proceed to payment.</p>
      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
}