/* 	title = title of alert
	content = body of alert */
function customAlert(title, content) {
	var modal = $('#myModal');
	modal.find('.modal-title').html(title);
	modal.find('.modal-body').html(content);
	modal.modal();
}