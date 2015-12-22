---
title: SASS – Expanding My Horizons
featured_image: scss.jpg
categories:
    - web-dev
tags:
    - compass
    - css
    - sass
    - scss
---
Isn’t CSS great. When you first learn about the powers of CSS you feel so empowered. Anything seems possible and everything is great. But that sensation can only last so long. Your markup looks so much cleaner using CSS and it makes styling your website much easier. However, since I past that honeymoon period of using CSS I have wished it could do more.

<!--more-->

## What I aim to achieve

I feel like this blog is going to be a bit of organised chaos as it is partly a tutorial and partly me stating I am “expanding my horizons”. So just to clarify I want to explain the point of this blog post!

As a web developer you have to be open to learning new things as it’s such a dynamic environment to work in. I enjoy learning new techniques and skills, especially if they help me be more productive and efficient in my projects. Sass is certainly going to help me in the future and I want to share this experience with you so you can see how I develop this skill set over time.

Lets just get things straight, I am assuming you have researched Sass and/or Compass and just need some guidance with getting started.

There were two things I wished you could do with it CSS. Firstly the use of variable’s, wouldn’t it be great to have a variable for that colour you always use. Secondly I thought it would be great to nest css elements instead of having to define multiple things such as `nav ul li a`.

When I discovered there was something out there that could achieve my wishes and much more I was excited to learn about it and start using it. One thing that stopped me from using it instantly as a misconception that your server had to have SASS and therefor Ruby installed I was put off because it was another long process of fighting with the hosting company. Well, I was very wrong. SASS and ruby are installed on your development PC which is fine. I can deal with that for the benefits it will bring.

## Making the first move

Another thing that stopped me from using SASS is that I didn’t want to commit to having to learn a new language while I am so busy with work and freelance projects. Again, my naivety failed me. The great thing I learnt was that you can use pure CSS as SCSS (the modern version of SASS). This means you can learn as you go not slowing down productivity. So this is what I have started. In my latest freelance project I am using SCSS from the outset and can already see the benefits its providing.

## What I have learnt so far
### Installation

Getting all set up to use SASS is really simple. The steps easy:

- Install [ruby][ruby]. Being sure to tick “Add ruby executables to your PATH”.
- <del>Install Sass.</del> Skip this
- Install [Compass][compass]. Enter `gem install compass` in your command line. This installs sass as well
[ruby]: http://rubyinstaller.org/downloads/
[compass]: http://compass-style.org/

Yes, I told you to install compass over sass. Compass is a framework for sass which has plenty of useful mixins(functions) but I wont talk about this now. All you need to know is installing Compass just adds even more.

### Getting Started

Getting started is easy. In your command line navigate to your project folder in the command line and use command `compass create`. This generates all the files you will need for your project.

Now its all installed and you have your project folder ready you need to use
`compass watch --output-style=compressed` in your command line to tell compass to look out for changes to that project.

Open the scss folder and open up screen.scss and hack away.

### Using SCSS and Sublime Text 2

As you may know from my blog about what to use when developing Sublime Text 2 is my text editor of choice, so naturally this is the only one I bothered to find code highlighters for. I found [this](https://github.com/n00ge/sublime-text-haml-sass) git repository which works great and is very easy to use. Just take a look at the read me file its simple.

### Best Practices, Tips and Standards

When I’m starting something new I try and pick up good habbits from the start. Using Sass is no exception, there are plenty of blogs out there that talk about best practices and standards. Id like to give you the ones I have discovered to make sense.

- The [Inception Rule][1] with nested selectors is a must
- The use of the “[_base][2] partial helps to break down your code
- Further to the above point, [structuring your whole project][3] similar to this would be => , beneficial.

[1]: http://thesassway.com/beginner/the-inception-rule%20target=
[2]: http://compass-style.org/help/tutorials/best_practices/
[3]: http://thesassway.com/beginner/how-to-structure-a-sass-project

## Final Note
If you have any questions, additions or thoughts please leave a comment below as I would love to hear what you have to say.