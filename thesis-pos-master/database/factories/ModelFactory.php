<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
        'name' => str_random(6),
        'category' => rand(1, 6),
        'branch' => rand(1, 3),
        'purchase_price' => rand(1000, 5000),
        'selling_price' => rand(5000, 9000),
        'additional_description' => str_random(10),
        'reorder_point' => rand(1, 100),
        'running_balance' => rand(0, 350),
    ];
});
