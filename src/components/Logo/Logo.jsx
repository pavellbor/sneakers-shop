import { Link } from 'react-router-dom'

import './Logo.css';

function Logo({ parentClass }) {
	return (
		<Link className={`${parentClass} logo`} to="">
			<img className="logo__image" src="img/logo.png" width="40" height="40" />
			<span className="logo__title">Sneakers-Shop</span>
			<span className="logo__desc">Магазин брендовых кроссовок</span>
		</Link>
	)
}

export default Logo;