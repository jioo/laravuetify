<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /** @var \App\User */
    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->artisan('db:seed');

        $this->user = User::first();
    }

    /** @test */
    public function authenticate()
    {
        $this->postJson('/api/login', [
            'email' => $this->user->email,
            'password' => '123456',
        ])
        ->assertSuccessful()
        ->assertJsonStructure(['token', 'expires_in'])
        ->assertJson(['token_type' => 'bearer']);
    }

    /** @test */
    public function fetch_the_current_user()
    {
        $this->actingAs($this->user)
            ->getJson('/api/user')
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'email', 'role'])
            ->assertJson(['role' => ['admin'] ]);
    }

    /** @test */
    public function log_out()
    {
        $token = $this->postJson('/api/login', [
            'email' => $this->user->email,
            'password' => '123456',
        ])->json()['token'];

        $this->postJson("/api/logout?token=$token")
            ->assertSuccessful();

        $this->getJson("/api/user?token=$token")
            ->assertStatus(401);
    }
}
