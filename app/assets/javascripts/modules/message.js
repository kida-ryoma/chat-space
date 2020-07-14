$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
     `<div class="message-block" data-message-id=${message.id}>
        <div class="info">
          <div class="info__name">
          ${message.user_name}
          </div>
        <div class="info__data">
          ${message.created_at}
        </div>
        </div>
          <div class="message-block__contents">
            <p class="message-block__contents__content">${message.text}</p>
            <img class="message-block__contents__image" src="${message.image}"></img>
          </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="message-block" data-message-id=${message.id}>
        <div class="info">
          <div class="info__name">
            ${message.user_name}
          </div>
          <div class="info__data">
            ${message.created_at}
          </div>
        </div>
        <div class="message-block__contents">
          <p class="message-block__contents__content"></p>
          ${message.text}
        </div>
      </div>`
      return html;
    };
  }

  $(".form").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".message-list").append(html);
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.form__send').prop('disabled', false);
    })
    .fail(function(){
      alert("error");
    })
  })
});