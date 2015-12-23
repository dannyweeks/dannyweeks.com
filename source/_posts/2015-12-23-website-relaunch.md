---
title: Website Relaunch
categories:
    - my-thoughts
    - web-dev
tags:
    - wordpress
    - sculpin
    - octobercms
featured_image: launch.jpg
excerpt: A new shiny website, built in something new for fun!
---

## Renouncing Freelance

After a around about a year of freelancing I decided I wanted that it wasn't for me. It was nice to have extra money on the side of course but pack it in for two reasons.

I felt like it wasn't challenging at all. Getting Wordpress set up and then throwing together a custom theme was becoming mundane. A long the way I built a Wordpress [plugin][cwd] to make it less painful but it didn't cure the itch.

[cwd]: https://wordpress.org/plugins/simple-custom-website-data/stats/
 
Second of all the projects were the same, a small website with a blog. Nothing was helping me move forward with my career. I felt like I needed to be spending my spare time either relaxing or developing things I enjoy and at the same time developing my portfolio. I think it's safe to say every developer has ten side projects for every one that makes it into the wild. My latest being [mersey](/blog/2015/11/19/introducing-mersey-a-server-management-tool) a tool that makes interacting with servers much less painful.
 
This isn't to say freelance is totally off the table but it's certainly off the back burner and in the freezer.

## Phase One - Purge The Old
My portfolio site in it's current form had to go. It wasn't reflective of my new goals and It's main focus was on getting freelance clients. 

My personal website is a playground and was the first time I used Laravel. I'm sure you have looked at work two years later and been embarrassed by it! It wasn't something I wanted to open source! 

Initiate _Phase One_! I put a redirect on dannyweeks.com to send everyone to my blog to stop people from being exposed to that monster. 

## Phase Two - Prettify The New

With my portfolio gone it was time to figure out what I wanted to do. A lot of the _'[industry][phil] [leaders][matt]'_ I follow have their websites as basically a blog with a little information about themselves. This was the direction I wanted to go down. I then had a choice. Create a new website entirely. Being a Laravel enthusiast it was my first thought. But it felt like overkill and would be a lot of time to invest just a blog.
                                                                      
[phil]: https://philsturgeon.uk
[matt]: https://mattstauffer.co

## Why Move Away From Wordpress?

I was stopped doing freelance because I was installing Wordpress and then creating a theme. I didn't want to become the client! There is more to it than that. My blog website was already built in Wordpress and had a custom theme but there was some aspects of the theme I wasn't happy with and some issues with Wordpress itself. 
 
So, let's look at the current theme. I like the colours. Parts of the layout I wasn't happy with. The sidebar on posts had to go; it was useless and just took away from the post. The homepage was dated and boring. 
 
Adding custom css for individual posts or adding features such as hiding spoilers was hacky. A combination of shortcode and spans with classes was the only way to do it but this was heavily dependant upon the theme being used. Change the theme and you have spoilers exposed to the world... [a big no no](/blog/2014/06/19/tv-spoilers-you-have-no-right)!

I was using a plugin for syntax highlighting which worked well but you had to go around the world to get it looking right and had to insert it in using a menu which felt clunky.

The final nail in the coffin was having to use either the WYSIWYG editor or bog standard html. I would never use the WYSIWYG as it just adds too much crap but I am so used to [Emmet](http://emmet.io/) I hated using the plain html editor. What I wanted was markdown

Let's find something new!

## OctoberCMS

When OctoberCMS was released I was intrigued, had a little look but never really got round to tinkering with it on a real project. With my website getting updated it was a perfect opportunity. Hey, I can wait as long as I need to to get exactly what I'm looking for so if I waste my time with OctoberCMS nobody's loss!

Straight of the bat I knew the blog aspect would be a pleasure to use with markdown and a live preview.

In general the backend cms was very nice to use getting the pages set up using static files. As I started trying to add more and more customisation the cracks started to show.

There was some additional functionality on blog posts I wanted. I wanted access to a  cropped version of the featured image for the index page. Keeping in line with a feature of the original blog each category needed to have an associated icon. 

The recommended solution was to create my own plugin that would extend the default blog plugin with the extra functionality I wanted. That was fine so after doing that I was pretty happy with how things were going. The next stop was to tackle deployment. 

To set environment variable I had to modify the source code of OctoberCMS which in general is a big no no. With it being Laravel I am used to committing the whole project to version control but with OctoberCMS it didn't seem right. I was confused as to what the best deployment method was. 

Honestly, my approach was wrong. I wanted one 'Website Project' but it seems like the project needs to be split up into different smaller projects. Develop a theme I want to use. Develop any plugins I want to use and then have them included in a OctoberCMS install which is modified for use on the production server. 

For what I wanted, a small maintainable site for my blog this CMS just didn't fit. 

## Intrigued By Static Site Generators 

My first exposure to a static site generator was [Jekyll](http://jekyllrb.com/), by far the [most popular](https://www.staticgen.com) tool. What put me off was the fact it used ruby. I don't have a lot of experience with ruby, that, a long with it being a pain when I was using it to build SCSS I wasn't excited to use it. 
 
Meet [Sculpin](https://sculpin.io), a PHP/Symfony based generator. It was easy to get set up and it didn't take long to notice the work flow would be great. Add a new markdown file, commit it and it could be published easily. 

I'm not going to go into too much detail with Sculpin as I plan on dedicating a post to this great little tool.

With Sculpin being based upon Symfony and using composer it is much more familiar territory. Like OctoberCMS, my initial thoughts with were positive. It's only when you really start digging in the challenges start being apparent. Being static I was forced to do a lot of the functionality in Javascript/CSS rather than using PHP. I was happy to do this as it felt a lot less hacky than what I had to do with OctoberCMS. 
 
There is still some development to do and things to work out but enough is in for me to get blogging again!