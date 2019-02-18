<?php

namespace App\Http\Requests;

use App\Rules\ValidateOldPassword;
use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Validation\ValidationException;

class UpdatePassword extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        /** Get the current user */
        $user = $this->user();

        return [
            'old_password' => ['required', new ValidateOldPassword($user)],
            'password' => 'required|min:6|confirmed',
        ];
    }
}
