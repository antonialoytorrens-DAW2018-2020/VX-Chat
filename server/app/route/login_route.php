<?php

use App\Model\Usuari;

$app->group('/login/', function () {
    $this->post('', function ($req, $res, $args) {
        $atributs = $req->getParsedBody();
        $obj = new Usuari();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->login($atributs["email"], $atributs["password"])
                )
            );
    });
});
