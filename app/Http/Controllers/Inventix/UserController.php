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
    public function index(): JsonResponse
    {
        $users = User::with('transaction.inventarisd')
            ->orderBy('created_at')
            ->get();

        return Response::json(
            [
                'users' => UserResource::collection($users)
            ]
        );
    }
}
