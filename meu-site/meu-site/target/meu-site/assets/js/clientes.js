let clientes = [];
let novoCliente = {};
let clienteAtualIndex = null;

function renderClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
    const hoje = new Date().toISOString().split('T')[0];

    clientes.forEach((cliente, index) => {
        let status = cliente.dataVencimento >= hoje ? 'ativo' : 'inativo';
        const clienteItem = document.createElement('div');
        clienteItem.className = 'cliente-item ' + status;
        clienteItem.innerHTML = `
            <p>Nome: ${cliente.nome}</p>
            <p>CPF: ${cliente.cpf}</p>
            <p>Data de Nascimento: ${cliente.dataNascimento}</p>
            <p>Data de Início: ${cliente.dataInicio}</p>
            <p>Data de Vencimento: ${cliente.dataVencimento}</p>
            <p>Status: <span class="${status === 'ativo' ? 'status-ativo' : 'status-inativo'}">${status}</span></p>
            <button onclick="abrirRenovarModal(${index})">Renovar Assinatura</button>
        `;
        listaClientes.appendChild(clienteItem);
    });
}

document.getElementById('addClienteBtn').addEventListener('click', function() {
    document.getElementById('addClienteModal').style.display = 'block';
});

document.getElementById('closeAddCliente').addEventListener('click', function() {
    document.getElementById('addClienteModal').style.display = 'none';
});

document.getElementById('addClienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    novoCliente.nome = document.getElementById('nome').value;
    novoCliente.cpf = document.getElementById('cpf').value;
    novoCliente.dataNascimento = document.getElementById('dataNascimento').value;
    document.getElementById('addClienteModal').style.display = 'none';
    document.getElementById('escolhaPlanoModal').style.display = 'block';
});

function escolherPlano(plano) {
    const dataInicio = new Date();
    let dataVencimento = new Date();

    switch (plano) {
        case 'mensal':
            dataVencimento.setMonth(dataVencimento.getMonth() + 1);
            break;
        case 'trimestral':
            dataVencimento.setMonth(dataVencimento.getMonth() + 3);
            break;
        case 'anual':
            dataVencimento.setFullYear(dataVencimento.getFullYear() + 1);
            break;
    }

    novoCliente.dataInicio = dataInicio.toISOString().split('T')[0];
    novoCliente.dataVencimento = dataVencimento.toISOString().split('T')[0];
    novoCliente.status = 'ativo';

    clientes.push(novoCliente);
    novoCliente = {};
    document.getElementById('escolhaPlanoModal').style.display = 'none';
    renderClientes();
}

function abrirRenovarModal(index) {
    clienteAtualIndex = index;
    document.getElementById('renovarModal').style.display = 'block';
}

function renovarPlano(plano) {
    let cliente = clientes[clienteAtualIndex];
    let dataVencimento = new Date(cliente.dataVencimento);

    switch (plano) {
        case 'mensal':
            dataVencimento.setMonth(dataVencimento.getMonth() + 1);
            break;
        case 'trimestral':
            dataVencimento.setMonth(dataVencimento.getMonth() + 3);
            break;
        case 'anual':
            dataVencimento.setFullYear(dataVencimento.getFullYear() + 1);
            break;
    }

    cliente.dataVencimento = dataVencimento.toISOString().split('T')[0];
    document.getElementById('renovarModal').style.display = 'none';
    renderClientes();
}

document.getElementById('closeEscolhaPlano').addEventListener('click', function() {
    document.getElementById('escolhaPlanoModal').style.display = 'none';
});

document.getElementById('closeRenovar').addEventListener('click', function() {
    document.getElementById('renovarModal').style.display = 'none';
});

renderClientes();
