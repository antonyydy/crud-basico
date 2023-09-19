const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const Nome = document.querySelector('#m-nome');
const Email = document.querySelector('#m-email');
const Senha = document.querySelector('#m-senha');
const Salvar = document.querySelector('#Salvar');

let itens
let id


function getItensFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bd')) || [];
  }

  function setItensToLocalStorage() {
    localStorage.setItem('bd', JSON.stringify(itens));
  }


  function insertItem(item, index) {
    let tr = document.createElement('tr');
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.email}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr);
  }
  

function loadItens() {
    itens = getItensFromLocalStorage();
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index);
    })
  
  }

loadItens();


  function editItem(index) {

    openModal(true, index);
  }
  
  function deleteItem(index) {
    itens.splice(index, 1);
    setItensToLocalStorage();
    loadItens();
  }

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  if (edit) {
    Nome.value = itens[index].nome;
    Email.value = itens[index].email;
    Senha.value = itens[index].senha;
    id = index
  } else {
    Nome.value = ''
    Email.value = ''
    Senha.value = ''
    id = undefined;
  }
  
}

Salvar.onclick = e => {
  
  if (Nome.value == '' || Email.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = Nome.value
    itens[id].email = Email.value
    itens[id].senha = Senha.value;
  } else {
    itens.push({'nome': Nome.value, 'email': Email.value, 'senha': Senha.value});
  }

  setItensToLocalStorage();

  modal.classList.remove('active');
  loadItens();
}

loadItens();
