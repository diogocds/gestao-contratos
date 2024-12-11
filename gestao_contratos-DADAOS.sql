CREATE DATABASE gestao_contratos;

CREATE TABLE tipo_usuario (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255),
    tipo_usuario_id INTEGER REFERENCES tipo_usuario(id) ON DELETE CASCADE,
    ativo BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14),
    rg VARCHAR(10),
    data_nascimento DATE,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE telefones (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(255) NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE enderecos (
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    numero INTEGER,
    cep VARCHAR(9) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE cnhs (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    numero_registro VARCHAR(20) NOT NULL,
    categoria VARCHAR(5) NOT NULL,
    validade DATE NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE grupos_veiculos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ano INT CHECK (ano >= 1886), -- 1886 é o ano do primeiro automóvel
    cor VARCHAR(50),
    grupos_veiculos_id INTEGER REFERENCES grupos_veiculos(id) ON DELETE SET NULL,
    ativo BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE usuario_veiculo (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    veiculo_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE,
    data_inicio DATE,
    data_fim DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE checklist (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    clausulas TEXT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    ativo BOOLEAN DEFAULT true NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    veiculo_id INTEGER REFERENCES veiculos(id) ON DELETE CASCADE,
    checklist_id INTEGER REFERENCES checklist(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO tipo_usuario (descricao)
VALUES ('Funcionário'), ('Locatário');


INSERT INTO usuarios (nome, email, senha, tipo_usuario_id, ativo)
VALUES 
    ('João Silva', 'joao.silva@email.com', 'senha123', 1, true), -- Funcionário
    ('Maria Oliveira', 'maria.oliveira@email.com', 'senha456', 2, true), -- Locatário
    ('Carlos Lima', 'carlos.lima@email.com', 'senha789', 2, true); -- Locatário


INSERT INTO documentos (cpf, rg, data_nascimento, usuario_id)
VALUES 
    ('123.456.789-00', 'MG123456', '1990-01-01', 1),
    ('987.654.321-00', 'SP654321', '1985-06-15', 2),
    ('456.789.123-00', 'RJ789123', '1992-09-23', 3);


INSERT INTO telefones (numero, usuario_id)
VALUES 
    ('+55 31 98765-4321', 1),
    ('+55 11 91234-5678', 2),
    ('+55 21 99876-5432', 3);


INSERT INTO enderecos (logradouro, numero, cep, bairro, usuario_id)
VALUES 
    ('Rua A', 123, '30100-000', 'Centro', 1),
    ('Avenida B', 456, '30200-000', 'Jardim', 2),
    ('Travessa C', 789, '30300-000', 'Planalto', 3);


INSERT INTO enderecos (logradouro, numero, cep, bairro, usuario_id)
VALUES 
    ('Rua A', 123, '30100-000', 'Centro', 1),
    ('Avenida B', 456, '30200-000', 'Jardim', 2),
    ('Travessa C', 789, '30300-000', 'Planalto', 3);

INSERT INTO cnhs (numero, numero_registro, categoria, validade, usuario_id)
VALUES 
    ('CNH123456', 'REG123456', 'B', '2030-01-01', 2),
    ('CNH654321', 'REG654321', 'AB', '2029-05-20', 3);

INSERT INTO grupos_veiculos (nome, descricao)
VALUES
    ('Econômicos', 'Veículos de baixo custo, voltados para economia de combustível e manutenção.'),
    ('Luxo', 'Veículos de alta gama, com foco em conforto e sofisticação.'),
    ('Utilitários', 'Veículos projetados para transporte de cargas e serviços.'),
    ('SUVs', 'Veículos utilitários esportivos, adequados para terrenos difíceis e viagens em família.'),
    ('Esportivos', 'Veículos de alto desempenho, voltados para velocidade e design arrojado.');

INSERT INTO veiculos (placa, modelo, marca, ano, cor, grupos_veiculos_id)
VALUES 
    ('ABC1D23', 'Civic', 'Honda', 2020, 'Prata', 1),
    ('XYZ9E87', 'Corolla', 'Toyota', 2018, 'Preto', 2);


INSERT INTO usuario_veiculo (usuario_id, veiculo_id, data_inicio, data_fim)
VALUES 
    (2, 1, '2024-01-01', '2024-12-31'),
    (3, 2, '2024-01-01', '2024-12-31');


INSERT INTO checklist (descricao)
VALUES 
    ('Verificação de documentação do veículo'),
    ('Inspeção de segurança do veículo');


INSERT INTO contratos (clausulas, data_inicio, data_fim, ativo, usuario_id, veiculo_id, checklist_id)
VALUES 
    ('Contrato de locação para uso pessoal.', '2024-01-01', '2024-12-31', true, 2, 1, 1),
    ('Contrato de locação para viagens.', '2024-01-01', '2024-12-31', true, 3, 2, 2);
