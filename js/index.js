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
            newThis.after("<tr  class = \'answer\' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><td>" + item.name + "</td></tr>");
          });
        }, "json");
  });
  $(".categories").on('click','.category.passive',function(){
    $(this).removeClass("passive").addClass("active");
    parents = $("tr[data-parent='"+$(this).data('id')+"']")
    $("tr[data-parent='"+$(this).data('id')+"']").remove();
    parents.each(function(index) {
      $("tr[data-parent='"+$(this).data('id')+"']").remove();
    });
  });

});
