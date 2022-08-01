import { Container } from "react-bootstrap";
import { CartScreen } from "./Pages/CartScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homescreen from "./Pages/Homescreen";
import ProductScreen from "./Pages/ProductScreen";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScreen from "./Pages/RegisterScreen";
import ProfileScreen from "./Pages/ProfileScreeen";
import ShippingScreen from "./Pages/ShippingScreen";
import PaymentScreeen from "./Pages/PaymentScreen";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderScreen from "./Pages/OrderScreen";
import UserListScreen from "./Pages/UserListScreen";
import UserEditScreen from "./Pages/UserEditScreen";
import ProductListScreen from "./Pages/ProductListScreen";
import ProductEditScreen from "./Pages/ProductEditScreen";
import OrderListScreen from "./Pages/OrderListScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <main className="py-4">
            <Container>
        <Routes>
        <Route path="/order/:id" element={ <OrderScreen/> } />
        <Route path="/shipping" element={ <ShippingScreen/> } />
        <Route path="/placeorder" element={ <PlaceOrderScreen/> } />
        <Route path="/payment" element={ <PaymentScreeen /> } />
        <Route path="/login" element={ <LoginScreen/> } />
        <Route path="/register" element={ <RegisterScreen/> } />
        <Route path="/profile" element={ <ProfileScreen/> } />
        <Route path="/product/:id" element={ <ProductScreen/> } />
        <Route path="/cart/:id" element={ <CartScreen/> } />
        <Route path="/admin/userlist" element={<UserListScreen/> } />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/> } />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/> } />
        <Route path="/admin/productlist" element={<ProductListScreen/>} />
        <Route path="/admin/oderlist" element={<OrderListScreen/>} />
        <Route path="/" element={ <Homescreen/>  } />
        </Routes>
          <Footer />
            </Container>
          </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
