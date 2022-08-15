let todoInput //the place where the user enters the content of the task
let errorInfo // info about no tasks / need to enter text
let addBtn // ADD button - adds new items to the list
let ulList // task list, UL tags
let newTodo // new added li, new task
let deleteBtn

let popup // popup
let popupInfo // tekst w popupie, jak się doda pusty tekst
let todoToEdit // edit Todo
let popupInput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	deleteBtn = document.querySelector('.delete')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', popupClose)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
	deleteBtn.addEventListener('click', deleteTodo)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)

		createToolsArea()

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Type the content of the task'
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.setAttribute('class', 'tools') // or toolsPanel.classList.add('tools);
	newTodo.append(toolsPanel)

	const btnComplete = document.createElement('button')
	btnComplete.setAttribute('class', 'complete')
	btnComplete.innerHTML = '<i class="fas fa-check"></i>'
	toolsPanel.append(btnComplete)

	const btnEdit = document.createElement('button')
	btnEdit.setAttribute('class', 'edit')
	btnEdit.innerHTML = 'EDIT'
	toolsPanel.append(btnEdit)

	const btnDelete = document.createElement('button')
	btnDelete.setAttribute('class', 'delete')
	btnDelete.innerHTML = '<i class="fas fa-times"></i>'
	toolsPanel.append(btnDelete)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editTodo = e => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent
	console.log(todoToEdit.firstChild)

	popup.style.display = 'flex'
}

const popupClose = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		popupInfo.textContent = ''
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'you need to provide some content'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()

	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'empty task on the list'
	}
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)
