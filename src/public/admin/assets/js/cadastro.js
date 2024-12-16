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

// Gerando contrato de Locação

function generateContract() {
  const name = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const phone = document.getElementById("phone").value;
  const vehicle = document.getElementById("vehicle").value;
  const model = document.getElementById("model").value;
  const color = document.getElementById("color").value;
  const plate = document.getElementById("plate").value;
  const rentalDate = document.getElementById("rentalDate").value;
  const departureTime = document.getElementById("departureTime").value;
  const arrivalTime = document.getElementById("arrivalTime").value;

  if (
    !name ||
    !cpf ||
    !phone ||
    !vehicle ||
    !model ||
    !color ||
    !plate ||
    !rentalDate ||
    !departureTime ||
    !arrivalTime
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const contractNumber = generateContractNumber();
  const logoUrl = "./assets/img/Logo-101.png";

  const contractText = `
    <div class="contract-content">
      <img src="${logoUrl}" alt="Logo" style="display: block; margin: 0 auto; max-width: 200px;">
      <h1 style="text-align: center;">Contrato de Locação de Veículo</h1>
      <p><strong>Nº do Contrato:</strong> ${contractNumber}</p>
      <div class="dados-locacao">
      <div>
      <h2>Dados do Locatário</h2>
      <p><strong>Nome do Locatário:</strong> ${name}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Data da Locação:</strong> ${rentalDate}</p>
      </div>
      <div>
      <h2>Dados do Veículo</h2>
      <p><strong>Veículo:</strong> ${vehicle}</p>
      <p><strong>Modelo:</strong> ${model}</p>
      <p><strong>Cor:</strong> ${color}</p>
      <p><strong>Placa:</strong> ${plate}</p>
      </div>
      </div>
      <hr>
      <h3>Termo de Responsabilidade</h3>
        <p>
          Eu, <span>${name}</span>, CPF
          <span>${cpf}</span>, responsável pela locação do veículo
          acima descrito, reconheço que sou totalmente responsável pelo uso e
          conservação do veículo durante o período de locação, Conforme contrato
          em anexo Nº Contrato:${contractNumber}.
        </p>
        <p><strong>Assinatura</strong> _______________________________</p>
        <hr>
      <h3>Termos e Condições</h3>
      <p>Este contrato é celebrado entre o Locador e o Locatário, com as seguintes condições:</p>
      <ul>
        <li>O Locatário declara ter lido e compreendido todas as cláusulas deste contrato.</li>
        <li>O Locatário se compromete a utilizar o veículo exclusivamente para fins lícitos.</li>
        <li>O Locatário é responsável por qualquer dano causado ao veículo durante o período de locação.</li>
        <li>O valor da locação será de R$ _________, a ser pago na data de assinatura do contrato.</li>
        <li>O não cumprimento das obrigações aqui estabelecidas poderá resultar em rescisão contratual.</li>
      </ul>
        <hr>
      <h3>Busca do Veículo em Caso de Apropriação Indébita</h3>
      <p style="font-weight: bold; color: red;">O Locatário reconhece que a apropriação indébita do veículo locado configura crime, conforme o artigo 168 do Código Penal Brasileiro.</p>
      <p>O Locador se reserva o direito de buscar o veículo em caso de descumprimento das cláusulas deste contrato, incluindo a não devolução do veículo na data acordada.</p>

      <p>Este contrato é válido a partir da data da assinatura e se submete às leis brasileiras.</p>
      </div>
      <div class="data-locacao">
      <div>
      <h2>Assinaturas</h2>
      <p><strong>Nº do Contrato:</strong> ${contractNumber}</p>
      <p><strong>Locador:</strong> _______________________________</p>
      <p><strong>Locatário:</strong> _______________________________</p>
      <p><strong>Data da Locação:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <div>
       <h2>Período da Locação</h2>
      <p><strong>Data e Hora de Saída:</strong> ${departureTime}</p>
      <p><strong>Data e Hora de Chegada:</strong> ${arrivalTime}</p>
      <p><strong>Data Prorrogada:</strong>_______/_______/_______.</p>
      <p><strong>Hora da Devolução:</strong>_______/_______/_______.</p>
      </div>
      </div>
  `;

  const printWindow = window.open("", "_blank", "height=600,width=800");

  printWindow.document.write("<html><head><title>Imprimir Contrato</title>");
  printWindow.document.write(
    '<link rel="stylesheet" href="./assets/css/styleHome.css" />'
  );
  printWindow.document.write(
    "<style>@media print { .print-button { display: none; } }</style>"
  );
  printWindow.document.write("</head><body>");
  printWindow.document.write(contractText);

  printWindow.document.write(
    '<br><button class="print-button" onclick="window.print()">Imprimir Contrato</button>'
  );
  printWindow.document.write("</body></html>");

  printWindow.document.close();
}

function generateContractNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

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
