import { useState } from "react";
import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";

export const Cart = ({ cart, setCart, converprice, checkLists, setCheckLists, convertPrice}) => {
  
  const [total, setTotal] =useState(0);

  const handleQuantity = (type, id, quantity) => {
    const found =cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem ={
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    };

    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
    }else {
      if (quantity === 0) return;
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
    }
  };
  
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id))
    //장바구니 체크된 상품 삭제시 setCheckLists.filter 통해 체크리스트 목록에서도 삭제를 진행하는 코드
    setCheckLists(setCheckLists.filter((check) => check !== id));
  };

  const handleCheckList = (checked,id) => {
    if(checked) {
      setCheckLists([...checkLists, id])
    }else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };
  
  const handleAllcheck = (checked) => {
   if(checked) {
     const checkItems = [];
     cart.map((cart) => checkItems.push(cart.id));
     setCheckLists(checkItems)
   }else {
    setCheckLists([]);
   }       
  };
// 장바구니 모두체크 버튼 (전체선택)
  const isAllChecked = cart.length === checkLists.length && checkLists.length !== 0;
// 체크된 상품의 목록을 삭제시 (total결제금액)
// cart.filter 즉 cart담긴 목록에서 체크된 리스트를 found에 담는 방법
  const found = checkLists.map((checkList) =>
    cart.filter((el) => el.id === checkList)
  );

  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader handleAllcheck={handleAllcheck} isAllChecked={isAllChecked}/> 
      {cart.length ===0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아주세요!</p>
        </div>
      ) : ( 
        cart.map((cart) => {
          return <CartList 
                    key={`key-${cart.id}`} 
                    cart={cart} 
                    setCart={setCart} 
                    converprice={converprice} 
                    handleQuantity={handleQuantity}
                    handleRemove={handleRemove}
                    handleCheckList={handleCheckList}
                    checkLists={checkLists}
                    convertPrice={convertPrice}
                  />
        })
      )}
      <TotalCart 
        total={total}  
        setTotal={setTotal} 
        cart={cart} 
        found={found} 
        convertPrice={convertPrice}/>
    </>
  );
};
