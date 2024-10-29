class ToDo {
  constructor(
    title,
    project = "default",
    description = "",
    dueDate = "",
    priority = "",
    notes = "",
    checklist = ""
  ) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }

  toJSON() {
    return {
        //Converts to JSON
        title: this.title,
        project: this.project,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        notes: this.notes,
        checklist: this.checklist
    };
  }
}

// Controller Class
class ToDoList {
    constructor (name) {
        this.ToDoList = new Map(); // Using Maps, recommended by StackOverflow
        this.Index = 0;
        this.Name = name;
    }

    checkTitle (title) {
        //Check if title is valid, >30 characters
        if(typeof title !== "string" || title.length > 30) {
            throw new Error("Invalid Title");
        }
    }

    // Returns JSON of ToDo Item, searched by index
    getToDoItem (index) {
        const ToDoItem = this.ToDoList.get(index);
        return ToDoItem.toJSON();
    }

    getAllToDoItems() {
        // .values() iterates over a map, then .map() turns the JSONs into an array.
        console.log(Array.from(this.ToDoList.values()).map(todo => todo.toJSON()));
        return Array.from(this.ToDoList.values()).map(todo => todo.toJSON());
    }

    increaseIndex () {
        return this.Index++;
    }

    addToDo (title, project = "default", description) {
        this.checkTitle(title);
        const index = this.increaseIndex();
        const toDo = new ToDo(title, project, description);
        this.ToDoList.set(index, toDo);

        // Return index for use in DOM later
        return index;
    }

}

export { ToDo, ToDoList };