import React from 'react';
import AppContext from '../context';

function useCart() {
	const { items, cartItems } = React.useContext(AppContext);
	const filteredItems = items.filter((item) => cartItems.findIndex((cartItem) => cartItem.uId === item.uId) !== -1);
	const totalPrice = filteredItems.reduce((acc, filteredItem) => acc + filteredItem.price, 0);
	const charge = Math.round(totalPrice * 5 / 100)

	return { filteredItems, totalPrice, charge }
}

export { useCart }