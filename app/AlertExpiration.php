<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlertExpiration extends Model
{
    protected $table = 'alert_expirations';
    protected $primaryKey = 'id';
}
