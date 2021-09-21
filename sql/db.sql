CREATE DATABASE siglo21;

USE siglo21;

CREATE TABLE bodega (
  sku varchar(6) NOT NULL,
  nombre varchar(20) NOT NULL,
  categoria varchar(20) NOT NULL,
  marca varchar(20) NOT NULL,
  stock int(5) NOT NULL,
  detalle varchar(50) NOT NULL
)

DESCRIBE bodega;

