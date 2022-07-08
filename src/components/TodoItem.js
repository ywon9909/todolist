import React, { Component } from "react";
import './TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
      }
    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        console.log(id);

        return (
            <div className="todo-item" onClick={() => onToggle(id)}> {/*onClick={onToggle{id}} 라고 하면 렌더링할 때 호출됨, 호출->데이터변경->리렌더링->함수호출..->무한반복하므로 절대 안됨 */}
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 함, 만약 이 작업을 안하면 onRemocve->onToggle 까지 실행, 이벤트 확산을 멈춤
                    onRemove(id)
                }
                }>&times;</div>
                <div className={`todo-text ${checked ? 'checked' : ''}`}> {/*false일 경우 공백, `todo-text ${checked && 'checked'}`과 "todo-text " + checked && 'checked' 동일 */}
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }

}

export default TodoItem;
// text: todo 내용
// checked: 체크박스 상태
// id: todo 의 고유 아이디
// onToggle: 체크박스를 키고 끄는 함수
// onRemove: 아이템을 삭제시키는 함수