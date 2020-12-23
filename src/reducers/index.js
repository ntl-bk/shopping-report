import updateReportList from './report-list';

const reducer = (state, action) => {
	return {
		reportList: updateReportList(state, action),
	};
};

export default reducer;
