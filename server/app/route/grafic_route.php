<?php

use App\Model\Missatge;

$app->group('/grafic/', function () {
    $this->post('', function ($req, $res, $args) {
        $obj = new Missatge();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->construeixGrafic()
                )
            );
    });
});
