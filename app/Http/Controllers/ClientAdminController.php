<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientAdminController extends Controller
{
    public function index()
    {
        return 
        view('templates.header') . 
        view('templates.startbar') . 
        view('admin.index') . 
        view('templates.endbar') . 
        view('templates.footer');
    }
}
