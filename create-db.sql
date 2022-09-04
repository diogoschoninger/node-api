CREATE DATABASE IF NOT EXISTS `test-node-api`;
USE `test-node-api`;

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `cpf` char(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO `customers` (`id`, `name`, `cpf`) VALUES
	(1, 'João', '12345678910'),
	(2, 'José', '32165498701'),
	(3, 'André', '98765432101'),
	(4, 'Maria', '78945612345'),
	(5, 'Ana', '75335775312');
