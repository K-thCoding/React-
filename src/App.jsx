import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import { useState } from "react";

function App() {
  const [product, setProducts] = useState([]);
  const [cart, setCart] =useState([]);
  const [checkLists, setCheckLists] = useState([]); // 카트에 담긴 상품 체크후 다른페이지 이동후에도 체크상태 유지를 위해  cart-> app 로 설정변경
  const convertPrice = (price) =>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } 


  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              product={product} 
              setProducts={setProducts} 
              convertPrice={convertPrice}
              />
              } 
            />
        <Route 
          path="/product/:id" 
          element={
          <Product 
            convertPrice={convertPrice} 
            cart={cart} 
            setCart={setCart}
            />
            } 
          />
        <Route 
          path="/cart"
          element={
            <Basket 
              cart= {cart} 
              setCart={setCart} 
              convertPrice={convertPrice} 
              checkLists={checkLists}
              setCheckLists={setCheckLists}
              />
              } 
            />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
