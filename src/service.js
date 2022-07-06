import axios from 'axios';

class Service {
	constructor(host) {
		this._host = host;
	}

	getAllItems() {
		return axios.get(`${this._host}/items`)
	}

	getCartItems() {
		return axios.get(`${this._host}/cart`)
	}

	getFavItems() {
		return axios.get(`${this._host}/favorites`)
	}

	getOrderItems() {
		return axios.get(`${this._host}/orders`)
	}

	postCartItem(obj) {
		return axios.post(`${this._host}/cart`, obj)
	}

	postFavItem(obj) {
		return axios.post(`${this._host}/favorites`, obj)
	}

	postOrder(obj) {
		return axios.post(`${this._host}/orders`, obj)
	}

	deleteCartItem(id) {
		return axios.delete(`${this._host}/cart/${id}`)
	}

	deleteFavItem(id) {
		return axios.delete(`${this._host}/favorites/${id}`)
	}
}

export default Service