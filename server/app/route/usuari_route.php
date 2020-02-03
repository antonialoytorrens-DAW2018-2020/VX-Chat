<?php

use App\Model\Usuari;

$app->group('/usuari/', function () {
    $this->get('', function ($req, $res, $args) {
        $obj = new Usuari();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->getAll()
                )
            );
    });

    $this->get('{id}', function ($req, $res, $args) {
        $obj = new Usuari();
        return $res
            ->withHeader('Content-type','application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->getOne($args["id"])
                )
            );
    });
    $this->post('', function ($req, $res, $args) {
        $atributs = $req->getParsedBody();
        $obj = new Usuari();
        return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $obj->insertUsuari($atributs["nom"], $atributs["email"], $atributs["password"])
                )
            );
    });
});