<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Response;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::orderBy('created_at');

        if ($request->filled('role')) {
            $query->where('user_role', $request->role);
        }

        $users = $query->get();

        $role_options = [
            [
                'id' => 1,
                'name' => 'admin'
            ],
            [
                'id' => 2,
                'name' => 'petugas'
            ],
            [
                'id' => 3,
                'name' => 'guru'
            ],
        ];

        return Response::json(
            [
                'users' => UserResource::collection($users),
                'role_options' => $role_options
            ]
        );
    }

    public function show(Request $request, string $id)
    {
        $query = User::where('user_id', $id)
            ->with('transaction.inventarisd.inventaris');

        $user = $query->first();
        return Response::json(
            [
                'user' => UserResource::make($user)
            ]
        );
    }
}
