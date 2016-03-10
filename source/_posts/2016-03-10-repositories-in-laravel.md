---
title: Repositories In Laravel
featured_image: repository.jpg
categories:
    - web-dev
tags:
    - laravel
    - repositories
    - open source
---
Amazingly the first commit to the [laravel-base-repository][repo] was way back in December 2014. This was really just a way of me storing it for reuse rather than it being a package. It was just the basics; mainly get type requests but they haven't changed much since. 

Back in October last year I decided to update it and publish it as a [composer][composer] package. 

## Version 1 has landed!

With Version 1 ten methods are provided out of the box. These methods assume the most common use case by default. An example of this is the default column fetching by column name is `slug`. 

Looking at the the repository from a [CRUD][crud] prospective the methods can be categorised into the following areas:

#### Create
- `create(array $data);` 

#### Read
- `getById($id);`
- `getItemByColumn($term, $column = 'slug');`
- `getActively($term, $column = 'slug');` *
- `getAll($columns = null, $orderBy = 'created_at', $sort = 'DECS');`
- `getPaginated($paged = 15, $orderBy = 'created_at', $sort = 'DECS');`
- `getForSelect($data, $key = 'id', $orderBy = 'created_at', $sort = 'DECS');` **
- `getCollectionByColumn($term, $column = 'slug');`

#### Update
- `updateOrCreate(array $identifiers, array $data);` ***

#### Delete
- `delete($id);`

<small>

\* If `$term` is numeric it assumes it is an ID; otherwise search by column.

\** Returns array where key is the row id &amp; value is the data requested. Intended for use in a &lt;select&gt; element.

\** Standard update is usually done on a model item itself.

</small>

## How To Use

Taking advantage of the base repository couldn't be easier!

After installing using [Composer][composer] `composer require dannyweeks/laravel-base-repository` it's just a case of creating your repositories.

All that is necessary is have you repository extend the `BaseEloquentRepository` class and set the `model` property to a string representation of the eloquent class you want the repository to represent.

```php
<?php

namespace App\Repositories;

class PostRepository extends \Weeks\Laravel\Repositories\BaseEloquentRepository
{
    protected $model = \App\Models\Post::class;
}
```

Now creating a new repository gives you access to the base methods.

```php
<?php
$postsRepo = new PostRepository();
$post = $postsRepo->getById(1); // Fetched post with id of 1.
```

## Use Case Example

Using the repository we created above how could we use it? Lets picture our `PostsController`.

```php
<?php 

namespace App\Http\Controllers;

use App\Models\Post;
use App\Repositories\PostRepository;

class PagesController extends Controller
{
    protected $posts;

    public function __construct(PostRepository $posts)
    {
        $this->posts = $posts;
    }

    public function index()
    {
        $posts = $this->posts->getAll();

        // Or if we wanted to paginate the posts collection we could use 
        // $posts = $this->posts->getPaginated();

        return view('posts.index', compact('posts'));
    }

    public function show($id)
    {
        $post = $this->posts->getById($id);

        return view('posts.show', compact('post'));
    }
}
```

As you can see it is very clean to access the repository and it provides the benefit of using its default parameters such as not having to specify what we want the posts on our index page to be ordered by the date they were created starting with the most recent.

## Relationships

Early on in the development of this base repository I had to figure out how to include relationships such as the author of the post etc. The first choice (and obvious one in retrospect) was to either eagerly load relationships or have the developer choose what to load.

I came up with a solution which I think covers all bases. 

After defining the relationships in the repository `protected $relationships = ['comments', 'author', 'tags'];` you can include them in three different ways.

### Grab 'Em All

```php
<?php
$postsRepo = new PostRepository();
$post = $postsRepo->with->('all')->getById(1); 
```

This eagerly loads all the relationships defined in the repository's `$relationships` property.

### Just The One

```php
<?php
$postsRepo = new PostRepository();
$post = $postsRepo->with->('author')->getById(1); 
```

Providing a string (with the exception of all) will attempt to load that relationship. E.g.the above eagerly loads just the author with the post.


### Gettin' Specific
```php
<?php
$postsRepo = new PostRepository();
$post = $postsRepo->with->(['author', 'comments'])->getById(1); 
```

Passing an array of relationships into the with method will just include them in the query.

## Optional Helpers

Version 1 ships with two traits that can be added into your repository to give it additional functionality without any extra configuration. I have dubbed these traits [magic traits][magic traits] and have written a blog about them and how Laravel itself uses them.

### Throw HTTP Exceptions

Using the `ThrowsHttpExceptions` trait in your repository it will throw HTTPException (404). For example if we were to use this trait in the repository being used in our use case example above if the user tried to navigate to the show method with an `$id` that doesn't exist they will be shown a 404 page. 

```php
<?php

namespace App\Repositories;

use Weeks\Laravel\Repositories\BaseEloquentRepository;
use Weeks\Laravel\Repositories\Traits\ThrowsHttpExceptions;

class PostRepository extends BaseEloquentRepository
{
    use ThrowsHttpExceptions;

    protected $model = App\Models\Post::class;
}
```

### Cache Results

Similarly to the http error trait you can add the `CacheResults` trait to your repository. This will then cache results of the call using Laravel's cache. See the [Cache section][cache] of the README to learn more. 

```php
<?php

namespace App\Repositories;

use Weeks\Laravel\Repositories\BaseEloquentRepository;
use Weeks\Laravel\Repositories\Traits\CacheResults;

class PostRepository extends BaseEloquentRepository
{
    use CacheResults;

    protected $model = App\Models\Post::class;
}
```

The [HTTPException][http] and [CacheResults][cache] traits can be disabled programatically see the README for more information.


## Testing 

I decided to not only unit test this repository but it also tests against a real database using Eloquent to ensure all the features are working as expected.

## Future Development

As I use it more and more and run into new situation I may think of other methods that need adding or even new Traits which could be used. 

Contributions are welcomed, just send a pull request or open an issue!


[repo]: https://github.com/dannyweeks/laravel-base-repository
[crud]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[composer]: https://getcomposer.org/
[http]: https://github.com/dannyweeks/laravel-base-repository#http-exceptions
[cache]: https://github.com/dannyweeks/laravel-base-repository#caching
[magic traits]: /blog/2016/02/19/magic-traits-with-laravel/