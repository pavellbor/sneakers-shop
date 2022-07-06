import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Main from './pages/Main';
import Drawer from './components/Drawer';
import Header from './components/Header';
import AppContext from './context';
import Service from './service';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favItems, setFavItems] = React.useState([]);
  const [ordersItems, setOrdersItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false)
  const [searchInputText, setSearchInputText] = React.useState('');

  const service = new Service('https://62bac0607bdbe01d528f0c93.mockapi.io')

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartItemsResponse, favoritesItemsResponse, ordersItemsResponse] = await Promise.all([
          service.getAllItems(),
          service.getCartItems(),
          service.getFavItems(),
          service.getOrderItems(),
        ])

        setIsLoaded(true)
        setItems(itemsResponse.data)
        setCartItems(cartItemsResponse.data)
        setFavItems(favoritesItemsResponse.data)
        setOrdersItems(ordersItemsResponse.data.reduce((acc, cur) => [...acc, ...cur?.items], []))

      } catch (error) {
        alert('Не удалось получить данные')
        console.error(error)
      }
    }

    fetchData();
  }, [])

  const onAddToCart = async (uId) => {
    const addedToCartItem = cartItems.find((item) => item.uId === uId)

    try {
      if (addedToCartItem) {
        await service.deleteCartItem(addedToCartItem.id)
        setCartItems((prev) => prev.filter((item) => item.uId !== uId))
      } else {
        const { data } = await service.postCartItem({ uId })
        setCartItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось выполнить действие')
      console.error(error)
    }
  }

  const onAddToFav = async (uId) => {
    const addedToFavItem = favItems.find((item) => item.uId === uId)

    try {
      if (addedToFavItem) {
        await service.deleteFavItem(addedToFavItem.id)
        setFavItems((prev) => prev.filter((cartItem) => cartItem.uId !== uId))
      } else {
        const { data } = await service.postFavItem({ uId })
        setFavItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось выполнить действие')
      console.error(error)
    }
  }

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev)
  }

  return (
    <AppContext.Provider value={{ service, items, cartItems, setCartItems, favItems, isLoaded, onAddToCart, onAddToFav, toggleDrawer, searchInputText, setSearchInputText, setOrdersItems }}>
      <Header />
      <Routes>
        <Route path="" element={<Main title='Все кроссовки' items={items} hasSearch />} exact />
        <Route path="favorites" element={<Main title='Мои закладки' items={items.filter((item) => favItems.findIndex((favItem) => favItem.uId === item.uId) !== -1)} />} exact />
        <Route path="orders" element={<Main title='Мои заказы' items={items.filter((item) => ordersItems.findIndex((ordersItem) => ordersItem.uId === item.uId) !== -1)} />} exact />
      </Routes>
      <Drawer isVisible={isDrawerVisible} />
    </AppContext.Provider >
  );
}

export default App;
