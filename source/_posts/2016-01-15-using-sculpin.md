---
title: My Personal Website Build With Sculpin
categories:
    - web-dev
tags:
    - sculpin
    - scss
    - foundation
    - javascript
    
featured_image: sculpin.jpg
---
As I mentioned in my [website relaunch post][relaunch post] I eventually settled on using [Sculpin][sculpin] a static site generator. In this post I will go over some of the challenges I faced and over came molding Sculpin into something I can enjoy using. My aim for this build was to make it very easy to blog without having to do lots of fiddling with settings.  

[relaunch post]: /blog/2015/12/23/website-relaunch
[sculpin]: https://sculpin.io

## Features

I had a number of requirements coming into re-building my personal website:

- Category icons on homepage
- Featured Images w/ thumbnails
- Blog galleries 
- Spoiler protection
- Syntax highlighting
- Excerpts

## Category Icons

A little design accent that I wanted to bring into this build for was posts to have category icons on the homepage. In the past the icon was generated in PHP but with my little experience using Sculpin this was the first challenge.

![icons](/images/uploads/2016/01/icons.png)

The implementation I ended up going for was creating custom fontawesome classes using SCSS. Having an array of each category details all inheriting from a base *category* class.

```scss
$categories: (
    ("category", "#3498db", null, "\f075"),
    ("my-thoughts", null, null, "\f075"),
    ("web-dev", "#2c3e50", "#2ecc71", "\f120"),
    ("film-tv", null, null, "\f008"),
    ("photography", "#EB9532", null, "\f030"),
    ("projects", "#D24D57", null, "\f286"),
    ("gaming", "#212121", "#FFF176", "\f11b"),
);

@each $category in $categories {
    .#{nth($category, 1)}-icon {
        .background-icon {
            color: #{nth($category, 2)};
        }
        .main-icon {
            color: #{nth($category, 3)};
            &:before {
                content: "#{nth($category, 4)}";
            }
        }
    }
}
```

## Syntax Highlighting

I wanted syntax highlighting to totally painless. In Sculpin actually came with a perfect syntax highlighting javascript plugin aptly named [highlightjs](https://highlightjs.org/). Highlighting is as simple as initialising the plugin and then throwing your code in markdown code tags.

## Featured Images

Featured images came in two parts. First off actually having images associated to a blog post and it being output in various places. Secondly, having images optimised for the homepage where the image is not full size.

### Attaching Featured Images

Sculpin makes it easy to add meta data to a blog posts with a yml block at the top of your post files. By adding `featured_image: sculpin.jpg` to the top of this post I easily have access to this data in the templates. I make the assumptions that the file is located in the uploads folder in the corresponding month that the post is published. 

### Thumbnails

I came across a fantastic Sculpin plugin called [Icelus][icelus]. Installing and using this is so seamless it's laughable. I ended up going for a macro which creates a 500px wide version of the provided image.

[icelus]: https://github.com/beryllium/icelus

{% verbatim %}
```php
{% macro featured_preview(image) %}
    <img src="{{ thumbnail(image, 500, null, true) }}" alt=""/>
{% endmacro %}
```
{% endverbatim %}

## Galleries

This was a big challenge since there is no way of doing this in markdown without some trickery but I'm happy with the result. Like I said it's all about making witting a post as easy as possible. 

My idea was to hook into the alt tag of images to build a gallery out of taged images. This solution is a mixture of CSS and javascript. The CSS portion is mainly a fall back in case javascript is disabled. 

```scss
img[alt^="gallery-"] {
  width: 150px;
  display: inline-block;
}
```

The desired API I wanted was to markup galleries with `gallery-1` as the alt tag. Note the '1', I knew I would need to accommodate for multiple galleries on one pages due to an already published post about different version of the [7 Wonders of the World][wow]. 

[wow]: /blog/2013/08/01/the-seven-wonders-of-the-world

```
![gallery-1](/link/to/first/image.jpg)
![gallery-1](/link/to/second/image.jpg)
```

This produces images with the same alt tags which I can search for and manipulate.

I won't go into details about how this all works; you can find exactly how in the [source code][source] of this website ('assets/javascript/gallery.js'). The gist of how this works is:

- The javascript searches for all images that have an alt tag starting with 'gallery-'.
- The images are then grouped by their gallery name gallery-1, gallery-2 etc.
- The markup for each gallery is then generated and injected below the last image found the corresponding gallery.
- The original images are removed from the DOM.


[source]: https://github.com/dannyweeks/dannyweeks.com

## Spoiler Protection

[Spoilers][spoilers] are a big issue to me so I want to ensure my readers don't unknowingly happen upon a spoiler. Inspired by the above solution I thought to hook into the alt tag once again but this time using a simple 'spoiler' alt tag.

A nice API solution for text based spoilers is still to be addressed but for the time being a simple span tag with the class of spoiler has the desired effect. 

[spoilers]: /blog/2014/06/19/spoilers-you-have-no-right

## Excerpts

Coming from Wordpress one thing I did like was being able to choose where the excerpt came from. I implemented this and took it one step further. There are three ways to get the excerpt one taking priority of the other.

- Use the excerpt property defined in the yml block
- Take the content before the `<!--more-->` tag
- If no more tag exists take the first 200 characters of the post its self.

This is achieved with a simple if statement and the below twig macro.

{% verbatim %}
```php
{% macro excerpt(text) %}
    {% set more_array =
    text|split('<!--more-->', 2) %}

    {% if more_array|length > 1 %}
        {{ more_array[0]|raw|striptags }}
    {% else %}
        {{ text|raw|striptags|slice(0,200) }} &hellip;
    {% endif %}
{% endmacro %}
```
{% endverbatim %}

## Conclusion

On the whole I am pretty happy with how using Sculpin has turned out with this build. I'd like to thank [Kevin Boyd](http://whateverthing.com/blog/tags/sculpin/) for sharing a lot of Sculpin based solutions I took advantage of.