// Generate result list on keyup except arrow, ignore deeper filter of initial request
let firstkey = '';
let livesearch = [];
$("#srcfield").keyup(function(element){
    if( element.keyCode == 40 || element.keyCode == 38 ) {
        return;
    } else {
        let query = $("input").val().toLowerCase();
        function createResultTable(livesearch) {
            let results = livesearch.filter(function(element) {
                    return element.toLowerCase().indexOf(query) > -1;
                });
            let restable = '<ul id="restable">';
            for ( index in results ) {
                restable += '<li>' + results[index] + '</li>';
            }
            restable += '</ul>';
            $('#searchsuggest').html(restable);
        }

        if (firstkey == query[0]) {
            createResultTable(livesearch);
        } else {
            $.get('/livesearch', {input: query }, function(res) {
                livesearch = res.output;
                createResultTable(livesearch);
                firstkey = query[0];
            });
        }
    }
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

// Highlight list on hover
$('#searchsuggest').on('mouseenter mouseleave', 'li', function(){
    $('#restable').children().removeClass('hover');
    $(this).toggleClass('hover');
    indexnr = $(this).index();
    focused = $('li').eq(indexnr).addClass('hover');
});

//Navigate list with up-38/down-40 arrow keys
let focused = undefined;
let next = undefined; // test
$(document).keydown(function(element) {
    if(element.which === 40) {
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
    } else if (element.which === 38) {
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
