//Selecão de Elementos
const todoForms = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const editForms = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const editCancelButton = document.querySelector('#cancel-edit-btn')
const todoList = document.querySelector('#todo-list')
const searchInput = document.querySelector('#search-input')
const eraseBtn = document.querySelector('#erase-button')
const filterBtn = document.querySelector('#filter-select')
let oldInputValue

//Funções
const saveTodoList = (text) => {
  const todo = document.createElement('div')
  todo.classList.add('todo')

  const todoTitle = document.createElement('h3')
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const todoButtonFinish = document.createElement('button')
  todoButtonFinish.classList.add('finish-todo')
  todoButtonFinish.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(todoButtonFinish)

  const todoButtonEdit = document.createElement('button')
  todoButtonEdit.classList.add('edit-todo')
  todoButtonEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(todoButtonEdit)

  const todoButtonRemove = document.createElement('button')
  todoButtonRemove.classList.add('remove-todo')
  todoButtonRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(todoButtonRemove)

  todoList.appendChild(todo)

  console.log(todo)
  todoInput.value = ''
  todoInput.focus()
}

const toggleForms = () => {
  editForms.classList.toggle('hide')
  todoForms.classList.toggle('hide')
  todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.todo')
  todos.forEach((element) => {
    let todoTitle = element.querySelector('h3')
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text
    }
  })
}

const getSearchTodos = (searchText) => {
  const todos = document.querySelectorAll('.todo')
  todos.forEach((element) => {
    const todoTitle = element.querySelector('h3').innerText.toLowerCase()
    element.style.display = 'flex'

    if (!(todoTitle.includes(searchText) && todoTitle === searchText)) {
      element.style.display = 'none'
    }
  })
}

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll('.todo')

  switch (filterValue) {
    case 'all':
      todos.forEach((element) => (element.style.display = 'flex'))

      break

    case 'done':
      todos.forEach((element) =>
        element.classList.contains('done')
          ? (element.style.display = 'flex')
          : (element.style.display = 'none')
      )

      break

    case 'todo':
      todos.forEach((element) =>
        !element.classList.contains('done')
          ? (element.style.display = 'flex')
          : (element.style.display = 'none')
      )

      break

    default:
      break
  }
}

//Eventos
todoForms.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = todoInput.value
  if (inputValue) {
    saveTodoList(inputValue)
  }
})

document.addEventListener('click', (e) => {
  const targetElement = e.target
  const parentElement = targetElement.closest('div')
  let todoTitle

  if (parentElement && parentElement.querySelector('h3')) {
    todoTitle = parentElement.querySelector('h3').innerText || ''
  }

  if (targetElement.classList.contains('finish-todo')) {
    parentElement.classList.toggle('done')

    //updateTodoStatusLocalStorage(todoTitle)
  }

  if (targetElement.classList.contains('remove-todo')) {
    parentElement.remove()

    // Utilizando dados da localStorage
    //removeTodoLocalStorage(todoTitle)
  }

  if (targetElement.classList.contains('edit-todo')) {
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

editCancelButton.addEventListener('click', (e) => {
  e.preventDefault()
  toggleForms()
})

editForms.addEventListener('submit', (e) => {
  e.preventDefault()
  const editInputValue = editInput.value
  if (editInputValue) {
    updateTodo(editInputValue)
  }
  toggleForms()
})

searchInput.addEventListener('keyup', (e) => {
  e.preventDefault()
  const search = e.target.value
  console.log(search)
  getSearchTodos(search)
})

eraseBtn.addEventListener('click', (e) => {
  e.preventDefault()

  searchInput.value = ''

  searchInput.dispatchEvent(new Event('keyup'))
})

filterBtn.addEventListener('change', (e) => {
  const filterValue = e.target.value

  filterTodos(filterValue)
})
