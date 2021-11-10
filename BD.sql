CREATE TABLE administrador (
    id       VARCHAR2(50) 
     NOT NULL,
    nombre   VARCHAR2(50) 
    ,
    apellido VARCHAR2(50) 

);

ALTER TABLE administrador ADD CONSTRAINT administrador_pk PRIMARY KEY ( id );

CREATE TABLE bodega (
    sku               VARCHAR2(50) 
     NOT NULL,
    marca             VARCHAR2(50) 
    ,
    stock             INTEGER,
    detalle           VARCHAR2(50) 
    ,
    usuario_bodega_id VARCHAR2(50) 
     NOT NULL
);

CREATE UNIQUE INDEX bodega__idx ON
    bodega (
        usuario_bodega_id
    ASC );

ALTER TABLE bodega ADD CONSTRAINT bodega_pk PRIMARY KEY ( sku );

CREATE TABLE caja (
    id            VARCHAR2(50) 
     NOT NULL,
    fechah_inicio VARCHAR2(50) 
    ,
    fechah_final  VARCHAR2(50) 
    ,
    estado        VARCHAR2(50) 
    ,
    saldo_inicial NUMBER,
    saldo_final   NUMBER,
    finanza_id    VARCHAR2(50) 
     NOT NULL
);

CREATE UNIQUE INDEX caja__idx ON
    caja (
        finanza_id
    ASC );

ALTER TABLE caja ADD CONSTRAINT caja_pk PRIMARY KEY ( id );

CREATE TABLE cliente (
    id_cliente VARCHAR2(50) 
     NOT NULL,
    nombres    VARCHAR2(50) 
    ,
    apellidos  VARCHAR2(50) 
    ,
    rut        VARCHAR2(50) 
    ,
    fecha_nac  VARCHAR2(50) 
    ,
    email      VARCHAR2(50) 

);

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( id_cliente );

CREATE TABLE cocina (
    id       VARCHAR2(50) 
     NOT NULL,
    nombre   VARCHAR2(50) 
    ,
    apellido VARCHAR2(50) 
    ,
    tipo     VARCHAR2(50) 

);

ALTER TABLE cocina ADD CONSTRAINT cocina_pk PRIMARY KEY ( id );

CREATE TABLE detalle_pago (
    id              VARCHAR2(50) 
     NOT NULL,
    total_unitario  NUMBER,
    precio_unitario NUMBER,
    total           NUMBER,
    propina         NUMBER,
    pago_id         VARCHAR2(50) 
     NOT NULL
);

CREATE UNIQUE INDEX detalle_pago__idx ON
    detalle_pago (
        pago_id
    ASC );

ALTER TABLE detalle_pago ADD CONSTRAINT detalle_pago_pk PRIMARY KEY ( id );

CREATE TABLE finanza (
    id       VARCHAR2(50) 
     NOT NULL,
    nombre   VARCHAR2(50) 
    ,
    apellido VARCHAR2(50) 

);

ALTER TABLE finanza ADD CONSTRAINT finanza_pk PRIMARY KEY ( id );

CREATE TABLE garzon (
    id       VARCHAR2(50) 
     NOT NULL,
    nombre   VARCHAR2(50) 
    ,
    apellido VARCHAR2(50) 

);

ALTER TABLE garzon ADD CONSTRAINT garzon_pk PRIMARY KEY ( id );

CREATE TABLE ingrediente (
    id                 VARCHAR2(50) 
    ,
    nombre             VARCHAR2(50) 
    ,
    tipo               VARCHAR2(50) 
    ,
    platos_id          VARCHAR2(50) 
     NOT NULL,
    bodega_sku         VARCHAR2(50) 
     NOT NULL,
    acompañamientos_id VARCHAR2(50) 
     NOT NULL,
    bebida_id          VARCHAR2(50) 
     NOT NULL
);

CREATE TABLE menu (
    id        VARCHAR2(50) 
     NOT NULL,
    tipo_menu VARCHAR2(50) 
     NOT NULL,
    orden_id  INTEGER NOT NULL
);

CREATE UNIQUE INDEX menu__idx ON
    menu (
        orden_id
    ASC );

ALTER TABLE menu ADD CONSTRAINT menu_pk PRIMARY KEY ( id );

