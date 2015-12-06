---
title: Website Re-Work
categories:
    - My Thoughts
    - Web Dev
tags:
    - sculpin
    - octobercms
draft: true
---
I've been meaning to rebuild my website for over a year now. Ever since I renounced freelance work it had became pretty obsolete. I decommissioned it and had it redirect to my blog. It was time for a new build.  

My website was built in Laravel 4 and blog was Wordpress. 


OctoberCMS

Very happy with the backend cms aspects. Blog would be a pleasure to use with preview

looks like I had to create my own plugin to extend the default plugin.

issue was deployment
- had to modify the october source code to use env variables but dint want add the whole october app to source control. 

with wordpress I just have the app in source control. The stubling blcok is to combo of having to have my own 'plugin' which i didnt want to publish just to be able to install it on the server.
