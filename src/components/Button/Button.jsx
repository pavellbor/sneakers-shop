import './Button.css'

function Button({ parentClass, text, isBack = true, onButtonClick, isDisabled }) {
	const backClass = isBack ? 'button--back' : '';
	const disabledClass = isDisabled ? 'button--disabled' : '';

	return (
		<button className={`${parentClass} button ${backClass} ${disabledClass}`} onClick={onButtonClick} disabled={isDisabled}>
			<span className="button__text">{text}</span>
			<img className="button__icon" src="img/arrow.svg" width="14" height="12" />
		</button>
	)
}

export default Button;