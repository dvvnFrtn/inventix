<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::orderBy('created_at');

        if ($request->filled('role')) {
            $query->where('user_role', $request->role);
        }

        $users = $query->get();

        $role_options = [
            [
                'id' => 1,
                'name' => 'admin',
            ],
            [
                'id' => 2,
                'name' => 'petugas',
            ],
            [
                'id' => 3,
                'name' => 'guru',
            ],
        ];

        return Inertia::render(
            'UserPage',
            [
                'users' => UserResource::collection($users),
                'role_options' => $role_options,
            ],
        );
    }

    public function show(Request $request, string $id)
    {
        $query = User::where('user_id', $id)
            ->with('transaction.inventarisd.inventaris');

        $user = $query->first();
        return Inertia::render(
            'UserDetailPage',
            [
                'user' => UserResource::make($user),
            ],
        );
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'user_pass' => 'nullable|string|min:6',
            'user_fullname' => 'required|string|max:255',
        ]);

        if (!empty($validated['user_pass'])) {
            $user->user_pass = Hash::make($validated['user_pass']);
        }
        $user->user_fullname = $validated['user_fullname'];
        $user->save();

        return redirect()->back()->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $inventory = User::findOrFail($id);
        $inventory->delete();

        return redirect('/users')->with('success', 'User berhasil dihapus.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_email' => 'required|email|unique:users,user_email',
            'user_pass' => 'required|string|min:6',
            'user_fullname' => 'required|string|max:255',
            'user_role' => 'required|in:guru,petugas,admin',
        ]);

        User::create([
            'user_email' => $validated['user_email'],
            'user_pass' => Hash::make($validated['user_pass']),
            'user_fullname' => $validated['user_fullname'],
            'user_role' => $validated['user_role'],
        ]);

        return redirect()->back()->with('success', 'User berhasil ditambahkan.');
    }
}
