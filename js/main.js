//mouse
$('#keyboard button').mousedown(function(e){
    var key = e.target.id.replace('k', '');
    new Audio('sounds/'+key+'.mp3').play();
    $(this).addClass('active');
});
$('#keyboard button').hover(function(e){
    $(this).addClass('active');
});
$('#keyboard button').mouseleave(function(e){
    $(this).removeClass('active');
});
$('#keyboard button').mouseup(function(e){
    $(this).removeClass('active');
});


//keyboard

var keyboard = [];
$.getJSON( "includes/keyboard.json", function( data ) {
    keyboard.push(data);
});

$(document).keydown(function(e){
    var k = e.originalEvent.key;
    if(!$('#form-sheet').is(':visible')){
        for(var i = 0; i<keyboard[0].length; i++){
            if(k == keyboard[0][i].key){
                new Audio('sounds/'+keyboard[0][i].id+'.mp3').play();
                $('#k'+keyboard[0][i].id).addClass('active');
            }
        }
    }    
}).keyup(function(e){
    var k = e.originalEvent.key;
    if(!$('#form-sheet').is(':visible')){
        for(var i = 0; i<keyboard[0].length; i++){
            if(k == keyboard[0][i].key){
                $('#k'+keyboard[0][i].id).removeClass('active');
            }else if(k == 'Shift'){
                $('#keyboard button').removeClass('active');
            }
        }
    }  
});