CREATE TABLE mesa (
    id        VARCHAR2(50) 
     NOT NULL,
    camarero  VARCHAR2(50) 
    ,
    sillas    INTEGER,
    zona      VARCHAR2(50) 
    ,
    garzon_id VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE mesa ADD CONSTRAINT mesa_pk PRIMARY KEY ( id );

CREATE TABLE orden (
    id                    INTEGER NOT NULL,
    hora_pedido           VARCHAR2(50) 
    ,
    hora_pedido_listo     VARCHAR2(50) 
    ,
    hora_pedido_entregado VARCHAR2(50) 
    ,
    plato                 VARCHAR2(50) 
    ,
    acompañamiento        VARCHAR2(50) 
    ,
    bebida                VARCHAR2(50) 
    ,
    cantidad_plato        INTEGER,
    cantidad_acomp        INTEGER,
    cantida_bebida        INTEGER,
    cliente_id_cliente    VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE orden ADD CONSTRAINT orden_pk PRIMARY KEY ( id );

CREATE TABLE pago (
    id         VARCHAR2(50) 
     NOT NULL,
    total      NUMBER,
    fecha_hora VARCHAR2(50) 
    ,
    tipo_pago  VARCHAR2(50) 
    ,
    caja_id    VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE pago ADD CONSTRAINT pago_pk PRIMARY KEY ( id );

CREATE TABLE pedido_proveedor (
    id            VARCHAR2(50) 
     NOT NULL,
    pedido        VARCHAR2(50) 
    ,
    cantidad      INTEGER,
    fecha_pedido  VARCHAR2(50) 
    ,
    fecha_entrega VARCHAR2(50) 
    ,
    finanza_id    VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE pedido_proveedor ADD CONSTRAINT pedido_proveedor_pk PRIMARY KEY ( id );

CREATE TABLE plato (
    id        VARCHAR2(50) 
     NOT NULL,
    nombre    VARCHAR2(50) 
    ,
    stock     INTEGER,
    tipo      VARCHAR2(50) 
    ,
    precio    NUMBER,
    menu_id   VARCHAR2(50) 
     NOT NULL,
    cocina_id VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE plato ADD CONSTRAINT platos_pk PRIMARY KEY ( id );

CREATE TABLE reserva (
    id_reserva         INTEGER NOT NULL,
    fecha_hora         VARCHAR2(50) 
    ,
    cantidad_personas  INTEGER,
    cliente_id_cliente VARCHAR2(50) 
     NOT NULL,
    mesa_id            VARCHAR2(50) 
     NOT NULL
);

CREATE UNIQUE INDEX reserva__idx ON
    reserva (
        cliente_id_cliente
    ASC );

CREATE UNIQUE INDEX reserva__idxv1 ON
    reserva (
        mesa_id
    ASC );

ALTER TABLE reserva ADD CONSTRAINT reserva_pk PRIMARY KEY ( id_reserva );

CREATE TABLE "USER" (
    id       VARCHAR2(50) 
     NOT NULL,
    username VARCHAR2(50) 
     NOT NULL,
    password VARCHAR2(50) 
     NOT NULL
);

ALTER TABLE "USER" ADD CONSTRAINT user_pk PRIMARY KEY ( id );

CREATE TABLE usuario_bodega (
    id       VARCHAR2(50) 
     NOT NULL,
    nombre   VARCHAR2(50) 
    ,
    apellido VARCHAR2(50) 

);

ALTER TABLE usuario_bodega ADD CONSTRAINT usuario_bodega_pk PRIMARY KEY ( id );

ALTER TABLE bodega
    ADD CONSTRAINT bodega_usuario_bodega_fk FOREIGN KEY ( usuario_bodega_id )
        REFERENCES usuario_bodega ( id );

ALTER TABLE caja
    ADD CONSTRAINT caja_finanza_fk FOREIGN KEY ( finanza_id )
        REFERENCES finanza ( id );

ALTER TABLE detalle_pago
    ADD CONSTRAINT detalle_pago_pago_fk FOREIGN KEY ( pago_id )
        REFERENCES pago ( id );

ALTER TABLE ingrediente
    ADD CONSTRAINT ingredientes_bodega_fk FOREIGN KEY ( bodega_sku )
        REFERENCES bodega ( sku );

ALTER TABLE ingrediente
    ADD CONSTRAINT ingredientes_platos_fk FOREIGN KEY ( platos_id )
        REFERENCES plato ( id );

ALTER TABLE menu
    ADD CONSTRAINT menu_orden_fk FOREIGN KEY ( orden_id )
        REFERENCES orden ( id );

ALTER TABLE mesa
    ADD CONSTRAINT mesa_garzon_fk FOREIGN KEY ( garzon_id )
        REFERENCES garzon ( id );

ALTER TABLE orden
    ADD CONSTRAINT orden_cliente_fk FOREIGN KEY ( cliente_id_cliente )
        REFERENCES cliente ( id_cliente );

ALTER TABLE pago
    ADD CONSTRAINT pago_caja_fk FOREIGN KEY ( caja_id )
        REFERENCES caja ( id );

ALTER TABLE pedido_proveedor
    ADD CONSTRAINT pedido_proveedor_finanza_fk FOREIGN KEY ( finanza_id )
        REFERENCES finanza ( id );

ALTER TABLE plato
    ADD CONSTRAINT plato_cocina_fk FOREIGN KEY ( cocina_id )
        REFERENCES cocina ( id );

ALTER TABLE plato
    ADD CONSTRAINT plato_menu_fk FOREIGN KEY ( menu_id )
        REFERENCES menu ( id );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_cliente_fk FOREIGN KEY ( cliente_id_cliente )
        REFERENCES cliente ( id_cliente );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_mesa_fk FOREIGN KEY ( mesa_id )
        REFERENCES mesa ( id );



