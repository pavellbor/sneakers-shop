import Button from '../Button'
import './MessageBlock.css'

function MessageBlock({ parentClass, title, desc, imageUrl, onButtonClick }) {
	return (
		<div className={`${parentClass} message-block`}>
			<img className="message-block__image" src={imageUrl} width="120" height="120" />
			<h3 className="message-block__title">{title}</h3>
			<span className="message-block__desc">{desc}</span>
			<Button parentClass='message-block__button' text='Вернуться назад' onButtonClick={onButtonClick}/>
		</div>
	)
}

export default MessageBlock