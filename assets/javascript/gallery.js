
$(window).load(function () {

    var galleries = {};
    var images = $('img[alt^="gallery-"]');

    $.each(images, function (key, imageElement) {
        var image = $(imageElement);
        var galleryName = image.attr('alt');
        var imageSrc = image.attr('src');

        if (typeof galleries[galleryName] === 'undefined') {
            galleries[galleryName] = [];
        }

        galleries[galleryName].push(imageSrc);

    });

    $.each(galleries, function (galleryName, gallery) {
        var lastOccurrence = $('img[alt="' + galleryName + '"]').last();
        lastOccurrence.after('<div class="small-12 columns"><div class="row small-up-2 medium-up-3 large-up-4" id="' + galleryName + '"></div></div>');

        $.each(gallery, function (key, imageSrc) {
            var galleryElement = $('#' + galleryName);
            galleryElement.append('<div class="column"><img width="150" class="thumbnail gallery-thumb" src="' + imageSrc + '"></div>');

            galleryElement.masonry({

                itemSelector: '#' + galleryName + ' .column'

            });

            galleryElement.masonry('reloadItems');

        });
    });

    images.remove();

});

$('.gallery-thumb').on('click', function () {
    var img = $(this);
    var src = img.attr('src');
    $('#gallery-modal > img').attr('src', src);
    $('#gallery-modal').foundation('open');

});