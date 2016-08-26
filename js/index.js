$.post("http://127.0.0.1:8888/method/getContent",
    {'id': 0, 'version': '1.0'},
    function (data) {
      responseCategories = (data.categories)
      responseCategories.forEach(function (item, i, arr) {
        $(".container").append("<div class = \'category active level1\' data-id =\'" + item.id + "\' data-level ='1'>" + item.name + "</div>");
      });
    }, "json");
$(document).ready(function(){
  $(".container").on('click','.category.active',function(e){
    e.stopPropagation();
    $(this).removeClass("active").addClass("passive");
    newThis = $(this);
    $.post("http://127.0.0.1:8888/method/getContent",
        {'id': $(this).data('id'), 'version': '1.0'},
        function (data) {
          responseCategories = (data.categories);
          responseAnswers = (data.answers);
          responseCategories.forEach(function (item, i, arr) {
            newThis.append("<div  class = \'category active level2 \' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'>" + item.name + "</div>");
          });
          responseAnswers.forEach(function (item, i, arr) {
            newThis.append("<div  class = \'answer active\' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'>" + item.name + "</div>");
          });
        }, "json");
  });
  $(".container").on('click','.category.passive',function(e){
    e.stopPropagation();
    $(this).removeClass("passive").addClass("active");
    $(this).children().remove();
  });
  $(".container").on('click','.answer.active',function(e){
    e.stopPropagation();
    newThis = $(this);
    $(this).removeClass("active").addClass("passive");
    $.post("http://127.0.0.1:8888/method/getDetail",
        {'id': $(this).data('id'), 'version': '1.0'},
        function (data) {
          name = data.name;
          text = data.text;
          video = data.videourl;
          image = data.imgurl;
          newThis.append("<div class = \'detail\' data-parent = \'"+newThis.data('id')+"\'>Наименование"+name+"</div>" +
              "<div class =\'detail\' data-parent = \'"+newThis.data('id')+"\'>Текст ответа"+text+"</div>" +
              "<div class =\'detail\' data-parent = \'"+newThis.data('id')+"\'>Ссылка на видео"+video+"</div>" +
              "<div class =\'detail\' data-parent = \'"+newThis.data('id')+"\'>Ссылка на изображение"+image+"</div>");
        }, "json");
  });
  $(".container").on('click','.answer.passive',function(e){
    e.stopPropagation();
    $(this).removeClass("passive").addClass("active");
    $(this).children().remove();
  });

});
