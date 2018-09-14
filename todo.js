var todoListContainer = document.getElementById('todoListContainer'),
    newTodo = document.getElementById('newTodo'),
    errorMsg = document.getElementById('errorMsg');

init();

function init() {
	newTodo.focus();
}
function createTodoElement(todo){
	var el = document.createElement('div'),
	    todoEl = document.createElement('span'),
	    deleteBtn = document.createElement('button'),
	    doneBtn = document.createElement('button'),
	    undoBtn = document.createElement('button');

	todoEl.innerHTML = todo + '&nbsp;'
	todoEl.className = 'todoEl';
	
	todoEl.setAttribute('id', 'span_'+todo);
	deleteBtn.setAttribute('id','deleteBtn_'+todo);
	doneBtn.setAttribute('id','doneBtn_'+todo);
	undoBtn.setAttribute('id','undoBtn_'+todo);
	
	el.appendChild(todoEl);
	el.appendChild(deleteBtn);
	el.appendChild(doneBtn);
	el.appendChild(undoBtn);
	return el;
}
function addNewTodo(){
	clearErrorMsg();
	var result = isDuplicated(newTodo.value);
	if(result){
		setErrorMsg('Duplicated Item');
		return;
	}
	if(newTodo.value == ''){
		setErrorMsg('Please enter valid item');
		return;
	}
	var warningMsgEl = document.getElementById('warningMsg');
	if(warningMsgEl){
		todoListContainer.removeChild(warningMsgEl);
	}
	
	var el = createTodoElement(newTodo.value);
	todoListContainer.appendChild(el);
	completeDeleteBtn(newTodo.value, el); 
	completeDoneBtn(newTodo.value, el);
	completeUndoBtn(newTodo.value, el);
	 
	newTodo.value = '';
	newTodo.focus();
}
//-----------------------------------------------------------------------------------------
function isDuplicated(todo){
	var result= false;
	for (i = 0; i < todoListContainer.childNodes.length; i++){
		if(todoListContainer.childNodes[i].nodeName== 'DIV' && 
		   todoListContainer.childNodes[i].outerText.toString().trim() == todo.toString().trim()){
			result = true;
			return result;
		}
	}
	return result;
}

function completeDeleteBtn(todo, el){
	var deleteBtn = document.getElementById('deleteBtn_'+todo);
	
	deleteBtn.title='Delete';
	deleteBtn.className='btn btn-delete';
	deleteBtn.onclick = function(){
		deleteTodo(todo, el);
	};
}
function completeDoneBtn(todo, el){
	var doneBtn = document.getElementById('doneBtn_'+todo),
	    undoBtn = document.getElementById('undoBtn_'+todo),
	    todoEl = document.getElementById('span_'+todo);
	
	doneBtn.title = 'Done';
	doneBtn.className = 'btn btn-done';
	doneBtn.onclick = function(){
		doneTodo(todoEl, doneBtn, undoBtn);
	};
}
function completeUndoBtn(todo, el){
	var undoBtn = document.getElementById('undoBtn_'+todo),
	    doneBtn = document.getElementById('doneBtn_'+todo),
	    todoEl = document.getElementById('span_'+todo);
	
	undoBtn.title = 'Undo';
    	undoBtn.className = 'hide';
	undoBtn.onclick = function (){
		undo(todoEl, undoBtn, doneBtn);
	}
}

function deleteTodo(todo, el){
	var result = confirm("Do you Want to delete '"+ todo+ "' ?");
	if (result) {
		todoListContainer.removeChild(el);
		
		var counter = 0;
		for (i = 0; i < todoListContainer.childNodes.length; i++) { 
			if(todoListContainer.childNodes[i].nodeName== 'DIV'){
				counter ++;
				return;
			}
		}
		if(counter == 0 ){
			var msg= document.createElement('div');
			msg.id='warningMsg';
			msg.className= 'warning-msg';
			msg.innerHTML= 'No item is availeble!';
			todoListContainer.appendChild(msg);
		}
	}
	else return ;
}
function doneTodo(todoEl,doneBtn, undoBtn){
	var result = confirm("Do you Want to done '"+ todoEl.innerText+ "' ?");
	if (result) {
		todoEl.className = 'todoEl complete-txt';
		doneBtn.className= 'btn disable-done-btn';
		doneBtn.disabled = true;
		undoBtn.className = 'btn btn-undo visible';
	}
}
function undo(todoEl, undoBtn, doneBtn ){
	var result = confirm("Do you Want to undo '"+ todoEl.innerText+ "' ?");
	if (result) {
		undoBtn.className = 'btn btn-undo hide';
		todoEl.className = 'todoEl incomplete-txt';
		doneBtn.className= 'btn btn-done';
		doneBtn.disabled = false;
	}
}

function setErrorMsg(msg){
	errorMsg.innerHTML = msg;
}
function clearErrorMsg(){
	errorMsg.innerHTML='';
}
