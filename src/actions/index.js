const itemAdded = (item) => {
	return {
		type: 'ADD_ITEM',
		payload: item,
	};
};

const itemsDelete = (item) => {
	return {
		type: 'CLEAN_ITEMS',
		payload: item,
	};
};

const addItem = (dispatch) => (item) => {
	console.log(item);
	dispatch(itemAdded(item));
};

const deleteItems = (dispatch) => (item) => {
	dispatch(itemsDelete(item));
};

export { deleteItems, addItem };
