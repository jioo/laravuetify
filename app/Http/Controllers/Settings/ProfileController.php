<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfile;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     *
     * @param  App\Http\Requests\UpdateProfile $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfile $request)
    {
        $user = $request->user();
        return tap($user)->update($request->only('name'));
    }
}
