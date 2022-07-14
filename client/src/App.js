import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homescreen from "./Pages/Homescreen";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductScreen from "./Pages/ProductScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <main className="py-4">
            <Container>
        <Routes>
        <Route path="/" element={ <Homescreen/>  } />
        <Route path="/products/:id" element={ <ProductScreen/> } />
        </Routes>
            </Container>
          </main>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
