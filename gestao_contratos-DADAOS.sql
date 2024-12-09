CREATE DATABASE gestao_contratos;

CREATE TABLE tipo_usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO tipo_usuario (nome)
VALUES
('Admin'),
('Locatário');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255),
    cpf VARCHAR(14),
    data_nascimento VARCHAR(10),
    tipo_usuario_id INTEGER REFERENCES ipo_usuario(id) ON DELETE CASCADE,
    ativo BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO usuarios (nome, email, senha, ativo, cpf, data_nascimento, tipo_usuario_id )
VALUES 
('Adrian', 'adrian@gmail.com', '000.000.000-00', 1985-01-01),
('Diogo', 'diogo@gmail.com', '000.000.000-00', 1980-01-01),
('Radamés', 'radames@gmail.com', '000.000.000-00', 1982-01-01),
('Jobson', 'jobson@gmail.com', '000.000.000-00', 1995-01-01),
('Fran', 'fran@gmail.com', '000.000.000-00', 1990-01-01);


CREATE TABLE telefones (
	id SERIAL PRIMARY KEY,
	numero VARCHAR(255) NOT NULL,
	tipo_usuario_id INTEGER REFERENCES tipo_usuario(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO telefones (numero, tipo_usuario_id)
VALUES 
('(84)00000-0000', 1),
('(84)00000-0000', 2),
('(84)00000-0000', 3),
('(84)00000-0000', 4),
('(84)00000-0000', 5);


CREATE TABLE enderecos (
	id SERIAL PRIMARY KEY,
	logradouro VARCHAR(255) NOT NULL,
	numero INTEGER,
	cep VARCHAR(9) NOT NULL,
	bairro VARCHAR(255) NOT NULL,
	tipo_usuario_id INTEGER REFERENCES tipo_usuario(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO enderecos (logradouro, numero, cep, bairro, tipo_usuario_id)
VALUES 
('Rua Devs', 100, 59084-000, 'Neópolis', 1),
('Rua Devs', 100, 59084-000, 'Neópolis', 2),
('Rua Devs', 100, 59084-000, 'Neópolis', 3),
('Rua Devs', 100, 59084-000, 'Neópolis', 4),
('Rua Devs', 100, 59084-000, 'Neópolis', 5);


CREATE TABLE cnhs (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    numero_registro VARCHAR(20) NOT NULL,
    categoria VARCHAR(5) NOT NULL,
    validade DATE NOT NULL,
    tipo_usuario_id INTEGER REFERENCES tipo_usuario(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO cnhs (numero, numero_registro, categoria, validade, tipo_usuario_id)
VALUES 
('00000000', '00000100', 'B', '2030-01-01', 1),
('00000000', '00000100', 'B', '2030-01-01', 2),
('00000000', '00000100', 'B', '2030-01-01', 3),
('00000000', '00000100', 'B', '2030-01-01', 4),
('00000000', '00000100', 'B', '2030-01-01', 5);


CREATE TABLE grupos_veiculos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO grupos_veiculos (nome, valor)
VALUES 
('A', 100),
('B', 70),
('C', 50);


CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    placa VARCHAR(10) NOT NULL,
    ano CHAR(4) NOT NULL,
    grupos_veiculos_id INTEGER REFERENCES grupos_veiculos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO veiculos (modelo, placa, ano, grupos_veiculos_id)
VALUES 
('Fiat', 'NNN0000', 2010, 1),
('Gol', 'NNN0000', 2010, 2),
('Corsa', 'NNN0000', 2010, 3);


CREATE TABLE checklist (
    id SERIAL PRIMARY KEY,
    risco_pintura BOOLEAN NOT NULL,  
    data_inicio VARCHAR(10),
    data_fim VARCHAR(10),
    veiculos_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO checklist (risco_pintura, data_inicio, data_fim, veiculos_id)
VALUES 
(false, '2030-01-01', '2030-01-01', 1),
(false, '2030-01-01', '2030-01-01', 2),
(false, '2030-01-01', '2030-01-01', 3);


CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    clausulas TEXT NOT NULL,
    data_inicio VARCHAR(10) NOT NULL,
    data_retorno VARCHAR(10) NOT NULL,
    data_fim VARCHAR(10),
    ativo BOOLEAN DEFAULT true NOT NULL,
    tipo_usuario_id INTEGER REFERENCES tipo_usuario(id) ON DELETE CASCADE,
    veiculos_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE,
    checklist_id INTEGER REFERENCES checklist(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO contratos (clausulas, data_inicio, data_retorno, data_fim, ativo, tipo_usuario_id, veiculos_id, checklist_id)
VALUES 
('Você alugou um veículo', '2030-01-01', '2030-01-01', '2030-01-01', true, 1, 1, 1),
('Você alugou um veículo', '2030-01-01', '2030-01-01', '2030-01-01', true, 2, 2, 1),
('Você alugou um veículo', '2030-01-01', '2030-01-01', '2030-01-01', true, 3, 3, 1);



