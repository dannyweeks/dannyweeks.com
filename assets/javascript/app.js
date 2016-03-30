anchors.add('.main h2, .main h3');

hljs.initHighlightingOnLoad();

$(document).foundation();

$(window).load(function () {

    $('#masonry-container').masonry({

        itemSelector: '#masonry-container .column'

    });

});

$.expr[':'].external = function (obj) {
    return !obj.href.match(/^mailto\:/)
        && (obj.hostname != location.hostname)
        && !obj.href.match(/^javascript\:/)
        && !obj.href.match(/^$/)
};

$('a:external').attr('target', '_blank');
$('a:external').addClass("external-link");


$('img[alt^="caption:"]').each(function (key, image) {
    image = $(image);
    var alt = image.attr('alt');
    var caption = alt.substring(8);
    image.attr('alt', caption);
    image.wrap("<figure></figure>");
    image.after("<figcaption>" + caption + "</figcaption>");
});