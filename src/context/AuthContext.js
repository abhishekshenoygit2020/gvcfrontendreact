import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationStore from "../utils/localStorageUtil";
// import axios from "../api/axios";
// const LOGOUT_URL = './auth/logout';

export const AuthContext = createContext({
  user: null,
  login: (user) => { },
  logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [user_type, setUserType] = useState('');
  const [sidebarItemIndex, setSidebarItemIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_email, setUser_email] = useState('');
  const [cart, setCart] = useState([]);
  // const [student_id,setStudent_id] = useState('');
  const [trackId, setTrackId] = useState(0);
  const navigate = useNavigate();
  const url = "http://localhost:3006";


  const AddToCart = (productData) => {
    // Assuming cart is an array; make sure it's initialized as an array before using this function
    if (!Array.isArray(cart)) {
      console.error('cart is not an array');
      return;
    }

    // Create a copy of the cart array and add the new product
    let updatedCart = [...cart];

    // Check if the product is already in the cart
    const productIndex = updatedCart.findIndex((element) => element.id === productData.id);

    if (productIndex !== -1) {
      // Update the quantity of the existing product

      updatedCart[productIndex].quantity += productData.quantity;
      updatedCart[productIndex].total += productData.total;

    } else {
      // Add the new product to the cart
      updatedCart.push(productData);
    }

    // Update the cart state with the updated cart
    setCart(updatedCart);

    ApplicationStore().setStorage('cart', updatedCart);
  };

  const removeToCart = (productData) => {
    // Assuming cart is an array; make sure it's initialized as an array before using this function
    if (!Array.isArray(cart)) {
      console.error('cart is not an array');
      return;
    }

    // Create a copy of the cart array
    let updatedCart = [...cart];

    // Check if the product is already in the cart
    const productIndex = updatedCart.findIndex((element) => element.id === productData.id);

    if (productIndex !== -1) {
      // Remove the product from the cart
      updatedCart.splice(productIndex, 1);
    } else {
      // Add the new product to the cart
      updatedCart.push(productData);
    }

    // Update the cart state with the updated cart
    setCart(updatedCart);

    // Update the cart in the application store
    ApplicationStore().setStorage('cart', updatedCart);
  };







  const getCart = () => {
    console.log(cart);
  }


  const Login = userData => {
    console.log(userData);
    setUserType(userData.user_type);
    setUser_email(userData.user_email);

    ApplicationStore().setStorage('token', userData.userToken);
    ApplicationStore().setStorage('user_type', userData.user_type);
    ApplicationStore().setStorage('user_email', userData.user_email);
    ApplicationStore().setStorage('sideBarIndex', 0);
    ApplicationStore().setStorage('dealership', userData.dealership);
    ApplicationStore().setStorage('omvic_no', userData.omvic_no);
    ApplicationStore().setStorage('userName', userData.userName);
    ApplicationStore().setStorage('accovmicno', userData.accovmicno);
    ApplicationStore().setStorage('salesrep', userData.salesrep);
    ApplicationStore().setStorage('commission', userData.commission);

    // setStudent_id(userData.student_id);
    setLoggedIn(true);
  }

  const Logout = async () => {
    const data = { user_email: user };
    // const response = await axios.post(LOGOUT_URL,data,
    //   {
    //     headers: {'Content-Type':'application/json' }                    
    //   }
    // ); 
    console.log("loggd out");
    ApplicationStore().removeStorage('token');
    ApplicationStore().removeStorage('user_type');
    ApplicationStore().removeStorage('user_email');
    ApplicationStore().removeStorage('dealership');
    ApplicationStore().removeStorage('omvic_no');
    ApplicationStore().removeStorage('accovmicno');
    ApplicationStore().removeStorage('userName');
    ApplicationStore().removeStorage('salesrep');
    ApplicationStore().removeStorage('commission');

    setUser(null);
    setLoggedIn(false);
    navigate("/Login");
  }

  return (
    <AuthContext.Provider value={{ user, Login, user_type, loggedIn, Logout, user_email, AddToCart, getCart, removeToCart, url, trackId,sidebarItemIndex,setSidebarItemIndex }}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuthContext() {
  const { user, Login, user_type, loggedIn, Logout, user_email, cart, AddToCart, getCart, removeToCart, url, trackId , sidebarItemIndex,setSidebarItemIndex} = useContext(AuthContext);
  return { user, Login, user_type, loggedIn, Logout, user_email, cart, AddToCart, getCart, removeToCart, url, trackId ,sidebarItemIndex,setSidebarItemIndex};
}










