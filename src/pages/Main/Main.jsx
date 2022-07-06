import CardList from '../../components/CardList'
import Search from '../../components/Search';

import './Main.css';

function Main({ title, hasSearch, items }) {
	return (
		<main className="page-content">
			<h1 className="page-content__title">{title}</h1>
			{hasSearch && <Search parentClass='page-content__search' />}
			<CardList parentClass="page-content__list" items={items}/>
		</main>
	)
}

export default Main;