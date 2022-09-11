

document.getElementById('add-btn').addEventListener('click', () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    if (inputFieldValue === '') {
        alert('please enter todo title');
        return;
    }
    inputField.value = '';
    setItemToLocalStorage(inputFieldValue);
    displayItem(inputFieldValue);
});


const getItemToLocalStorage = () => {
    const savedItem = localStorage.getItem('TODOS');
    // console.log(savedItem)
    let item = [];

    if (savedItem) {
        item = JSON.parse(savedItem);
    };

    return item;
};


const setItemToLocalStorage = (title) => {
    let todoList = getItemToLocalStorage('TODOS');

    const todo = {
        title,
        isCompleted: false
    };

    if (todoList.length > 0) {
        todoList = [...todoList, todo];
    } else {
        todoList.push(todo);
    }

    todoList = JSON.stringify(todoList);
    localStorage.setItem('TODOS', todoList)
};


const displayItem = (title) => setElementToUL(title);


const displayItemFromLocalStorage = () => {
    const todo = getItemToLocalStorage();

    todo.forEach(data => setElementToUL(data))
}

const setElementToUL = (data) => {
    const ul = document.getElementById('ul-list');
    const li = document.createElement('li');
    li.classList.add('border', 'my-3', 'flex', 'justify-between')
    li.innerHTML = `
        <span class="w-4/5 py-2 pl-3">${data.title ? data.title : data}</span>
        <button onclick="deleteListItem(this)" class="bg-red-500 text-sm text-white py-1 px-5">DELETE</button>
        `;
    ul.appendChild(li);
    document.getElementById('clear-all').classList.remove('hidden');
};


const deleteListItem = (btn) => {
    // find button parent element (li)
    const parentElement = btn.parentElement;
    // find li er child element span tags innerText
    const parentElementChild = parentElement.children[0].innerText;
    parentElement.remove();
    let todoArray = getItemToLocalStorage('TODOS');

    // filter todoArr 
    let filterArray = todoArray.filter(item => item.title !== parentElementChild);
    if (filterArray.length === 0) {
        document.getElementById('clear-all').classList.add('hidden');
    }
    filterArray = JSON.stringify(filterArray);

    // set filterArray to local storage
    localStorage.setItem('TODOS', filterArray);
};


document.getElementById('clear-all').addEventListener('click', (e) => {
    localStorage.clear();
    document.getElementById('ul-list').innerHTML = '';
    e.target.classList.add('hidden')
})

displayItemFromLocalStorage()


