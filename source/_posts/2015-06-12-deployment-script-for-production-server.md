---
title: Deployment Script For Production Server
featured_image: deploy.jpg
categories:
    - web-dev
tags:
    - devops
---
For a while I have wanted to have a script that deploys updates to a website cleanly and easily. I recently found the time to create such a script and am pretty happy with the first version! Having not really spent any time with creating bash scripts it took a bit of googling research to get started.

<!--more-->

Deploying updates to the website requires a number of tasks to ensure it is ready to be used. Our workflow involves using a Git repository to host our Laravel app. Database migrations to keep our databases in sync. Composer and bower to ensure our respective vendor packages are installed and up to date and SCSS as our preprocessor of choice.

This workflow needs to also be applied when updating the production server. In the past this has been a long manual process and I wanted to automate it for two reasons. The first being that it is time consuming and the second to make it more accessible to team members who aren’t confident in using the command line on the server.

## The Script


- Define colours to be used with formatting
- Define a function to help with breaking up each action the script is performing
- Show a little yellow rubber duck (A running joke in our team in reference to Rubber [Duck Debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging))
- Get the most up to date version of the site from our Git repo
- Update PHP packages using composer
- Update the database tables according to the migration files
- Update the JS packages using bower
- Compile the latest CSS using compass
- Once complete show the universal sign that everything is good to go

```bash
#!/bin/bash
NC='\033[0m'
CYAN='\033[0;36m'
LRED='\033[1;31m'
YELLOW='\033[1;33m'

lines()
{
    echo -e "${LRED}________________________________________${NC}${CYAN}"
    echo -e "                                                          "
    echo -e "  " $1
    echo -e "${NC}${LRED}________________________________________${NC}"
    echo -e "                                                          "
}

clear

lines "Lets get deploying!"

echo -e "${YELLOW}"

cat << "EOF"
               __
             <(o )___
              ( ._> /
               `---' Quack Quack
EOF

echo -e "${NC}"

lines "Grabbing latest version from git..."
git pull

lines "Updated php packages..."
composer update -n --no-dev

lines "Making sure the database is up to date..."
php artisan migrate --force

lines "Updating the JS files..."
cd public
bower update

lines "Compiling CSS"
compass compile

cat << "EOF"
        _
       /(|
      (  :
     __\  \  _____
   (____)  `|
  (____)|   |
   (____).__|
    (___)__.|_____
EOF

lines "All done!"
```

## Future Development

The next step would be to implement continuous integration into our workflow so this process is even more automated.
