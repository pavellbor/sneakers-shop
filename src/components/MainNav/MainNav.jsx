import React from 'react';
import {Link} from 'react-router-dom'

import AppContext from '../../context';

import './MainNav.css'

function MainNav({ parentClass, totalPrice }) {
	const { toggleDrawer } = React.useContext(AppContext);

	return (
		<nav className={`${parentClass} main-nav`}>
			<div className="main-nav__link" onClick={toggleDrawer}>
				<img className="main-nav__icon" src="img/cart.svg" width="20" height="19" />
				<span className="main-nav__text">{totalPrice} руб.</span>
			</div>
			<Link className="main-nav__link" to="favorites">
				<img className="main-nav__icon" src="img/fav.svg" width="20" height="19" />
			</Link>
			<Link className="main-nav__link" to="orders">
				<img className="main-nav__icon" src="img/user.svg" width="20" height="20" />
			</Link>
		</nav>
	)
}

export default MainNav;