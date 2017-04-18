let command = prompt('What would you like to do?');

const todoList = [];

while (command !== 'quit') {
  if (command === 'new'){
    let newTodo = prompt('Enter a new todo');
    todoList.push(newTodo);
  }
  else if (command === 'delete') {
    let index = parseInt(prompt('Enter index of todo to delete'));
    todoList.splice(index, 1);
  }
  else if (command === 'list') {
    console.log('*********');
    for (let i=0; i<todoList.length; i++){
      console.log(`${i}: ${todoList[i]}`);
    }
    console.log('*********');
  }
  command = prompt('What would you like to do?');
}
