import "./Card.css"

function Card({ parentClass = 'card-list__item', uId, title, price, imageUrl, isAddedtoFav, isAddedToCart, isCart, isLoading, onAddToCart, onAddToFav }) {
	const cartClass = isCart ? 'card--cart' : '';
	const favIconUrl = `img/btn-fav${isAddedtoFav ? '-active' : ''}.svg`;
	const addIconUrl = `img/btn-plus${isAddedToCart ? '-active' : ''}.svg`

	return !isLoading ? (
		<div className={`${parentClass} card ${cartClass}`}>
			<button className="card__button card__button--fav" onClick={() => onAddToFav(uId)}>
				<img className="card__button-icon" src={favIconUrl} width="32" height="32" />
			</button>
			<img className="card__image" src={imageUrl} width="133" height="112" />
			<span className="card__title">{title}</span>
			<div className="card__price-block">
				<span className="card__price-label">Цена:</span>
				<span className="card__price-value">{price} руб.</span>
			</div>
			{isCart ?
				<button className="card__button card__button--remove" onClick={() => onAddToCart(uId)}>
					<img className="card__button-icon" src='img/btn-remove.svg' width="32" height="32" />
				</button> :
				<button className="card__button card__button--cart" onClick={() => onAddToCart(uId)}>
					<img className="card__button-icon" src={addIconUrl} width="32" height="32" />
				</button>
			}
		</div>
	) : (
		<div className={`${parentClass} card card--loading`}>
			<div className="card__button card__button--fav">
			</div>
			<div className="card__image"></div>
			<span className="card__title"></span>
			<div className="card__price-block">
				<span className="card__price-label"></span>
				<span className="card__price-value"></span>
			</div>
			<div className="card__button card__button--cart">
			</div>
		</div>
	)
}

export default Card;