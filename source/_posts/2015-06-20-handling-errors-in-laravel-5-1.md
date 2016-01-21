---
title: Handling Errors In Laravel 5.1
featured_image: whoops.png
categories:
    - web-dev
tags: 
    - laravel
    - php
---
I have finally gotten around to documenting what I find to be the best setup for error handling in Laravel 5.1

<!--more-->

- Laravel 4’s Whoops error page
- HTTP Code Specific Views
- Fallback HTTP Code Views

I first started using Laravel at version 4 and got used to the detailed yet pretty to look of the ‘Whoops’ error screen. [Matt Stauffer][matt whoops] wrote a great post explaining how to get Whoops working in Laravel 5 but if you are following a long here all you need to do is `composer require filp/whoops:~1.0` and I’ll explain the rest later on!

[matt whoops]: https://mattstauffer.co/blog/bringing-whoops-back-to-laravel-5

Most of our changes are in `app/Exceptions/Handler.php` so let’s jump in there make some changes, first adding a method then making some changes to the `render()` method.

First, add the following method to the `Handler` class.

renderHttpExceptionView() adds the ability to have a default response to any HTTP error that doesn’t have a specific view.

As given to us by [Matt][matt whoops], it’s time to add the good old Whoops support.
{% verbatim %}
```php
/**
     * Render an exception using Whoops.
     *
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    protected function renderExceptionWithWhoops(Exception $e)
    {
        $whoops = new \Whoops\Run;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());

        return new \Illuminate\Http\Response(
            $whoops->handleException($e),
            $e->getStatusCode(),
            $e->getHeaders()
        );
    }
```
{% endverbatim %}

Now to update the `render()` method!
{% verbatim %}
```php
/**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($this->isHttpException($e)) {
            return $this->renderHttpExceptionView($e);
        }

        if (config('app.debug')) {
            return $this->renderExceptionWithWhoops($e);
        }

        return parent::render($request, $e);
    }
```
{% endverbatim %}


Finally, we just have to create `resources/views/errors/default.blade.php` to be used as our fallback. If an error message is set it will display it, otherwise it will default to use the description for the thrown HTTP status code.

{% verbatim %}
```php
@extends('template.master')

@section('content')
    <h1>
        @{{ $exception->getStatusCode() }}
    </h1>

    <p>
        @if(!empty($exception->getMessage()))
            @{{ $exception->getMessage() }}
        @else
            @{{ \Symfony\Component\HttpFoundation\Response::$statusTexts[$exception->getStatusCode()] }}
        @endif
    </p>

@endsection
```
{% endverbatim %}