import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

function DateFormatter(x) {
	var z = new Date(x);
	const timeAgo = new TimeAgo("en-US");
	return timeAgo.format(z);
}

export default DateFormatter;
