$('button').on('click', () => {
	const oldurl = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a5674541-0175-47bf-a8ac-0f8c6edd37a1"; // eslint-disable-line max-len
	$.get(oldurl, data => {
		$("#data").html(data);
		console.log(data.result.results[0]);
		// alert( "Load was performed." );
	});
});
