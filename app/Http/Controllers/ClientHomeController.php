<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientHomeController extends Controller
{
    public function index()
    {
        return 
        view('templates.header') . 
        view('templates.navbar') . 
        view('home.index') . 
        view('templates.footer');
    }
}
