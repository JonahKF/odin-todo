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
        //Converts to JSON
        title: this.title,
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

    checkTitle (title) { // Replace w/ cap on input field length
        //Check if title is valid, > 60 characters
        if(typeof title !== "string" || title.length > 60) {
            throw new Error("Invalid Title");
        }
    }

    // Returns JSON of ToDo Item, searched by index
    getToDoItem (index) {
        const ToDoItem = this.ToDoList.get(index);
        return ToDoItem.toJSON();
    }

    deleteToDoItem (indexToDelete) {
        // Create a new Map to store reindexed items
        const newMap = new Map();
        let newIndex = 0;
        
        // Iterate through all items and reindex them
        this.ToDoList.forEach((value, key) => {
            if (key !== indexToDelete) {
                newMap.set(newIndex, value);
                newIndex++;
            }
        });
        
        // Replace the old map with the reindexed one
        this.ToDoList = newMap;
        this.Index = newIndex;
    }

    getAllToDoItems() {
        return Array.from(this.ToDoList.values()).map(todo => todo.toJSON());
    }

    increaseIndex () {
        return this.Index++;
    }

    addToDo (title, description, dueDate) {
        this.checkTitle(title);
        const index = this.increaseIndex();
        const toDo = new ToDo(title, description, dueDate);
        this.ToDoList.set(index, toDo);

        // Return index for use in DOM later
        return index;
    }

}

export { ToDo, ToDoList };