const app = document.getElementById('app');
const url = "http://localhost:5959/api/todos/"
let todos = []

const postToDo = e => {
    const text = document.getElementById("newToDo").value
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(() => renderToDos())
}

const updateToDo = (e, id) => {
    const btn = document.getElementById('addPost')
    btn.innerHTML = "Done"
    btn.setAttribute("onClick", `updateRequest('${id}')`)
    const textfield = document.getElementById("newToDo")
    textfield.value = e.parentElement.getAttribute("input")
}
const deleteToDo = id => {
    fetch(url + id, {
        method: 'DELETE'
    })
        .then(renderToDos())
}
const updateRequest = id => {
    const text = document.getElementById("newToDo").value;
    fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify({ text }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(renderToDos())
        .catch(console.error)
}


const TodoList = () => `
    ${todos.map(item => `
      <div input="${item.text}">
        ${item.text}
        <button onclick="updateToDo(this, '${item._id}')">Edit</button>
        <button onclick="deleteToDo('${item._id}')">Delete</button>
      </div>`
).join('')}`

const InputTodo = () => `
  <input type="text" name="newToDo" id="newToDo"></input>
  <button onclick="postToDo()" id="addPost">Add</button>
  `

const View = todos => `
    ${InputTodo()}
    ${TodoList(todos)}
`;

const renderToDos = () => {
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            todos = data
            app.innerHTML = View(todos)
        })
}
renderToDos()