const updateReportList = (state, action) => {
	if (state === undefined) {
		return {
			items: [],
		};
	}
	if (!action.payload) {
		action.payload = [];
	}
	switch (action.type) {
		case 'ADD_ITEM':
			const itemIndexForAdd = state.reportList.items.findIndex(
				(item) => item.date === action.payload.date
			);
			if (itemIndexForAdd !== -1) {
				state.reportList.items[itemIndexForAdd].data.push(action.payload.data);
				return {
					items: [...state.reportList.items],
				};
			}
			const newItem = {
				date: action.payload.date,
				data: [{ ...action.payload.data }],
			};
			return {
				items: [...state.reportList.items, newItem],
			};

		case 'CLEAN_ITEMS':
			const itemIndexForDelete = state.reportList.items.findIndex(
				(item) => item.date === action.payload
			);
			return {
				items: [
					...state.reportList.items.slice(0, itemIndexForDelete),
					...state.reportList.items.slice(itemIndexForDelete + 1),
				],
			};
		default:
			return state.reportList;
	}
};

export default updateReportList;
