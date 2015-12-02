anchors.add('.main h2, .main h3');

hljs.initHighlightingOnLoad();

$(document).foundation();

$(window).load(function(){

    $('#masonry-container').masonry({

        itemSelector: '#masonry-container .column'

    });

});