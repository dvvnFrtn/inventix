<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventarisDResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->inventarisd_id,
            'code' => $this->inventarisd_code,
            'label' => $this->inventarisd_label,
            'description' => $this->inventarisd_desc,
            'status' => $this->inventarisd_status,
            'condition' => KondisiResource::make(
                $this->whenLoaded('kondisi')
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
