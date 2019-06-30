declare var $: any;
declare class TodoListComponent {
    private $el;
    constructor(el: HTMLElement);
    render(todos: any): void;
    private renderTodo;
}
