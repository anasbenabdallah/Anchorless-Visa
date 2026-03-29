<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

Route::get('/files', [FileController::class, 'index']);
Route::post('/upload', [FileController::class, 'upload']);
Route::delete('/files/{id}', [FileController::class, 'delete']);