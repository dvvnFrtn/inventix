<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->transaction_id,
            'code' => $this->transaction_code,
            'desc' => $this->transaction_desc,
            'start' => $this->transaction_start,
            'end' => $this->transaction_end,
            'status' => $this->transaction_status,
            'user' => UserResource::make(
                $this->whenLoaded('user')
            ),
            'unit' => InventarisDResource::make(
                $this->whenLoaded('inventarisd')
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
