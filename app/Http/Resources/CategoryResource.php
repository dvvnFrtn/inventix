<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->category_id,
            'code' => $this->category_code,
            'name' => $this->category_name,
            'desc' => $this->category_desc,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
