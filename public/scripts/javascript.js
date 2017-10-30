// Generate result list on keyup
//     If field is empty, post get request, if not, dont. Store result in variable.

$("#srcfield").keyup(function( element ){
    if( element.keyCode == 38 || element.keyCode == 40 ) {
        return;
    }
    let query = $("input").val().toLowerCase();
    let results = userArray.filter(function( element ) {
        return element.firstname.toLowerCase().indexOf(query) > -1 ||
            element.lastname.toLowerCase().indexOf(query) > -1;
    });

    //Create table with results
    let restable = '<ul id="restable">';
    if ( results.length !== userArray.length ) {
        for ( index in results ) {
            restable += '<li>' + results[index].firstname + ' ' + results[index].lastname + '</li>';
      }
    }
    restable += '</ul>';
    $('#searchsuggest').html(restable);
});

// Submit form if clicked in list
$('#searchsuggest').on('click', 'li', function() {
    $('#srcfield').val($(this).text());
    $('#searchform').submit();
});

// Clear list if clicked away from
$(window).on('click', function(event) {
    focused = undefined;
    $('#restable').remove();
    $('#srcfield').val('');
});

// Highlight list
$('#searchsuggest').on('mouseenter mouseleave', 'li', function(){
    $('#restable').children().removeClass('hover');
    $(this).toggleClass('hover');
    indexnr = $(this).index();
    focused = $('li').eq(indexnr).addClass('hover');
});

//Navigate list with up/down arrow keys
let focused;
$(document).keydown(function(element) {
    if( element.which === 40 ) {
        if(focused) {
            focused.removeClass('hover');
            next = focused.next();
            if(next.length > 0){
                focused = next.addClass('hover');
                $('#srcfield').val($('li').eq(focused.index()).text());
            } else {
                focused = $('li').eq(0).addClass('hover');
            }
        } else {
            focused = $('li').eq(0).addClass('hover');
            $('#srcfield').val($('li').eq(0).text());
        }
    } else if ( element.which === 38 ) {
        if(focused) {
            focused.removeClass('hover');
            next = focused.prev();
            if(next.length > 0){
                focused = next.addClass('hover');
                $('#srcfield').val($('li').eq(focused.index()).text());
            } else {
                focused = $('li').eq(0).addClass('hover');
            }
        } else {
            focused = $('li').eq(0).addClass('hover');
        }
    }
});
