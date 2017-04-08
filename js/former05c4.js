var former = new function() {
    
    var self = this;
    var ratings = ['ужасно', 'плохо', 'удовлетворительно', 'хорошо', 'отлично'];
    
    this.stars = function(event) {
        
        event.preventDefault();
        
        var index = $('#stars-row').children().index($(this));
        if (!(~index)) return;
        
        $('#stars-row .star').removeClass('active');
        $('#stars-row').children().slice(0,(index + 1)).each(function() {
            $(this).find('.star').addClass('active');
        });
        
        $('#rating-word').removeClass('red').text(ratings[index]);

        
    };
    
    this.vote = function(event) {
        
        event.preventDefault();
        var target = $(event.target);
    
        if (target.hasClass('vote-up') || target.hasClass('vote-down')) {
            $(this).find('.vote-up').add($(this).find('.vote-down')).removeClass('active');
        }
        
        target.addClass('active');
        
    };

    this.submit = function(event) {
        
        var allowTableNums = [10,9,8,11,7,4,5,6,107,106,105,104,103,102,101,100,1,2,3,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,40,41,50,51,52,53,54,55,56,60,61,62,63,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85];
        
        event.preventDefault();
        
        $('#rating-word, #table-word').removeClass('red').text('');
        
        var error = false;
        
        var data = {};
        
        var rating = $('#stars-row .star.active').size() - 1;
        if (rating < 0) {
            $('#rating-word').addClass('red').text('Поставьте оценку');
            error = true;
        }
        
        data['Общая оценка'] = ratings[rating];
        
        $('[data-vote]').each(function() {
            
            var vote = $(this);
            
            var name = vote.attr('data-vote');
            data[name] = 0;
            
            if (vote.find('.active').size() > 0) {
                (vote.find('.active').hasClass('vote-up')) ? data[name] = '+1' : data[name] = '-1';
            }
            
        });
        
        var requiredFields = {
            'name': 'Имя',
            'contacts': 'Контактная информация'
        };
        
        for (var fieldCode in requiredFields) {
            
            data[requiredFields[fieldCode]] = $("[name = " + fieldCode + "]").val();
            
            if (!data[requiredFields[fieldCode]]) {
                
                $("[name = " + fieldCode + "]").addClass("red");
                $("[name = " + fieldCode + "]").prop("placeholder", $("[name = " + fieldCode + "]").attr("data-err-phr"));
                
                error = true;
                
            }
            
        }
        
        data['Комментарий'] = $('#comment').val();
        if (!data['Комментарий']) data['Комментарий'] = '';

        data['Номер'] = $('#tablenum').val();
        if (!data['Номер']) data['Номер'] = '';
        
        var tableNum = parseInt(data['Номер'].split(' ').join(''));
        if (isNaN(tableNum)) tableNum = 0;
        
        if (tableNum <= 0) {
//            $('#table-word').addClass('red').text('Укажите номер c таблички на столе');
//            return;
        }
        
        if (!(~allowTableNums.indexOf(tableNum))) {
//            $('#table-word').addClass('red').text('Неправильный номер с таблички на столе');
//            return;
        }
		//$('#table-word').removeClass('red').text(ratings[index]);
 
 
        if (error) return;
 
        data['action'] = 'send';

        data['location'] = $("[name=location]").val();
        data['point'] = $("[name=point]").val();
        data['mac'] = $("[name=mac]").val();

        
        $.post('index.php', data, function(output) {
            $('#main').html(output);
        });
        
        
    };
    
    this.back = function(event) {
        
        event.preventDefault();
        
        var data = {
            'action': 'back'
        };
        
        $.post('/index.php', data, function(output) {
            $('#main').html(output);
        });
        
    };

  $(function () {
    $('.form__like-pop-up-list').multipleSelect();
  });
    
    $(document).ready(function() {
        
        $('#main').on('click', '#stars-row a', self.stars);
        $("#main").on('click', '[data-vote]', self.vote);
        $("#main").on('click', '.button-submit', self.submit);
        $("#main").on('click', '#back', self.back);
        
        $("[data-err-phr]").on("click", function() {
            $(this).removeClass("red");
            $(this).prop("placeholder", $(this).attr("data-phr"));
        });
    
    });
    
};