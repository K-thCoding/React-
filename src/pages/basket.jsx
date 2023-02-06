import { Cart } from "../components/cart/cart";

const Basket = ({ convertPrice, cart, setcart, checkLists, setcheckList}) => {
  return (
  <Cart 
    convertPrice={convertPrice}
    cart={cart} 
    setcart={setcart}
    checkLists={checkLists}
    setcheckList={setcheckList}
    />
  );
};

export default Basket;
