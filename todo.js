var todoListContainer = document.getElementById('todoListContainer'),
    newTodo = document.getElementById('newTodo'),
    errorMsg = document.getElementById('errorMsg'),
    todoList=[];

init();

function init() {
	newTodo.focus();
}

function createTodoElement(todo, index){
	var el = document.createElement('div'),
	    todoEl = document.createElement('span'),
	    deleteBtn = document.createElement('button'),
	    doneBtn = document.createElement('button');

	todoEl.innerHTML = todo + '&nbsp;'
	todoEl.className='todoEl';
	
	deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
	deleteBtn.title='Delete';
	deleteBtn.className='btn btn-delete';
	deleteBtn.onclick = function(){
		deleteTodo(todo, el);
	};
	
	doneBtn.title = 'Done';
	doneBtn.className = 'btn btn-done';
	doneBtn.onclick = function(){
		doneTodo(todoEl, doneBtn);
	};
	
	el.appendChild(todoEl);
	el.appendChild(deleteBtn);
	el.appendChild(doneBtn);
	todoListContainer.appendChild(el);
}
	

function addNewTodo(){
	clearErrorMsg();
	var result = checkDuplicate(newTodo.value);
	if(result !== undefined ){
		errorMsg.innerHTML = 'Duplicated Item';
		return;
	}
	if(newTodo.value == ''){
	errorMsg.innerHTML = 'Please enter valid item';
		return;
	}
	var warningMsgEl = document.getElementById('warningMsg');
	if(document.getElementById('warningMsg')){
		todoListContainer.removeChild(warningMsgEl);
	}
	todoList.push(newTodo.value);

	createTodoElement(newTodo.value);
	newTodo.value = '';
	newTodo.focus();
}

function deleteTodo(todo, el){
	var result = confirm("Do you Want to delete '"+ todo+ "' ?");
	if (result) {
		todoList.splice(todoList.indexOf(todo), 1);
		todoListContainer.removeChild(el);
		
		if(todoList.length == 0 ){
			var msg= document.createElement('div');
			msg.id='warningMsg';
			msg.className= 'warning-msg';
			msg.innerHTML= 'No item is availeble!';
			todoListContainer.appendChild(msg);
		}
	}
	else return ;
}

function doneTodo(todoEl,doneBtn ){
	var result = confirm("Do you Want to done '"+ todoEl.innerText+ "' ?");
	if (result) {
		todoEl.style.color = 'green';
		doneBtn.className= 'btn disable-done-btn';
		doneBtn.disabled = true;
	}
}
function clearErrorMsg(){
	errorMsg.innerHTML='';
}
function checkDuplicate(todo){
	return todoList.find(function (item){
		return item == todo;
	});
}
