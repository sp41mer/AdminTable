const getContentMethod = "http://127.0.0.1:8888/method/getContent"; //done
const getDetailMethod = "http://127.0.0.1:8888/method/getDetail"//done
const categoryRemoveMethod = "http://127.0.0.1:8888/method/categoryRemove"; //done
const categoryAddMethod = "http://127.0.0.1:8888/method/categoryAdd"; //done
const answerAddMethod = "http://127.0.0.1:8888/method/answerAdd"; //done
const answerRemoveMethod = "http://127.0.0.1:8888/method/answerRemove"; //done

var historyValue = null;

$.post(getContentMethod,
    {'id': 0, 'version': '1.0'},
    function (data) {
      responseCategories = (data.categories);
      responseCategories.forEach(function (item, i, arr) {
        $(".container").append("<div class = \'category active level1\' data-id =\'" + item.id + "\' data-level ='1'><span>" + item.name + "</span><button class = \'js__category__button__edit\'>Редактировать</button><button class = \'js__category__button__cancel\'>Отменить</button><button class = \'js__category__button__save\'>Сохранить</button><button class = \'js__category__button__remove\'>Удалить</button></div>");
      });
    }, "json");
$(document).ready(function(){
  $(".container").on('click','.category.active',function(e){
    e.stopPropagation();
    $(this).removeClass("active").addClass("passive");
    newThis = $(this);
    $.post(getContentMethod,
        {'id': $(this).data('id'), 'version': '1.0'},
        function (data) {
          isAnyCategory = 0;
          isAnyAnswer = 0;
          responseCategories = (data.categories);
          responseAnswers = (data.answers);
          responseCategories.forEach(function (item, i, arr) {
            isAnyCategory = 1;
            newThis.append("<div  class = \'category active level2 \' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><span>" + item.name + "</span><button class = \'js__category__button__edit\'>Редактировать</button><button class = \'js__category__button__cancel\'>Отменить</button><button class = \'js__category__button__save\'>Сохранить</button><button class = \'js__category__button__remove\'>Удалить</button></div>");
          });
          responseAnswers.forEach(function (item, i, arr) {
            isAnyAnswer = 1;
            newThis.append("<div  class = \'answer active\' data-level =\'" + (newThis.data('level')+1) + "\' data-id =\'" + item.id + "\' data-parent=\'"+newThis.data('id')+"\'><span>" + item.name + "</span><button class = \'js__answer__button__edit\'>Редактировать</button><button class = \'js__answer__button__cancel\'>Отменить</button><button class = \'js__answer__button__save\'>Сохранить</button><button class = \'js__answer__button__remove\'>Удалить</button></div>");
          });
          if (isAnyCategory) newThis.append("<button class = \'js__category__button__add\'>Добавить</button>");
          else {
            if (isAnyAnswer) newThis.append("<button class = \'js__answer__button__add\'>Добавить</button>");
            else newThis.append("<div  class = \'answer active\' data-id="+newThis.data('id')+"><span>Нет вопросов</span><button class = \'js__answer__button__add\'>Добавить</button>");
          }
        }, "json");
  });
  $(".container").on('click','.category.passive',function(e){
    e.stopPropagation();
    $(this).removeClass("passive").addClass("active");
    $(this).children().slice(5).remove();
  });
  $(".container").on('click','.answer.active',function(e){
    e.stopPropagation();
    newThis = $(this);
    $(this).removeClass("active").addClass("passive");
    $.post(getDetailMethod,
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
    $(this).children().slice(5).remove();
  });
  $(".container").on('click','.details',function(e){
    e.stopPropagation();
  });
  $(".container").on('click','.js__details__button__save',function(e){
    e.stopPropagation();
  });

  //categories buttons
  $(".container").on('click','.js__category__button__edit',function(e){
    e.stopPropagation();
    $(this).parent().find('span').attr('contenteditable','true').addClass('editing');
    historyValue = $(this).parent().find('span.editing').text();
  });

  $(".container").on('click','.js__category__button__save',function(e){
    e.stopPropagation();
    $(this).parent().find('span').removeAttr('contenteditable').removeClass('editing');
  });

  //добавить красивые алерты и обработку ошибок
  $(".container").on('click','.js__category__button__remove',function(e){
    e.stopPropagation();
    $.post(categoryRemoveMethod,
        {'id': $(this).parent().data('id'),
          'version': '1.0'},
        function (data) {
        }, "json");
    alert('Udaleno!');
    $(this).parent().remove();
  });

  $(".container").on('click','.js__category__button__cancel',function(e){
    e.stopPropagation();
    $(this).parent().find('span.editing').text(historyValue);
    $(this).parent().find('span').removeAttr('contenteditable').removeClass('editing');
  });

  $(".container").on('click','.js__category__button__add',function(e){
    e.stopPropagation();
    $(this).after("<div  class = \'category new\' data-id="+$(this).parent().data('id')+"><span contenteditable='true'>Новая категория</span><button class = \'js__category__button__new__save\'>Сохранить</button><button class = \'js__category__button__new__cancel\'>Отмена</button></div>");
  });

  //добавить красивые алерты и обработку ошибок
  $(".container").on('click','.js__category__button__new__save',function(e){
    e.stopPropagation();
    alert($(this).parent().find("span").text());
    alert($(this).parent().data('id'));
    $.post(categoryAddMethod,
        {'parent': $(this).parent().data('id'),
          'name': $(this).parent().find("span").text(),
          'version': '1.0'},
        function (data) {
        }, "json");
    alert('Dobavleno!');
    $(this).parent().remove();
  });
  $(".container").on('click','.js__category__button__new__cancel',function(e){
    e.stopPropagation();
    $(this).parent().remove();
  });


  //answers buttons
  $(".container").on('click','.js__answer__button__add',function(e){
    e.stopPropagation();
    $(this).after("<table class = \'details\'><thead><td>Название</td><td>Текст</td><td>Ccылка на видео</td><td>Изображение</td></thead>" +
        "<tbody><tr><td contenteditable=\'true\' class = \'detail name\' data-parent = \'"+$(this).parent().data('id')+"\'></td>" +
        "<td contenteditable=\'true\' class =\'detail text\' data-parent = \'"+$(this).parent().data('id')+"\'></td>" +
        "<td contenteditable=\'true\' class =\'detail video\' data-parent = \'"+$(this).parent().data('id')+"\'></td>" +
        "<td contenteditable=\'true\' class =\'detail image\' data-parent = \'"+$(this).parent().data('id')+"\'></td></tr></tbody></table><button class=\'js__details__button__new__save\'>Сохранить</button><button class=\'js__details__button__new__cancel\'>Отмена</button>");
  });

  //добавить обработку ошибок и алерты
  $(".container").on('click','.js__details__button__new__save',function(e){
    e.stopPropagation();
    $.post(answerAddMethod,
        {'id': $(this).parent().find("td.name").data('parent'),
          'name': $(this).parent().find("td.name").text(),
          'text': $(this).parent().find("td.text").text(),
          'image': $(this).parent().find("td.image").text(),
          'video': $(this).parent().find("td.video").text(),
          'version': '1.0'},
        function (data) {
        }, "json");
    alert('Dobavleno!');
    $(this).parent().remove();
  });
  $(".container").on('click','.js__details__button__new__cancel',function(e){
    e.stopPropagation();
    $(this).parent().remove();
  });


  $(".container").on('click','.js__answer__button__remove',function(e){
    e.stopPropagation();
    $.post(answerRemoveMethod,
        {'id': $(this).parent().data('id'),
          'version': '1.0'},
        function (data) {
        }, "json");
    alert('Udaleno!');
    $(this).parent().remove();
  });

  $(".container").on('click','.category.new',function(e){
    e.stopPropagation();
  });


});
