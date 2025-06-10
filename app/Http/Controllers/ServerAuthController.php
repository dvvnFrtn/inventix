<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class ServerAuthController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Email harus diisi *',
            'password.required' => 'Password harus diisi *',
        ]);

        $exits = Users::where('user_email', $request->email)->exists();

        if ($exits) {
            return true;
        }

        return redirect()->back()->with('error', 'Autentikasi gagal. Email atau password salah.')->withInput();
    }
}
