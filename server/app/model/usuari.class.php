<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Resposta;
use PDO;
use Exception;

class Usuari
{
    private $conn;       //connexió a la base de dades (PDO)
    private $resposta;   // resposta

    public function __CONSTRUCT()
    {
        $this->conn = Database::getInstance()->getConnection();
        $this->resposta = new Resposta();
    }

    public function getAll($orderby = "codiusuari")
    {
        try {
            $result = array();
            $stm = $this->conn->prepare("SELECT * FROM usuari ORDER BY $orderby");
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

    public function getOne($codiusuari)
    {
        try {
            $result = array();
            $stm = $this->conn->prepare("SELECT * FROM usuari WHERE codiusuari='$codiusuari'");
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

    public function getCodiByEmail($email)
    {
        try {
            $result = array();
            $stm = $this->conn->prepare("SELECT codiusuari FROM usuari WHERE email='$email'");
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

    public function login($email, $passwd)
    {

        try {
            $sql = "SELECT codiusuari,nom,email FROM usuari WHERE email='$email' and password='$passwd'";
            $stm = $this->conn->prepare($sql);
            $stm->execute();
            if ($tupla = $stm->fetch()) {
                // Login correcta: genera token
                $token = bin2hex(openssl_random_pseudo_bytes(16));
                $tokenLimit = date('Y-m-d H:i:s', strtotime('+1 hour'));
                $sql = "UPDATE usuari SET token  = ?,tokenlimit= ? WHERE codiusuari = ?";
                $this->conn->prepare($sql)->execute(array($token, $tokenLimit, $tupla["codiusuari"]));
                // Afegim token a la resposta
                $tupla["token"] = $token;
                $this->resposta->setDades($tupla);    // array de tuples
                $this->resposta->setCorrecta(true);       // La resposta es correcta        
            } else {
                $this->resposta->setCorrecta(false, 0, "Login Incorrecte");
            }
            return $this->resposta;
        } catch (\Exception $e) {

            $this->resposta->setCorrecta(false, 0, $e->getMessage());

            return $this->resposta;
        }
    }
    function insertUsuari($nom, $email, $passwd)
    {
        try {
            $query = "INSERT INTO usuari (nom, email, password) VALUES ('$nom', '$email', '$passwd')";
            $stm = $this->conn->prepare($query);
            $stm->execute();
            $this->resposta->setCorrecta(true);       // La resposta es correcta
            return $this->resposta;
        } catch (Exception $e) {   // hi ha un error posam la resposta a fals i tornam missatge d'error
            $this->resposta->setCorrecta(false, $e->getMessage());
            return $this->resposta;
        }
    }
}
