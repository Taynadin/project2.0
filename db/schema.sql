DROP DATABASE IF EXISTS properties;

CREATE DATABASE properties;

USE properties;
    CREATE TABLE properties (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `address` varchar(255) DEFAULT NULL,
    `city` varchar(255) DEFAULT NULL,
    `zipcode` varchar(255) DEFAULT NULL,
    `bedroom` int(11) DEFAULT NULL,
    `bathroom` int(11) DEFAULT NULL,
    `guest` int(11) DEFAULT NULL,
    `description` text,
    `price` decimal(10,2) DEFAULT NULL,
    `image` text DEFAULT NULL,
    PRIMARY KEY (`id`)
    );

