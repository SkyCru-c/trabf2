let treinos = JSON.parse(localStorage.getItem('treinos')) || [];
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let novoTreino = {};
let treinoAtualIndex = null;

function saveToLocalStorage() {
    localStorage.setItem('treinos', JSON.stringify(treinos));
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function renderTreinos() {
    const listaTreinos = document.getElementById('listaTreinos');
    listaTreinos.innerHTML = '';

    treinos.forEach((treino, index) => {
        const treinoItem = document.createElement('div');
        treinoItem.className = 'treino-item';
        treinoItem.innerHTML = `
            <p>Nome do Cliente: ${treino.nomeCliente}</p>
            <p>Nome do Treino: ${treino.nome}</p>
            <p>Descrição: ${treino.descricao}</p>
            <p>Data de Início: ${treino.dataInicio}</p>
            <p>Máquinas: ${treino.maquinas}</p>
            <p>Tempo de Descanso: ${treino.tempoDescanso} minutos</p>
            <button onclick="abrirEditarTreinoModal(${index})">Editar Treino</button>
            <button onclick="excluirTreino(${index})">Excluir Treino</button>
        `;
        listaTreinos.appendChild(treinoItem);
    });
}

function preencherClientes() {
    const clientesList = document.getElementById('clientesList');
    clientesList.innerHTML = '';
    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = cliente.nome;
        option.setAttribute('data-index', index);
        clientesList.appendChild(option);
    });
}

document.getElementById('addTreinoBtn').addEventListener('click', function() {
    document.getElementById('addTreinoModal').style.display = 'block';
    preencherClientes();
});

document.getElementById('closeAddTreino').addEventListener('click', function() {
    document.getElementById('addTreinoModal').style.display = 'none';
});

document.getElementById('addTreinoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    novoTreino.nomeCliente = document.getElementById('nomeCliente').value;
    novoTreino.nome = document.getElementById('nomeTreino').value;
    novoTreino.descricao = document.getElementById('descricao').value;
    novoTreino.dataInicio = document.getElementById('dataInicioTreino').value;
    novoTreino.maquinas = document.getElementById('maquinas').value;
    novoTreino.tempoDescanso = document.getElementById('tempoDescanso').value;

    if (treinoAtualIndex === null) {
        treinos.push(novoTreino);
    } else {
        treinos[treinoAtualIndex] = novoTreino;
        treinoAtualIndex = null;
    }
    novoTreino = {};
    saveToLocalStorage();
    document.getElementById('addTreinoModal').style.display = 'none';
    renderTreinos();
});

function abrirEditarTreinoModal(index) {
    treinoAtualIndex = index;
    const treino = treinos[index];
    document.getElementById('nomeCliente').value = treino.nomeCliente;
    document.getElementById('nomeTreino').value = treino.nome;
    document.getElementById('descricao').value = treino.descricao;
    document.getElementById('dataInicioTreino').value = treino.dataInicio;
    document.getElementById('maquinas').value = treino.maquinas;
    document.getElementById('tempoDescanso').value = treino.tempoDescanso;
    document.getElementById('addTreinoModal').style.display = 'block';
}

function excluirTreino(index) {
    treinos.splice(index, 1); // Remove o treino da lista
    saveToLocalStorage();
    renderTreinos(); // Re-renderiza a lista de treinos
}

function abrirEditarClienteModal(index) {
    const cliente = clientes[index];
    document.getElementById('nomeClienteEdit').value = cliente.nome;
    document.getElementById('emailClienteEdit').value = cliente.email;
    document.getElementById('telefoneClienteEdit').value = cliente.telefone;
    document.getElementById('clienteIndex').value = index;
    document.getElementById('editClienteModal').style.display = 'block';
}

document.getElementById('editClienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const index = document.getElementById('clienteIndex').value;
    clientes[index].nome = document.getElementById('nomeClienteEdit').value;
    clientes[index].email = document.getElementById('emailClienteEdit').value;
    clientes[index].telefone = document.getElementById('telefoneClienteEdit').value;

    saveToLocalStorage();
    document.getElementById('editClienteModal').style.display = 'none';
    preencherClientes(); // Atualiza a lista de clientes no modal de treinos
});

renderTreinos();
preencherClientes();
