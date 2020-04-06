$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
        `<div class="chat_message__post">
          <div class="chat_message__post__user">
            <div class="chat_message__post__user-name">
              ${message.user_name}
            </div>
            <div class="chat_message__post__user-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat_message__post__box">
            <p class="chat_message__post__box-text">
              ${message.body}
            </p>
            <img src=${message.image} >
          </div>
        </div>`
     return html;
    } else {
     var html =`
        <div class="chat_message__post">
          <div class="chat_message__post__user">
            <div class="chat_message__post__user-name">
              ${message.user_name}
            </div>
            <div class="chat_message__post__user-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat_message__post__box">
            <p class="chat_message__post__box-text">
              ${message.body}
            </p>
          </div>
        </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_message').append(html);
      $('form')[0].reset();
      $('.chat_message').animate({ scrollTop: $('.chat_message')[0].scrollHeight});
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});