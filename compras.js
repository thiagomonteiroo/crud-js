//capturando campos html
const fieldName = document.querySelector('#name')
const fieldPrice = document.querySelector('#price')
const fieldQuantity = document.querySelector('#quantity')
const btnInsert = document.querySelector('.header button')
const fieldItens = document.querySelector('.listItens')

let itens = [] // <-array contendo itens 
let index = 0 // variavel para acesso dinamico ao index de itens


//evento botão inserir
btnInsert.onclick = () => {
    fieldValidation()
}

//funções

//criar uuid
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

//validar campos
const fieldValidation = () => {
    if (fieldName.value.trim() === '') {
        alert('Por favor, preencha o nome')
        fieldName.focus()
    } else if (fieldPrice.value.trim() == '') {
        alert('Por favor, preencha o preço')
        fieldPrice.focus
    } else if (fieldQuantity.value.trim() == '') {
        alert('Por favor, preencha a quantidade')
        fieldQuantity.focus()
    } else {
        setItemList()
    }
}

//adicionar item a lista
const setItemList = () => {
    let aux = create_UUID()
    itens.push({ 'name': fieldName.value, 'uuid': aux, 'price': fieldPrice.value, 'quantity': fieldQuantity.value})
    loadItens()
    fieldName.value = ''
    fieldPrice.value = ''
    fieldQuantity.value = ''
}

//carregar itens na tela
const loadItens = () => {
    fieldItens.innerHTML = ""
    itens.forEach((item, i) => {
        insertItemTela(item.name, item.uuid, item.price, item.quantity, i)
    })
}

//inserir itens na tela
const insertItemTela = (name, uuid, price, quantity, i) => {
    const ul = document.createElement('ul')

    ul.innerHTML = `
    <li>
        <div class="divLi">
            <span data-si=${i}>${name}</span>
        </div>
    </li>
    <li>
        <div class="divLi">
            <span data-si=${i}>${uuid}</span>
        </div>
    </li>

    <li>
        <div class="divLi">
            <span data-si=${i}>R$: ${price}</span>
        </div>
    </li>

    <li>
        <div class="divLi">
            <span data-si=${i}>${quantity} itens</span>
        </div>
    </li>
    
    <button onclick="editItem(${i})"><i class='material-icons'>edit</i></button>
    <button onclick="removeItem(${i})"><i class='material-icons'>remove_circle_outline</i></button>
    `
    fieldItens.appendChild(ul)

}

//remover item
const removeItem = (i) => {
  itens.splice(i, 1)
  loadItens()
}

//abrir janela de edição
const editItem = (i) => {
    window.location = '#modal'
    const fieldMName = document.querySelector('#modalName')
    const fieldMPrice = document.querySelector('#modalPrice')
    const fieldMQuantity = document.querySelector('#modalQuantity')
    fieldMName.value = itens[i]['name']
    fieldMPrice.value = itens[i]['price']
    fieldMQuantity.value = itens[i]['quantity']    
    index = i
}

//realizar alterações
const submitItem = () => {
    const fieldMName = document.querySelector('#modalName')
    const fieldMPrice = document.querySelector('#modalPrice')
    const fieldMQuantity = document.querySelector('#modalQuantity')
    const uuidOld = itens[index]['uuid']
    itens.splice(index, 1, { 'name': fieldMName.value, 'uuid': uuidOld, 'price': fieldMPrice.value, 'quantity': fieldMQuantity.value})
    window.location = '#fechar'
    loadItens()   
}

