anchors.add('.main h2, .main h3');

hljs.initHighlightingOnLoad();

$(document).foundation();

$(window).load(function () {

    $('#masonry-container').masonry({

        itemSelector: '#masonry-container .column'

    });

});

$.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto\:/)
        && (obj.hostname != location.hostname)
        && !obj.href.match(/^javascript\:/)
        && !obj.href.match(/^$/)
};

$('a:external').attr('target', '_blank');
$('a:external').addClass("external-link");