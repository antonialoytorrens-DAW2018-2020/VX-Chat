<?php

use App\Model\Missatge;
use App\Model\Usuari;

$app->group('/missatge/', function () {
    $this->get('', function ($req, $res, $args) {
        $obj = new Missatge();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->getAll()
                )
            );
    });
    $this->post('', function ($req, $res, $args) {
        $atributs = $req->getParsedBody();
        $obj = new Missatge();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->enviarmissatge($atributs["codiusuari"], $atributs["msg"])
                )
            );
    });
});
