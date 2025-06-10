<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientAuthController extends Controller
{
    public function index()
    {
        return 
        view('templates.header') . 
        view('templates.navbar') . 
        view('auth.index') . 
        view('templates.footer');
    }
}
