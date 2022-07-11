import React, {Component} from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends Component { //보여주는 리스트가 동적인 경우 클래스형 컴포넌트로 작성, 클래스형 컴포넌트로 작성해야 나중에 컴포넌트 성능 최적화 할 수 있음.
    
    shouldComponentUpdate(nextProps, nextState) {//컴포넌트가 리렌더링을 하지 말지를 정해줌. 업데이트에 영향을 끼치는 조건을 return
        return this.props.todos !== nextProps.todos; 
      }

      
    render(){
        const {todos, onToggle, onRemove} = this.props;
        
        const todoList = todos.map(
            ({id, text, checked, color}) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                    color={color}
                />
            )
        );

        return(
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;
// 3가지 props를 받음
// todos: todo 객체들이 들어있는 배열
// onToggle: 체크박스를 키고 끄는 함수
// onRemove: 아이템을 삭제시키는 함수