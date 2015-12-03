anchors.add('.main h2, .main h3');

hljs.initHighlightingOnLoad();

$(document).foundation();

$(window).load(function(){

    $('#masonry-container').masonry({

        itemSelector: '#masonry-container .column'

    });

});


(function(){

    var galleries = {};
    var images = $('img[alt^="gallery-"]');

    $.each(images, function(key, imageElement){
        var image = $(imageElement);
        var galleryName = image.attr('alt');
        var imageSrc = image.attr('src');

        if (typeof galleries[galleryName] === 'undefined') {
            galleries[galleryName] = [];
        }

        galleries[galleryName].push(imageSrc);

    });

    $.each(galleries, function(galleryName, gallery){
        var lastOccurence = $('img[alt="' + galleryName + '"]').last();
        lastOccurence.after('<div id="" class="row small-up-2 medium-up-3 large-up-4" id="' + galleryName + '"></div>');

        $.each(gallery, function(key, imageSrc){
            $('#' + galleryName).append('<div class="column"><img width="150" class="thumbnail gallery-thumb" src="' + imageSrc + '"></div>');
        });
    });

    images.remove();

})();

$('.gallery-thumb').on('click', function(){
    var img = $(this);
    var src =img.attr('src');
    $('#gallery-modal > img').attr('src', src);
    $('#gallery-modal').foundation('open');

});
