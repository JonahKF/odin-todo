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

// Controller Class
class ToDoList {
    constructor (name) {
        this.ToDoList = new Map(); // Using Maps, recommended by StackOverflow
        this.Index = 0;
        this.Name = name;
        this.loadFromStorage();
    }

    saveToStorage() {
        const saveData = {
            todos: Array.from(this.ToDoList.entries()),
            index: this.Index,
            name: this.Name
        };
        localStorage.setItem('todoList', JSON.stringify(saveData));
    }

    loadFromStorage() {
        const savedData = localStorage.getItem('todoList');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            this.Name = parsed.name;
            this.Index = parsed.index;
            
            // Clear existing map and rebuild from saved data
            this.ToDoList.clear();
            parsed.todos.forEach(([key, value]) => {
                this.ToDoList.set(Number(key), ToDo.fromJSON(value));
            });
        }
    }

    // Call when updating in index.js
    updateToDo(index, updates) {
        const todo = this.ToDoList.get(index);
        if (!todo) return false;

        Object.assign(todo, updates);
        this.saveToStorage(); // Save after updating
        return true;
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
        this.saveToStorage();

        // Return index for use in DOM later
        return index;
    }

    clearStorage() {
        localStorage.removeItem('todoList');
        this.ToDoList.clear();
        this.Index = 0;
    }

}

export { ToDo, ToDoList };