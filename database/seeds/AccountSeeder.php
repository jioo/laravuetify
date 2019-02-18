<?php

use App\User;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** Default admin account */
        User::create([
            'name' => 'Justine Joshua Quiazon',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
        ])->assignRole('admin');
        
        /** Default user account */
        User::create([
            'name' => 'John Doe',
            'email' => 'jdoe@gmail.com',
            'password' => bcrypt('123456'),
        ])->assignRole('user');
    }
}
