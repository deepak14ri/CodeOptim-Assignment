import { useEffect, useState } from "react";
import { handleError } from "../utils/handleError";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/my-details");
      setIsLoggedIn(true);
      setUserData(response.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoggedIn(false);
      }
      handleError(error);
    }
  };

  const carts = [
    { id: 1, product_name: "Potato", price: 10, quantity: 1 },
    { id: 2, product_name: "Tomato", price: 20, quantity: 2 },
    // Add more products as needed
  ];

  useEffect(() => {
    getUserDetails();
  }, []);

  // payment integration
  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51P9JtXSI16iFulDFz0UftGuCdtz5QRAOwUjckqfHKqdjgz8GceWlkUBmdoVlRUJLtEOO54vJvdU4kFa5NZeVJMZt00gSkrXG8I");

      const body = {
        products: carts
      };

      const headers = {
        "Content-Type": "application/json"
      };

      const response = await axios.post("http://localhost:4000/user/create-checkout-session", body, {
        headers: headers
      });

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.log(result.error);
      } else {
        toast.success("Payment Successful!");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div style={{margin:'10px', alignItems: 'center', }}>
      <span>{isLoggedIn ? `Login Username: ${userData.username}` : "You are not logged in"}</span>
      <br /> {/* Line break */}
      <button className="primary-btn" style={{marginTop:"10px"}} onClick={makePayment} type='button'>Checkout</button>
    </div>
  );
}
