import React from 'react';
import { useCart } from '../../hooks/useCart';
import Logo from '../Logo';
import MainNav from '../MainNav';
import './Header.css';

function Header() {
	const { totalPrice } = useCart()

	return (
		<header className="page-header">
			<Logo parentClass='page-header__logo' />
			<MainNav parentClass='page-header__nav' totalPrice={totalPrice} />
		</header>
	)
}

export default Header;