import React from 'react';
import AppContext from '../../context';

import Card from '../Card'

import './CardList.css'

function CardList({ parentClass, items }) {
	const { cartItems, favItems, isLoaded, onAddToCart, onAddToFav, searchInputText } = React.useContext(AppContext);
	const isAddedToCart = (uId) => uId && cartItems.some((cartItem) => cartItem.uId === uId)
	const isAddedToFav = (uId) => uId && favItems.some((favItem) => favItem.uId === uId)

	return (
		<div className={`${parentClass} card-list`}>
			{
				(isLoaded ? items.filter((item) => item.title.toUpperCase().includes(searchInputText.toUpperCase())) : [...Array(10)]).map((item, index) => <Card
					key={index?.uId || index}
					isLoading={!isLoaded}
					isAddedToCart={isAddedToCart(item?.uId)}
					isAddedtoFav={isAddedToFav(item?.uId)}
					onAddToCart={onAddToCart}
					onAddToFav={onAddToFav}
					{...item}
				/>)
			}
		</div>
	)
}

export default CardList;