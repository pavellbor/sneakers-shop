import React from 'react';

import MessageBlock from '../MessageBlock';
import Button from '../Button';
import Card from '../Card'
import AppContext from '../../context';
import { useCart } from '../../hooks/useCart';
import { delay } from '../../utils';

import './Drawer.css'

function Drawer({ parentClass, isVisible }) {
	const { toggleDrawer, onAddToCart, cartItems, service, setCartItems } = React.useContext(AppContext)

	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null);

	const { filteredItems, totalPrice, charge } = useCart();

	const activeClass = isVisible ? 'drawer--active' : '';

	const onOrder = async () => {
		try {
			const { data } = await service.postOrder({ items: cartItems })
			setOrderId(data.id)
			setIsOrderComplete(true)
			setIsButtonDisabled(true)

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await service.deleteCartItem(item.id);
				await delay(100)
			}
			
			setCartItems([])
			setIsButtonDisabled(false)
		} catch (error) {
			alert('Не удалось выполнить действие')
			console.error(error)
		}
	}

	const onBackButtonClick = () => {
		setIsOrderComplete(false)
		toggleDrawer()
	}

	return (
		<div className={`${parentClass} drawer ${activeClass}`}>
			<div className="drawer__overlay"></div>
			<div className="drawer__body">
				<div className="drawer__header">
					<h2 className="drawer__title">Корзина</h2>
					<button className="drawer__close" onClick={toggleDrawer}>
						<img className="card__close-icon" src="img/btn-remove.svg" width="32" height="32" />
					</button>
				</div>
				{
					filteredItems.length > 0 ? (
						<div className="drawer__main">
							<div className="drawer__card-list">
								{
									filteredItems.map((item) =>
										<Card
											key={item.uId}
											parentClass='drawer__card-item'
											onAddToCart={onAddToCart}
											isCart
											{...item}
										/>
									)
								}
							</div>
							<div className="drawer__info-list">
								<div className="drawer__info-item">
									<span className="drawer__info-label">Итого:</span>
									<span className="drawer__info-separator"></span>
									<span className="drawer__info-value">{totalPrice} руб.</span>
								</div>
								<div className="drawer__info-item">
									<span className="drawer__info-label">Налог 5%:</span>
									<span className="drawer__info-separator"></span>
									<span className="drawer__info-value">{charge} руб.</span>
								</div>
							</div>
							<Button parentClass='drawer__button' text='Оформить заказ' isBack={false} onButtonClick={onOrder} isDisabled={isButtonDisabled}/>
						</div>
					) : (
						<MessageBlock
							parentClass='drawer__message'
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
							desc={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
							imageUrl={isOrderComplete ? 'img/order.jpg' : 'img/box.jpg'}
							onButtonClick={onBackButtonClick}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Drawer;