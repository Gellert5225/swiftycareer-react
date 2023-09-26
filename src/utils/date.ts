export const getTimeDiff = (date: number) => {
	const _MS_PER_HOUR = 1000 * 60 * 60;
	const now = Date.now();
	var secondDiff = Math.floor((now - date) / 1000);
	var minuteDiff = Math.floor(secondDiff / 60);
	var hourDiff = Math.floor((now - date) / _MS_PER_HOUR);
	var dayDiff = Math.floor(hourDiff / 24);
	var weekDiff = Math.floor(dayDiff / 7);
	var monthDiff = Math.floor(weekDiff / 4);
	var yearDiff = Math.floor(monthDiff / 12);

	if (secondDiff < 60)
		return 'Just Now';
	if (minuteDiff < 60)
		return String(minuteDiff) + ' min';
	if (hourDiff < 24)
		return String(hourDiff) + ' hour';
	if (dayDiff < 7)
		return String(dayDiff) + ' day';
	if (weekDiff < 4)
		return String(weekDiff) + ' week';
	if (monthDiff < 12)
		return String(monthDiff) + ' month';
	return String(yearDiff) + ' year';
}