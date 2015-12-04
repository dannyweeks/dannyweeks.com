---
title: Handling Errors In Laravel 5.1
featured_image: whoops.png
categories:
    - Web Dev
---
I have finally gotten around to documenting what I find to be the best setup for error handling in Laravel 5.1

- Laravel 4’s Whoops error page
- HTTP Code Specific Views
- Fallback HTTP Code Views

I first started using Laravel at version 4 and got used to the detailed yet pretty to look of the ‘Whoops’ error screen. [Matt Stauffer][matt whoops] wrote a great post explaining how to get Whoops working in Laravel 5 but if you are following a long here all you need to do is `composer require filp/whoops:~1.0` and I’ll explain the rest later on!

[matt whoops]: https://mattstauffer.co/blog/bringing-whoops-back-to-laravel-5

Most of our changes are in `app/Exceptions/Handler.php` so let’s jump in there make some changes, first adding a method then making some changes to the `render()` method.

First, lets add the following method to the `Handler` class.

```php
Most of our changes are in app/Exceptions/Handler.php so let’s jump in there make some changes, first adding a method then making some changes to the render() method.

First, lets add the following method to the Handler class.
```

renderHttpExceptionView() adds the ability to have a default response to any HTTP error that doesn’t have a specific view.

As given to us by [Matt][matt whoops], it’s time to add the good old Whoops support.

```php
/**
     * Render an exception using Whoops.
     *
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    protected function renderExceptionWithWhoops(Exception $e)
    &lbrace;
        $whoops = new \Whoops\Run;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());

        return new \Illuminate\Http\Response(
            $whoops->handleException($e),
            $e->getStatusCode(),
            $e->getHeaders()
        );
    &rbrace;
```

Now to update the `render()` method!

```php
/**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    &lbrace;
        if ($this->isHttpException($e)) &lbrace;
            return $this->renderHttpExceptionView($e);
        &rbrace;

        if (config('app.debug')) &lbrace;
            return $this->renderExceptionWithWhoops($e);
        &rbrace;

        return parent::render($request, $e);
    &rbrace;
```


Finally, we just have to create `resources/views/errors/default.blade.php` to be used as our fallback. If an error message is set it will display it, otherwise it will default to use the description for the thrown HTTP status code.

```php
@extends('template.master')

@section('content')
    <h1>
        &lbrace;&lbrace; $exception->getStatusCode() &rbrace;&rbrace;
    </h1>

    <p>
        @if(!empty($exception->getMessage()))
            &lbrace;&lbrace; $exception->getMessage() &rbrace;&rbrace;
        @else
            &lbrace;&lbrace; \Symfony\Component\HttpFoundation\Response::$statusTexts[$exception->getStatusCode()] &rbrace;&rbrace;
        @endif
    </p>

@endsection
```