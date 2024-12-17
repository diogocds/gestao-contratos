async function carregarTipoUsuarios() {
  try {
    const response = await fetch("/admin/tipo_usuarios");
    const tipoUsuario = await response.json();
    const selectTipoUsuario = document.querySelector(
      'select[name="tipo_usuario_id"]'
    );
    tipoUsuario.forEach((tipo) => {
      const option = document.createElement("option");
      option.value = tipo.id;
      option.textContent = tipo.descricao;
      selectTipoUsuario.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar o Tipo de Usuário:", erro);
  }
}

// Carregar as tipos de usuários quando a página carregar
window.addEventListener("load", carregarTipoUsuarios);

// Pegando CEP

document.getElementById("cep").addEventListener("input", function () {
  let cep = this.value.replace(/\D/g, "");

  if (cep.length > 5) {
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
  }

  this.value = cep; // Atualiza o valor do campo com a máscara
});

// Função para carregar o CEP

document.getElementById("cep").addEventListener("input", function () {
  const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cep.length === 8) {
    // Se o CEP tiver 8 dígitos, faz a consulta
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          document.getElementById("logradouro").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("uf").value = data.uf || "";
          document.getElementById("localidade").value = data.localidade || "";
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => console.error("Erro na consulta ao ViaCEP:", error));
  }
});

//Listar Usuarios
