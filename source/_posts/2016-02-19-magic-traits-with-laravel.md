---
title: Magic Traits with Laravel
categories:
    - web-dev
tags:
    - laravel
    - php
featured_image: magic.jpg
featured_image_credit_text: d4m via Deviant Art
featured_image_credit_url: http://d4m.deviantart.com/art/Its-Magic-90587575
---
The traditional use of traits is to reduce code duplication by extracting common methods into its own 'class'. The trait can then be used in multiple classes to add some functionality.

To give a brief example, let's think about a spaceship class, specifically the Battlestar Galactica...

All spaceships need a way to move so how about we make a trait that will be used my multiple ships giving it the FTL capabilities.

```php
<?php

namespace BSG\Ships\Components;

trait FTLDrive
{
    public function startJumpDrive()
    {
        // Do FTL related stuff here.
    }
}

```

Now Galactica uses the trait giving it the ability to spin up it's newly installed FTL drive.

```php
<?php
namespace BSG\Ships;

use BSG\Ships\Components\FTLDrive;

class Galactica
{
    use FTLDrive;
}

$galactica = new Galactica;
$galactica->startJumpDrive();
``` 

## Laravel's Magic Traits

_Disclaimer: Laravel might not have been the first to do this but it is where I learnt about it and how to implement it in this particular way._

In contrast to the traditional way of using traits, simply using Laravel's 'magic' traits in a class the class performs extra functionality automatically. 

A real example of Laravel using this is its testing suite. Taking a look at Laravel's [ExampleTest][laravels example test] you can see it has three `use` statements.

[laravels example test]: https://github.com/laravel/laravel/blob/master/tests/ExampleTest.php

```php
<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    //
}
```

`WithoutMiddleware`, `DatabaseMigrations`, and `DatabaseTransactions` are all traits which can help with testing. 

For instance, if we `use DatabaseMigrations` the database will be refreshed automatically before each test without having to do anything else. This makes for such a good user experience as it is totally painless to use.

Behind the scenes the `TestCase` takes the following steps to implement this flawless functionality.

The `startUp` method of the `TestCase` calls a method called [setUpTraits][setUpTraits]. First off it figures out what traits are being used.

[setUpTraits]: https://github.com/laravel/framework/blob/5.2/src/Illuminate/Foundation/Testing/TestCase.php#L93

```php
$uses = array_flip(class_uses_recursive(get_class($this)));
```

Then if a trait is being used it calls a method to perform the intended actions.

```php
if (isset($uses[DatabaseMigrations::class])) {
    $this->runDatabaseMigrations();
}
```

Now, this could always be done manually. You add the trait and then call the method yourself but automating this process has it's advantages.

- It saves time, drop a trait in and it's all set up and ready to go now crack on with the real development.
- Reduces [Cognitive load][Cognitive load]. At a glance the perfectly named traits make it easy to consume that the class is (for example) using database migrations with no other fluff getting in the way.

[Cognitive load]: https://en.wikipedia.org/wiki/Cognitive_load

## Using Magic Traits

Once I had discovered this way of improving a classes API by using this 'Magic Trait' pattern I decided to implement it in one of my own projects. Taking inspiration from Laravel's TestCase my [Base Repository][Base Repository] now allows a developer to drop a trait in and have a repository throw exceptions or cache it's results but more on that when I release Version 1 soon!

[Base Repository]: https://github.com/dannyweeks/laravel-base-repository