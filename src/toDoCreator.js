class ToDo {
  constructor(
    title,
    description = "",
    dueDate = "",
    priority = false,
    notes = "",
    checklist = ""
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      checklist: this.checklist
    };
  }

  static fromJSON(data) {
    return new ToDo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.notes,
      data.checklist
    );
  }
}

class ToDoList {
    constructor(name) {
        this.ToDoList = new Map();
        this.Index = 0;
        this.Name = name;
    }

    checkTitle(title) {
        if (typeof title !== "string" || title.length > 90) {
            throw new Error("Invalid Title");
        }
    }

    getToDoItem(index) {
        const ToDoItem = this.ToDoList.get(index);
        return ToDoItem.toJSON();
    }

    deleteToDoItem(indexToDelete) {
        const newMap = new Map();
        let newIndex = 0;
        
        this.ToDoList.forEach((value, key) => {
            if (key !== indexToDelete) {
                newMap.set(newIndex, value);
                newIndex++;
            }
        });
        
        this.ToDoList = newMap;
        this.Index = newIndex;
    }

    getAllToDoItems() {
        return Array.from(this.ToDoList.values()).map(todo => todo.toJSON());
    }

    increaseIndex() {
        return this.Index++;
    }

    addToDo(title, description, dueDate) {
        this.checkTitle(title);
        const index = this.increaseIndex();
        const toDo = new ToDo(title, description, dueDate);
        this.ToDoList.set(index, toDo);
        return index;
    }

    updateToDo(index, updates) {
        const todo = this.ToDoList.get(index);
        if (!todo) return false;

        Object.assign(todo, updates);
        return true;
    }
}

export { ToDo, ToDoList };