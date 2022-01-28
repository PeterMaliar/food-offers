import React from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartContextProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = React.useState<boolean>(false); 
  const showCartHandler = () => {setShowCart(true)};
  const hideCartHandler = () => {setShowCart(false)};

  return (
    <CartContextProvider>
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
      <Cart onClose={hideCartHandler} show={showCart} />
    </CartContextProvider>
  );
}

export default App;
