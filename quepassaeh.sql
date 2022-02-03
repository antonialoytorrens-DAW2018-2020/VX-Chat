DROP DATABASE IF EXISTS quepassaeh;
CREATE DATABASE quepassaeh;
USE quepassaeh;
-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Temps de generació: 06-02-2020 a les 02:28:43
-- Versió del servidor: 5.7.29-0ubuntu0.18.04.1
-- Versió de PHP: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `quepassaeh`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `missatge`
--

CREATE TABLE `missatge` (
  `codimissatge` int(11) NOT NULL,
  `codiusuari` int(11) NOT NULL,
  `msg` varchar(1000) COLLATE utf8mb4_bin DEFAULT NULL,
  `datahora` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Bolcament de dades per a la taula `missatge`
--

INSERT INTO `missatge` (`codimissatge`, `codiusuari`, `msg`, `datahora`) VALUES
(1, 71, 'Benvingut al xat! Per favor, sigues respectuós amb cada un dels membres que formen la sala. Evita emprar tot tipus de llenguatge groller.', '2020-02-01 03:01:25');
-- --------------------------------------------------------

--
-- Estructura de la taula `usuari`
--

CREATE TABLE `usuari` (
  `codiusuari` int(11) NOT NULL,
  `nom` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `foto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `darrermissatge` int(11) NOT NULL DEFAULT '0',
  `darreracces` datetime DEFAULT NULL,
  `token` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tokenlimit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Bolcament de dades per a la taula `usuari`
--

INSERT INTO `usuari` (`codiusuari`, `nom`, `email`, `foto`, `password`, `darrermissatge`, `darreracces`, `token`, `tokenlimit`) VALUES
(71, 'Bones', 'bones@bones.com', NULL, 'bones', 0, NULL, '44b519980be7f506ce1539c96f86ec31', '2020-02-04 23:28:12'),
(73, 'Tonja', 'tonja@gmail.com', NULL, 'tonja', 0, NULL, '27e4f756e8a674cbd6622fde896f3775', '2020-02-05 03:54:42'),
(74, 'El pequeño Nicolás', 'pequenonicolas@gmail.com', NULL, 'nicolas', 0, NULL, '17da391e5eec410694e9156fb92137f8', '2020-02-05 20:47:28');

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `missatge`
--
ALTER TABLE `missatge`
  ADD PRIMARY KEY (`codimissatge`),
  ADD KEY `fk_missatge_usuari` (`codiusuari`);

--
-- Índexs per a la taula `usuari`
--
ALTER TABLE `usuari`
  ADD PRIMARY KEY (`codiusuari`),
  ADD UNIQUE KEY `u_usuari_email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `missatge`
--
ALTER TABLE `missatge`
  MODIFY `codimissatge` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=537;

--
-- AUTO_INCREMENT per la taula `usuari`
--
ALTER TABLE `usuari`
  MODIFY `codiusuari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `missatge`
--
ALTER TABLE `missatge`
  ADD CONSTRAINT `fk_missatge_usuari` FOREIGN KEY (`codiusuari`) REFERENCES `usuari` (`codiusuari`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
