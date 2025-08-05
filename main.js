let todos = [];

const todoInput = document.querySelector(".taskInput");
const btn = document.querySelector(".btn");
const listToDo = document.querySelector(".listToDo");
const form = document.querySelector(".form");
const selectTodo = document.querySelector(".selectTodo");


form.addEventListener("submit", addTodo);
listToDo.addEventListener("click",listClick );
selectTodo.addEventListener("change",todoFilter);


function todosShow(selectTodosShow){
    listToDo.innerHTML = "";

    selectTodosShow.forEach((todo, index) => {
        const divTodo = document.createElement("div");
        divTodo.classList.add("todo");
        if(todo.completed){
            divTodo.classList.add("completed")
        }

        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo.text;
        newTodo.classList.add("listItemTodo");
        divTodo.appendChild(newTodo);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="bx bxs-message-square-x"></i>';
        deleteBtn.classList.add("btn-delete");
        deleteBtn.setAttribute("data-index", index);
        divTodo.appendChild(deleteBtn);

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="bx bxs-check-circle"></i>';
        completeBtn.classList.add("btn-complete");
        completeBtn.setAttribute("data-index", index);
        divTodo.appendChild(completeBtn);

        listToDo.appendChild(divTodo);

    });
}

function addTodo(event){
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if(taskText === "")
        return;
    const newTask ={
        text: taskText,
        completed: false,
    };

    todos.push(newTask);
    todosShow(todos);

    todoInput.value = "";

}
function listClick(e){
    let item = e.target;

    if (item.tagName === "I") {
        item = item.parentElement;
    }

    const indexnum = item.getAttribute("data-index");
    if (indexnum === null)
        return;

    if (item.classList.contains("btn-delete")){
        todos.splice(indexnum, 1)
        todosShow(todos);
    }

    if(item.classList.contains("btn-complete")){
        todos[indexnum].completed = !todos[indexnum].completed;
        todosShow(todos);
    }
}
function todoFilter(){
    const selectValue = selectTodo.value;

    let selectFilterTodo;

    if(selectValue === "all"){
        selectFilterTodo = todos;
    }else if (selectValue === "complete") {
        selectFilterTodo = todos.filter(task => task.completed === true);
    }else if (selectValue === "incomplete"){
        selectFilterTodo = todos.filter(task => task.completed === false)
    }

    todosShow(selectFilterTodo);
}