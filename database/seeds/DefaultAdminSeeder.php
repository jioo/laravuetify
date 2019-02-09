<?php

use App\User;
use Illuminate\Database\Seeder;

class DefaultAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Justine Joshua Quiazon',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
        ])->assignRole('admin');
    }
}
