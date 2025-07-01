<?php
use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
