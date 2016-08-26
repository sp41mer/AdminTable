$.post("http://127.0.0.1:8888/method/getContent",
    {'id': 0, 'version': '1.0'},
    function (data) {
      responseCategories = (data.categories)
      responseCategories.forEach(function (item, i, arr) {
        $(".container").append("<div class = \'category active level1\' data-id =\'" + item.id + "\' data-level ='1'><span>" + item.name + "</span></div>");
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
            newThis.append("<div  class = \'category active level2 \' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><span>" + item.name + "</span></div>");
          });
          responseAnswers.forEach(function (item, i, arr) {
            newThis.append("<div  class = \'answer active\' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><span>" + item.name + "</span></div>");
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
          newThis.append("<table class = \'details\'><thead><td>Название</td><td>Текст</td><td>Ccылка на видео</td><td>Изображение</td></thead>" +
              "<tbody><tr><td contenteditable=\'true\' class = \'detail name\' data-parent = \'"+newThis.data('id')+"\'>"+name+"</td>" +
              "<td contenteditable=\'true\' class =\'detail text\' data-parent = \'"+newThis.data('id')+"\'>"+text+"</td>" +
              "<td contenteditable=\'true\' class =\'detail video\' data-parent = \'"+newThis.data('id')+"\'>"+video+"</td>" +
              "<td contenteditable=\'true\' class =\'detail image\' data-parent = \'"+newThis.data('id')+"\'>"+image+"</td></tr></tbody></table><button class=\'js__details__button__save\'>Сохранить</button>");
        }, "json");
  });
  $(".container").on('click','.answer.passive',function(e){
    e.stopPropagation();
    $(this).removeClass("passive").addClass("active");
    $(this).children().remove();
  });
  $(".container").on('click','.details',function(e){
    e.stopPropagation();
  });
  $(".container").on('click','.js__details__button__save',function(e){
    e.stopPropagation();
  });

});
