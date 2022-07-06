import React from 'react';
import AppContext from '../../context';
import './Search.css'

function Search({ parentClass }) {
	const { setSearchInputText, searchInputText } = React.useContext(AppContext);

	return (
		<div className={`${parentClass} search`}>
			<img
				className="search__icon"
				src="img/search.svg"
				width="14"
				height="14"
			/>
			<input
				className="search__field"
				type="search" placeholder="Поиск"
				onChange={({ target }) => setSearchInputText(target.value)}
				value={searchInputText}
			/>
		</div>
	)
}

export default Search;