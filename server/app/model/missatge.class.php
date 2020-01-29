<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Resposta;
use PDO;
use Exception;

class Missatge
{
    private $conn;       //connexió a la base de dades (PDO)
    private $resposta;   // resposta

    public function __CONSTRUCT()
    {
        $this->conn = Database::getInstance()->getConnection();
        $this->resposta = new Resposta();
    }

    public function getAll($orderby = "codimissatge")
    {
        try {
            $result = array();
            $stm = $this->conn->prepare("SELECT * FROM missatge ORDER BY $orderby");
            $stm->execute();
            $tuples = $stm->fetchAll();
            $this->resposta->setDades($tuples);    // array de tuples
            $this->resposta->setCorrecta(true);       // La resposta es correcta
            return $this->resposta;
        } catch (Exception $e) {   // hi ha un error posam la resposta a fals i tornam missatge d'error
            $this->resposta->setCorrecta(false, $e->getMessage());
            return $this->resposta;
        }
    }

    public function getOne($codimissatge)
    {
        try {
            $result = array();
            $stm = $this->conn->prepare("SELECT * FROM missatge WHERE codimissatge='$codimissatge'");
            $stm->execute();
            $tuples = $stm->fetchAll();
            $this->resposta->setDades($tuples);    // array de tuples
            $this->resposta->setCorrecta(true);       // La resposta es correcta
            return $this->resposta;
        } catch (Exception $e) {   // hi ha un error posam la resposta a fals i tornam missatge d'error
            $this->resposta->setCorrecta(false, $e->getMessage());
            return $this->resposta;
        }
    }

    public function enviarmissatge($codiusuari, $text) {
        try {
            $result = array();
            $stm = $this->conn->prepare("INSERT INTO missatge (codiusuari, msg) VALUES ('$codiusuari', '$text')");
            $stm->execute();
            $this->resposta->setCorrecta(true);       // La resposta es correcta
        } catch (Exception $e) {   // hi ha un error posam la resposta a fals i tornam missatge d'error
            $this->resposta->setCorrecta(false, $e->getMessage());
            return $this->resposta;
        }
    }

    public function rebremissatge($codiusuari, $codimissatge){
        try {
            $result = array();
            // modificar atribut darrermissatge. darrermissatge indica el darrer missatge que l'usuari ha vist. Per defecte, el 0 indica que no ha vist cap missatge.
            // L'atribut darrermissatge (llegit) mostra l'ID del darrer missatge que ha vist.
            // Mostrar els missatges que no ha vist i després s'actualitza sa taula per indicar que ha vist tots els missatges restants
            $stm = $this->conn->prepare("UPDATE INTO missatge SET darrermissatge='$codimissatge' WHERE codiusuari='$codiusuari')");
            $stm->execute();
            $this->resposta->setCorrecta(true);       // La resposta es correcta
        } catch (Exception $e) {   // hi ha un error posam la resposta a fals i tornam missatge d'error
            $this->resposta->setCorrecta(false, $e->getMessage());
            return $this->resposta;
        }
    }
}
