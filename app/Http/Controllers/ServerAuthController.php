<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Users;
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

        $exits = User::where('user_email', $request->email)->exists();

        if ($exits) {
            $user_collect = User::where('user_email', $request->email)->first();

            $user = [
                'user_id' => $user_collect->user_id,
                'user_email' => $user_collect->user_email,
                'user_fullname' => $user_collect->user_fullname,
                'user_role' => $user_collect->user_role,
            ];

            if ($user_collect->user_role === 'guru') {
                session([
                    'is_guru' => true,
                    'user' => $user
                ]);
            } elseif ($user_collect->user_role === 'admin') {
                session([
                    'is_admin' => true,
                    'user' => $user,
                ]);
            } elseif ($user_collect->user_role === 'petugas') {
                session(
                    [
                        'is_petugas' => true,
                        'user' => $user
                    ]
                );
            }

            return redirect('/dashboard');
        }

        return redirect()->back()->with('error', 'Autentikasi gagal. Email atau password salah.')->withInput();
    }
}
