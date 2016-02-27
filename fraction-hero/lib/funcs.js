function format_time_long(ms) {

	var opt_days = "", opt_hours = "";

	if (ms > 86400000) {
		opt_days = Math.floor(ms / 86400000) + "/";
	} if (ms > 3600000) {
		opt_hours = _.padStart("" + Math.floor((ms % 86400000) / 3600000), 2, "0") + ":";
	}

	var minutes = _.padStart("" + Math.floor((ms % 3600000) / 60000), 2, "0") + "'";
	var seconds = _.padStart("" + Math.floor((ms % 60000) / 1000), 2, "0") + '"';
	var cs = _.padStart("" + Math.floor((ms % 1000) / 10), 2, "0");

	return opt_days + opt_hours + minutes + seconds + cs;

}


function interp_clamp(v, start, end, f_start, f_end) {
	/*
		a linear function that clamps function return values
		between min and max and then interpolates outputs between
		f_start and f_end.
	*/
	if (v < start && end > start || v > start && end < start) return f_start;
	if (v > end && end > start || v < end && end < start) return f_end;
	else return f_start + ((f_end - f_start) * (v - start) / (end - start));
}
