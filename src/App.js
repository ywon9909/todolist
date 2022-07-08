import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate'
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 3 //이미 0,1,2 가 존재하므로

  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트 소개', checked: true },
      { id: 1, text: ' life cycle 소개', checked: false },
      { id: 2, text: ' promise 소개', checked: false }
    ]
  }
  handleChange = (e) => { //텍스트 내용이 바뀌면 state 업데이트
    this.setState({
      input: e.target.value //input의 다음 바뀔 값
    });
  }
  handleCreate = () => { //button 클릭되면 새로운 todo 생성 후 todos 업데이트
    const {input, todos} = this.state;  
    this.setState({
      input: '',
      todos: todos.concat({ //concat을 사용하여 배열에 추가(새 배열을 만든다.), push를 사용하지 않는다. 
        id:this.id++,
        text: input,
        checked: false
      })
    });
  }
  handleKeypress = (e) => {//input에서 Enter 누르면 버튼을 클린한 것과 동일한 작업진행
    if(e.key == 'Enter'){ 
      this.handleCreate();
    }
  }

  handleToggle = (id) =>{
    const {todos} = this.state;

    const index = todos.findIndex(todo => todo.id === id); //파라미터로 받은 id로 몇번째 아이템인지 찾음
    const selected = todos[index]; //선택한 객체
    const nextTodos = [...todos]; //배열을 복사, 배열의 값을 절대 직접 수정하면 안됨

    nextTodos[index] = { //기존의 값들을 복사하고, checked 값 덮어쓰기
      ...selected,
      checked:!selected.checked
    };
    
    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id) //파라미터로 받아온 id를 갖고있지 않은 배열을 새로 생성
    });
  }

  render() {
    const {input, todos} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeypress,
      handleToggle
    } = this;
    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeypress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={this.handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;