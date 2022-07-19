import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homescreen from "./Pages/Homescreen";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductScreen from "./Pages/ProductScreen";
import { CartScreen } from "./Pages/CartScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <main className="py-4">
            <Container>
        <Routes>
        <Route path="/" element={ <Homescreen/>  } />
        <Route path="/product/:id" element={ <ProductScreen/> } />
        <Route path="/cart/:id" element={ <CartScreen/> } />
        </Routes>
            </Container>
          </main>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
