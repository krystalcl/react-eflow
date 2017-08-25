import {Store} from '../../../src/eflow';
import todoStore from './TodoStore'
import filterStore from './FilterStore'

class TodoFilterStore extends Store{
  constructor(options){
    super(options);
    this.initState({
      filterTodos: []
    });
    this.filterTodos.flowFrom(todoStore.todos);
    this.filterTodos.flowFrom(filterStore.filter);
  }


  filterTodos(){
    let dispatch = this.filterTodos.dispatch,
      todos = todoStore.data(todoStore.todos),
      filter = filterStore.data(filterStore.filter);

    let filterTodos = this.getTodos(todos, filter);
    dispatch(filterTodos);
  }

  getTodos(todos, filter){
    switch (filter) {
    case 'All':
      return todos;
    case 'Completed':
      return todos.filter(t => t.completed);
    case 'Active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
    }
  }



}

export default new TodoFilterStore();