export function buildNotificationModal(header, message, modalId){
  var str += '<div class="modal fade"';
  str +=  ' id="' + modalId + '"';
  str += ' tabindex="-2" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
  str += header;
  str += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body mx-3">';
  str += message;
  str += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
  return str;
}
