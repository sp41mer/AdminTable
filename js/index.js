$.post("http://127.0.0.1:8888/method/getContent",
    {'id': 0, 'version': '1.0'},
    function (data) {
      responseCategories = (data.categories)
      responseCategories.forEach(function (item, i, arr) {
        $(".categories > tbody:last-child").append("<tr class = \'category active level1\' data-id =\'" + item.id + "\' data-level ='1'><td>" + item.name + "</td></tr>");
      });
    }, "json");
$(document).ready(function(){
  $(".categories").on('click','.category.active',function(){
    $(this).removeClass("active").addClass("passive");
    newThis = $(this);
    $.post("http://127.0.0.1:8888/method/getContent",
        {'id': $(this).data('id'), 'version': '1.0'},
        function (data) {
          responseCategories = (data.categories);
          responseAnswers = (data.answers);
          responseCategories.forEach(function (item, i, arr) {
            newThis.after("<tr  class = \'category active level2 \' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><td>" + item.name + "</td></tr>");
          });
          responseAnswers.forEach(function (item, i, arr) {
            newThis.after("<tr  class = \'answer active\' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><td>" + item.name + "</td></tr>");
          });
        }, "json");
  });
  $(".categories").on('click','.category.passive',function(){
    $(this).removeClass("passive").addClass("active");
    if ($(this).data('level') == 1) $(".detail").remove();
    parents = $("tr[data-parent='"+$(this).data('id')+"']")
    $("tr[data-parent='"+$(this).data('id')+"']").remove();
    parents.each(function(index) {
      $("tr[data-parent='"+$(this).data('id')+"']").remove();
    });
  });
  $(".categories").on('click','.answer.active',function(){
    newThis = $(this);
    $(this).removeClass("active").addClass("passive");
    $.post("http://127.0.0.1:8888/method/getDetail",
        {'id': $(this).data('id'), 'version': '1.0'},
        function (data) {
          name = data.name;
          text = data.text;
          video = data.videourl;
          image = data.imgurl;
          newThis.after("<tr class = \'detail\' data-parent = \'"+newThis.data('id')+"\'><td>Наименование</td><td>"+name+"</td></tr>" +
              "<tr class =\'detail\' data-parent = \'"+newThis.data('id')+"\'><td>Текст ответа</td><td>"+text+"</td></tr>" +
              "<tr class =\'detail\' data-parent = \'"+newThis.data('id')+"\'><td>Ссылка на видео</td><td>"+video+"</td></tr>" +
              "<tr class =\'detail\' data-parent = \'"+newThis.data('id')+"\'><td>Ссылка на изображение</td><td>"+image+"</td></tr>");
        }, "json");
  });
  $(".categories").on('click','.answer.passive',function(){
    $(this).removeClass("passive").addClass("active");
    $("tr[data-parent='"+$(this).data('id')+"']").remove();
  });

});
