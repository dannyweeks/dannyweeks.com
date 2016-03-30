(function () {
    $('img[alt="spoiler"]').each(function (spoilerImages, spoilerImage) {
        var spoilerImage = $(spoilerImage);
        spoilerImage.addClass('spoiler-image');

        spoilerImage.attr('data-src', spoilerImage.attr('src'));
        spoilerImage.attr('src', '/images/spoiler.jpg');

        spoilerImage.attr('alt', '');
    });

    function flipImgSrc(img) {

        var newSrc = img.attr('data-src');
        img.attr('data-src', img.attr('src'));
        img.attr('src', newSrc);

    }

    $('.spoiler-image').on('click', function () {
        flipImgSrc($(this));
    });

})();