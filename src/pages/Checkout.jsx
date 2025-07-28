import { useState } from "react";

export default function Checkout() {
  const [checkoutData, setCheckoutData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
  })
  // const handleCheckoutData = (formData) => {
  //   const firstname = formData.get("firstname")
  //   const lastname = formData.get("firstname")
  //   const adress = formData.get("adress")
  //   const city = formData.get("city")
  //   const state = formData.get("state")
  //   const postcode = formData.get("postcode")
  //   const country = formData.get("country")
  //   const email = formData.get("email")
  //   const phone = formData.get("phone")
  // }
  const handleOnChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setCheckoutData(
      (prevFormData) => (
        {
          ...prevFormData,
          [name]: value
        }
      )
    )
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(checkoutData);
    setCheckoutData({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
  })
  }
  return (
    <div className="container mt-5">
        <h1 className="mb-4">Checkout</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="firstname" className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                id="firstname"
                value={checkoutData.firstname}
                onChange={ handleOnChange }
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="lastname" className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                id="lastname"
                value={checkoutData.lastname}
                onChange={ handleOnChange }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="address" className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                value={checkoutData.address}
                onChange={ handleOnChange }
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                name="city"
                id="city"
                value={checkoutData.city}
                onChange={ handleOnChange }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="state" className="form-label">State:</label>
              <input
                type="text"
                className="form-control"
                name="state"
                id="state"
                value={checkoutData.state}
                onChange={ handleOnChange }
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="postcode" className="form-label">Postcode:</label>
              <input
                type="text"
                className="form-control"
                name="postcode"
                id="postcode"
                value={checkoutData.postcode}
                onChange={ handleOnChange }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="country" className="form-label">Country:</label>
              <input
                type="text"
                className="form-control"
                name="country"
                id="country"
                value={checkoutData.country}
                onChange={ handleOnChange }
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={checkoutData.email}
                onChange={ handleOnChange }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                value={checkoutData.phone}
                onChange={ handleOnChange }
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
  
  );
}