$(document).ready(function(){    
    var heightHeading = $('#heading').height();
    var heightHow = $('#how').height();
    var heightSelect = $('#select').height();
    
    // panel pomocy
    $('#how-link').click(function(){
        $('#heading').animate({
            height: heightHow
        }, 1000);
        $('#menu').hide();
        $('#how').show();
                
    });
    $('#how .close').click(function(){
        $('#heading').animate({
            height: heightHeading
        }, 1000);
        $('#how').hide();
        $('#menu').show(); 
    });

    
    //nuty
    
    setInterval(function(){
        $.get( "includes/get.php", function( data ) {
            var result = $.parseJSON(data);
            var optionLenght = parseInt($('#sheets option').length);
                $.each(result, function(index){
                    if(result.length > optionLenght-1){
                        $('#sheets').append('<option value='+result[index].id+'>'+result[index].title+'</option>');
                    }else if(optionLenght-1 > result.length){
                        $('#sheets option').remove();
                        $('#sheets').append('<option value="0">Wybierz nuty</option>');
                    } 
                });     
        });
    }, 1000);

        $('#sheets').click(function(){
            $.get( "includes/get.php", function( data ) {
                var result2 = $.parseJSON(data);
                $.each(result2, function(i){
                    if($('#sheets').val() == result2[i].id){
                        $('#sheet').show();
                        $('#sheet').html(result2[i].sheet.replace(/\n/g, "<br />"));
                        if($('#sheet').height()>200){
                            $('#sheet').css({
                                'max-height' : '200px',
                                'overflow-y' : 'scroll'
                            });
                        }else{
                            $('#sheet').css('overflow-y', 'auto');
                        }
                        heightSelect = $('#select').height()+20;
                        $('#heading').animate({
                            height: heightSelect
                        },300);
                    }else if($('#sheets').val() == 0){
                        $('#sheet').html(null);
                        $('#heading').animate({
                            height: heightHeading
                        },300);
                        $('#sheet').hide();   
                    }  
                });
            });
        });

    $('#sheets-link').click(function(){
        $('#heading').css("height", heightHeading);
        $('#menu').hide();
        $('#menu').animate({opacity: 0},300);
        $('#select').show();
        $('#select').animate({opacity: 1},300);
        $('#select .close').click(function(){
            $('#heading').animate({
                height: heightHeading
            },300);
            $('#select, #sheet').hide();
            $('#menu').show();
            $('#select').animate({opacity: 0},300);
            $('#menu').animate({opacity: 1},300);
            $('#sheets').val(0);
        });
        
    });

    //panel dodawania nut
    $('#add-link').click(function(){
        
        var heightAdd = $('#add').height();
        $('#heading').animate({
            height: heightAdd
        },1000);
        $('#menu').hide();
        $('#add').show();
        
        $('#add .close').click(function(){
            
            $('#menu').show();
            $('#add').hide();
            $('#heading').animate({
                height: heightHeading
            },1000);
            $('#form-sheet')[0].reset();
            $('#submit').val("Dodaj");
            $("#title, #new-sheet").css("border","1px solid #000");
            $("#title, #new-sheet").removeClass('danger');
        });
    });
    
    $('#form-sheet')[0].reset();
    $('#submit').val("Dodaj");
    
    $("#submit").click(function() {
        var title = $("#title").val();
        var sheet = $("#new-sheet").val();
        if(title !=="" && sheet !==""){
            $("#title, #new-sheet").css("border","1px solid #000");
            $("#title, #new-sheet").removeClass('danger');
            $.post("includes/save.php", {
                title: title,
                sheet: sheet
                }, function(data) {
                    var result = $.parseJSON(data);
                    $('#sheets').append('<option value='+result.id+'>'+result.title+'</option>');
                    $('#form-sheet')[0].reset();
                    $('#submit').css({
                        backgroundColor: "#535353",
                        border: "none"
                    });
                    $('#submit').attr("disabled", "disabled");
                    $('#submit').val("Wysłano");
                    $('#submit').animate({
                        backgroundColor: "#000"
                    }, 3000);
                    setTimeout(function(){
                        $('#submit').val("Dodaj");
                        $('#submit').removeAttr("disabled");
                    }, 3000)
                });
        }else{
            $("#title, #new-sheet").attr("placeholder", "Wypełnij puste pole");
            $("#title, #new-sheet").css("border","1px solid #d9534f");
            $("#title, #new-sheet").addClass('danger');
        }
        
    });


    //nagrywanie i odtwarzanie
    $('#record-link').click(function(){
        var heightRecord = $('#record').height();
        $('#heading').animate({
            height: heightRecord
        }, 1000);
        $('#menu').hide();
        $('#menu').animate({opacity: 0},300);
        $('#record').show();
        $('#record').animate({opacity: 1},300);
        $('#record .close').click(function(){
            $('#heading').animate({
                height: heightHeading
            },300);
            $('#menu').show();
            $('#record').hide();
            $('#record').animate({opacity: 0},300);
            $('#menu').animate({opacity: 1},300);
            $('#record-sheet').css("display", "none");
            $('#record-sheet').html("");
        });
    });
    var i = 1;
    var keys = [];
    var pause = 0;
    var recordKeY = {};
    
    $('#record-button').click(function() {
        if (i%2 !== 0) {
            $(this).html("Nagrywanie...");
            $(this).css("background", "#535353");
            keys.length = 0;
            keys.push({
                "key": null,
                "pause" : new Date().getTime()
            });
            var j = 1;
            $('#keyboard button').mousedown(function(e){
                var k = e.target.id.replace('k', '');
                pause = new Date().getTime();
                recordKeY = {
                    "key": k,
                    "pause" : pause
                }
                keys.push(recordKeY);
                j++;
                keys.length = j;
            });
            $(document).keydown(function(e){
                var k = e.originalEvent.key;
                
                pause = new Date().getTime();
                recordKeY = {
                    "key": k,
                    "pause" : pause
                }
                if(k == 'Shift'){
                    return true;
                }else{
                    keys.push(recordKeY);
                }
                j++;
                keys.length = j;
                
            });         
        } else {
            $('#record-button').html("Nagraj");
            $('#record-button').css("background", "#000");
        }
        i++;      
    });
    $('#play-button').click(function(){
        var time = 0;
        var temp = 0;
        var output = '';
        var times = [];
        $(this).html("Odtwarzanie...");
        $(this).css("background", "#535353");
        $('#record-button').attr('disabled', true);
        $.each( keys, function(index){
            var i = index - 1;

            if(keys[index] == undefined || index == 0){
                time = 0;
            }else if(keys[index].key != null && index > 0 && index !== keys.length - 1){
                time = (parseInt(keys[index].pause) - parseInt(keys[i].pause));
                output += "<div class='"+index+"'>"+keys[index].key+"</div>";
                times.push(time);
            }else if(keys[index].key != null && index == keys.length - 1){
                time = (parseInt(keys[index].pause) - parseInt(keys[i].pause));
                output += "<div class='"+index+"'>"+keys[index].key+"</div>";
                times.push(time);
            }
            temp = time + temp;
            
            $('#record-sheet').css("display", "block");
            $('#record-sheet').html(output);
            
            for(var t = 0; t<keyboard[0].length; t++){
                if(keys[index] !== undefined){
                    if(keys[index].key == keyboard[0][t].key){
                        keys[index].key = keyboard[0][t].id;
                    }
                }
            }
            setTimeout(function(){
                if(keys[index] !== undefined && keys[index].key !== null && index !== keys.length - 1){
                    new Audio('sounds/'+keys[index].key+'.mp3').play();
                    $('#record-sheet .'+i).css("color","#000");
                    $('#keyboard button#k'+keys[i].key).removeClass('active');
                    $('#record-sheet .'+index).css("color","#535353");
                    $('#keyboard button#k'+keys[index].key).addClass('active');
                                     
                }else if(keys[index] !== undefined && keys[index].key !== null && index == keys.length - 1){
                    new Audio('sounds/'+keys[index].key+'.mp3').play();
                    $('#record-sheet .'+i).css("color","#000");
                    $('#keyboard button#k'+keys[i].key).removeClass('active');
                    $('#record-sheet .'+index).css("color","#535353");
                    $('#keyboard button#k'+keys[index].key).addClass('active');
                    setTimeout(function(){
                        $('#record-sheet .'+index).css("color","#000");
                        $('#keyboard button#k'+keys[index].key).removeClass('active');
                        $('#play-button').html("Odtwórz");
                        $('#play-button').css("background", "#000");
                        $('#record-button').removeAttr('disabled');
                    }, temp+300);        
                }     
            }, temp);            
        });
        if($('#record-sheet').height()>60){
            $('#record-sheet').css({
                'max-height' : '200px',
                'overflow-y' : 'scroll'
            });
        }else{
            $('#record-sheet').css('overflow-y', 'auto');
        }
        for(var i = 1; i<times.length; i++){
            $('#record-sheet .'+i).after("{"+times[i]+"}");
        }
            
        heightRecord = $('#record').height()+20;
        $('#heading').animate({
            height: heightRecord
        }, 1000);
        temp = 0;
    });
    
});





