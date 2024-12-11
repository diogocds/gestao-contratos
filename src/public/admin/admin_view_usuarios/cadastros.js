// Pegando CPF

document.getElementById("cpf").addEventListener("input", function () {
  let cpf = this.value.replace(/\D/g, "");
  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  this.value = cpf;
});

// Pegando Telefones

document.getElementById("telefone").addEventListener("input", function () {
  let telefone = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (telefone.length <= 11) {
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses em volta do DDD
    telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após os primeiros 5 dígitos do número
  }

  this.value = telefone; // Atualiza o valor do campo com a máscara
});

// Pegando CEP

document.getElementById("cep").addEventListener("input", function () {
  let cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cep.length > 5) {
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após os primeiros 5 dígitos
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
          document.getElementById("municipio_id").value = data.ibge || ""; // Armazena o código IBGE
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => console.error("Erro na consulta ao ViaCEP:", error));
  }
});

let telefoneIndex = 1; // Começa em 1 porque já existe o primeiro campo
const maxTelefones = 3; // Define o limite de 3 telefones

function addTelefone() {
  // Verifica se o número de campos já atingiu o limite
  const totalTelefones = document.querySelectorAll(
    'input[name="telefones[]"]'
  ).length;
  if (totalTelefones >= maxTelefones) {
    alert("Você só pode adicionar no máximo 3 telefones.");
    return;
  }

  // Cria o novo campo de telefone com id único
  const novoTelefone = `
        <div class="item form-group" id="telefone-${telefoneIndex}">
            <label class="col-form-label col-md-4 col-sm-4 label-align" for="telefones">Telefone</label>
            <div class="col-md-8 col-sm-8">
                <div class="input-group" style="margin-bottom: -5px">
                    <input class="form-control telefone-mask" type="text" name="telefones[]" id="telefone-input-${telefoneIndex}" maxlength="15">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-danger" onclick="removeTelefone(${telefoneIndex})"> - </button>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Insere o novo campo no container
  document
    .getElementById("telefones-container")
    .insertAdjacentHTML("beforeend", novoTelefone);

  // Aplica a máscara ao novo campo de telefone
  applyPhoneMask(`telefone-input-${telefoneIndex}`);

  telefoneIndex++; // Incrementa o índice
}

// Função para remover o campo de telefone
function removeTelefone(index) {
  const telefoneField = document.getElementById(`telefone-${index}`);
  telefoneField.remove();
}

// Função para aplicar a máscara de telefone
function applyPhoneMask(elementId) {
  const telefoneInput = document.getElementById(elementId);
  telefoneInput.addEventListener("input", function () {
    let telefone = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (telefone.length <= 11) {
      telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses em volta do DDD
      telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após os primeiros 5 dígitos do número
    }

    this.value = telefone; // Atualiza o valor do campo com a máscara
  });
}

// Aplica a máscara ao campo de telefone inicial (caso já exista)
applyPhoneMask("telefone-input-0");

// const urlParams = new URLSearchParams(window.location.search);
// const success = urlParams.get('success');
// if (success === 'true') {
//     alert('Parceiro adicionado com sucesso!');
// }

// Pegando as cnhs

// function previewFile(id) {
//     const fileInput = document.getElementById(`fileInput${id}`);
//     const preview = document.getElementById(`preview${id}`);
//     const file = fileInput.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function() {
//         preview.innerHTML = `<img src="${reader.result}" alt="Preview">`;
//       };
//       reader.readAsDataURL(file);
//     } else {
//       preview.innerHTML = `<svg class="svg-placeholder" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24"><path d="M2 18l4.59-4.59a2 2 0 012.82 0L12 16M2 18V8a2 2 0 012-2h7.5M2 18v2a2 2 0 002 2h12a2 2 0 002-2v-4m-6 0l2 2m-2-2l1.59-1.59a2 2 0 012.82 0L18 16m0 0v-3.17M12 10h.01M18 2v8m4-4h-8"></path></svg>`;
//     }
//   }
