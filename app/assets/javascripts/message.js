$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
        `<div class="chat_message__post" data-message-id=${message.id}>
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
        <div class="chat_message__post" data-message-id=${message.id}>
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

  var reloadMessages = function() {
    var last_message_id = $('.chat_message__post:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat_message').append(insertHTML);
        $('.chat_message').animate({ scrollTop: $('.chat_message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

  
