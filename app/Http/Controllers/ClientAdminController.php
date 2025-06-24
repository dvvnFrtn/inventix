<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class ClientAdminController extends Controller
{
    protected $menu = [
        [
            'name' => 'Dashboard',
            'label' => 'dashboard',
            'url' => 'dashboard-admin',
            'icon' => 'fas fa-dashboard'
        ],
        [
            'name' => 'Manajemen admin aplikasi',
            'label' => 'manajemen-admin',
            'url' => 'manajemen-admin',
            'icon' => 'fas fa-user'
        ],
    ];

    public function index()
    {
        return
            view('templates.header') .
            view('templates.startbar', [
                'name' => 'Dashboard',
                'page' => 'dashboard',
                'menu' => $this->menu
            ]) .
            view('admin.index') .
            view('templates.endbar') .
            view('templates.footer');
    }

    public function inventoriesDetail()
    {
    }
}
