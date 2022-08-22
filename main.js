
window.addEventListener('load', () => {
        // getting the todos from the local storage y as a string this happens when the window loads in which the values are an array
        // by not doing let or const on todos it becomes a global elelmtn in which we can use outside the scope
	numTask = 0;
    if (JSON.parse(localStorage.getItem('haveDone')) > 0) {
        haveDone = JSON.parse(localStorage.getItem('haveDone'))
    } else {
        haveDone = 0;
    }
    clickDel = 0;
    clickAdd = 0;
    donereset = 0;



    todos = JSON.parse(localStorage.getItem('todos')) || [];
    percent = JSON.parse(localStorage.getItem('percent')) || '';
    // gets the name id input from the html
	const nameInput = document.querySelector('#name');
    // gets the new-todo-form id from the html
	const newTodoForm = document.querySelector('#new-todo-form');
    // gets the username value from the local storage which will be the nameInput that the user will put in from the local storage as a string
	const username = localStorage.getItem('username') || '';
	nameInput.value = username;

    // we will be listening to any changes from the nameInput area the e is an event in which it listens for the handlers actions
	nameInput.addEventListener('change', (e) => {
                // so everytime we change the name input area, it will put in the localStorage as key: username value:input value
		localStorage.setItem('username', e.target.value);
	})
    // Inside the new-todo-form in the html there is an input tag with type,name,id. Here we will wait till the user to hit the submit button.
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
// we will grab the name="content" value and others and make an objust and push it to the todos hashmap(localstorage)
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);
// turns our todo list into string bc localstorage only allows you to store strings inside the hashmap
		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form: this resets the form after we entered in our todos
		e.target.reset();
        numTask += 1;
        clickAdd +=1;
        // A function to display our todos
        DisplayTodos();
        let sumTask = (JSON.parse(localStorage.todos).length)
        localStorage.setItem('numTask',sumTask);
	})
    // Calls this when the page is loaded
    DisplayTodos();
})

function DisplayTodos() {

    // id todo-list
    const todoList = document.querySelector('#todo-list');

    // clear all the elements
    todoList.innerHTML = '';
    // loop through each of our todo in our todos array
    todos.forEach(todo => {
        // no we are going to reassemble the quoted out html code that we format in js
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
        // checks if input == done
		input.checked = todo.done;
        // adds the bubble class
        span.classList.add('bubble')
        // will tell us if it's blue or pink
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        // displays what we put into our todos
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

        if(todo.done) {
            todoItem.classList.add('done');
        }
        // This evenlisten checks to see if we checked the boxes in our todo area in which if we do, we will put a cross across the todo values and it will be saved in the local storage
        input.addEventListener('click', e =>{
            // cjeck if what we checked is clicked
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))
            if (todo.done) {
                todoItem.classList.add('done');
                haveDone += 1
                donereset += 1
                localStorage.setItem('haveDone',JSON.stringify(haveDone));
            } else {
                todoItem.classList.remove('done');
                haveDone =  parseInt(localStorage.getItem('haveDone')) - 1
                localStorage.setItem('haveDone',haveDone);
            }

            DisplayTodos();
        })
        // edit button
        edit.addEventListener('click', e =>{
            // selects the content area
            const input = content.querySelector('input')
            // lets us edit
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e=>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                DisplayTodos();
            })
        })
		deleteButton.addEventListener('click', (e) => {
			// a way of deleting, filter will take out values from the array that do not equal and only displays the ones that does
            todos = todos.filter(t => t != todo);
            clickDel += 1
            var numTask =  parseInt(localStorage.getItem('numTask')) - 1
            localStorage.setItem('numTask',numTask);
            if (todo.done) {
                haveDone =  parseInt(localStorage.getItem('haveDone')) - 1
                localStorage.setItem('haveDone',haveDone);
            }
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
        
        let restBtn = document.getElementById('res')
        restBtn.addEventListener('click', function() {
            todos = [];
            clickDel = 0;
            clickAdd = 0;
            donereset = 0;
            haveDone = 0;
            localStorage.setItem('haveDone',0);
            localStorage.setItem('numTask',0);
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.clear()
			DisplayTodos()
        })
        // Progress Bar

        let numur = Number(localStorage.getItem('haveDone'));
        let denom = (JSON.parse(localStorage.todos).length);

        let circularProgress = document.querySelector(".circular-progress"),
        progressValue = document.querySelector(".progress-value");
    
        let progressStartValue = -1,    
        progressEndValue = (Math.floor(numur/denom * 100)),    
        speed = 100;

        let progress = setInterval(() => {
        progressStartValue++;
    
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`
    
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }    
        }, speed);
    
    })
}

// date
let date = new Date();
let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
let tday = date.getDay();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
document.getElementById("date").innerHTML = "Date: " + month + "/" + day + "/" + year + " , " + daylist[tday];


