-- DROP TABLE IF EXISTS produtos;

  CREATE TABLE IF NOT EXISTS produtos (
    id int(11) NOT NULL,
    nome varchar(150) NOT NULL,
    imagem varchar(200) NOT NULL,
    descricao varchar(2000) NOT NULL,
    estoque varchar(2000) NOT NULL,
    status boolean NOT NULL,
    preco float NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE produtos ADD PRIMARY KEY (id);
  ALTER TABLE produtos MODIFY id int(11) NOT NULL AUTO_INCREMENT;