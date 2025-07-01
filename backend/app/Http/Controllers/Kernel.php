<?php

namespace App\Http\Controllers;

class Kernel
{
    protected $middleware = [
        \Fruitcake\Cors\HandleCors::class,
        // other middleware...
    ];
}
