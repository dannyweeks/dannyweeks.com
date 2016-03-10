---
title: Introducing Mersey – A Server Management Tool
featured_image: mersey.jpg
categories:
    - web-dev
tags:
    - composer
    - php
    - devops
    - open source
---

In my job I have to maintain a few servers with multiple projects. We have the old Ubuntu 12.04 running special software, two Ubuntu 14.04 servers (one is prettier than the other) and then throw in our VPS too and thats just the servers at work! Jumping between all of these was becoming tedious; a different password to remember at every turn. I had to do something for the sake of my sanity.

<!--more-->

I first set up aliases. Then SSH to replace the need for passwords. This worked fine but all it did was save me the need to type the full SSH command. I still had to do what ever I was doing which often was something I had done time and time again: look at server logs or [run a deployment script][deploy] etc.

My next bright idea was to write a small bash script that could automate this a little. Allow me to run the deployment script as well as connect to the server. This worked really well. It reminded me of when I first started tinkering with batch files back in the day.

[deploy]: /blog/2015/06/12/deployment-script-for-production-server

![](/images/uploads/2015/11/server-bash-script.png)

> The first draft

## The Birth Of _Mersey_

I’ll get this part out of the way. I’m not the best at [naming things][naming things] so I rolled with the first thing that had some logic behind it! Mersey, a river near Liverpool with two traffic tunnels. The tunnels connect one place to another, similar to how this tool connects you to your servers! That’s it! Moving on.

The bash script was a good start; it even had a little interface but it lacked the flexibility that higher level programming languages offer. I wanted it to be easy to get set up and use for other people; taking advantage of some kind of config file to load the servers on the fly. It is obviously possible to use bash but it would have taken me a long time. I needed something familiar. Queue using PHP.

I have had some exposure to [Symfony’s Console Component][symfony] via Laravel’s console commands but never used it directly so this was my chance to have a little tinker! For the config, I decided to go with json as I, along with most devs nowadays love working with it! After I was happy with the functionality and features the first version of [Mersey][mersey] and my first package was released to the world!

![](/images/uploads/2015/11/project.gif)
> Quickly jump into a project root.

Multiple servers can be stored in the config file with servers having optional projects and projects having optional scripts that can be run on them. A more detailed explanation of this and how to install it can be found in the [readme] of Mersey.

![](/images/uploads/2015/11/mersey-ping.gif)

Additionally there are some commands which provide information such as the ping command showing the availability of the servers.

So far I’m pretty happy with it as it saves me so much time! You can find the Mersey server tool on [GitHub][mersey]. I welcome feature requests or if you want, feel free to [contribute][contribute]!

[naming things]: http://core0.staticworld.net/images/idge/imported/article/itw/2013/10/23/programmers_hardest_tasks-600x700-100521914-orig.jpg
[symfony]: http://symfony.com/doc/current/components/console/introduction.html
[mersey]: https://github.com/dannyweeks/mersey
[readme]: https://github.com/dannyweeks/mersey#readme
[contribute]: https://github.com/dannyweeks/mersey/blob/master/CONTRIBUTING.md





