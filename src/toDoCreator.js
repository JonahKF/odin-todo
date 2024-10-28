class ToDo {
  constructor(
    title,
    description = "",
    dueDate = "",
    priority = "",
    notes = "",
    checklist = "",
    project = "default"
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.project = project;
  }

  toJSON() {
    return {
        // Convert to JSON here
        
    };
  }
}

// Controller Class
class ToDoController {
    constructor () {
        this.ToDoList = new Map();
        this.Index = 0;
    }

    checkTitle (title) {
        //Check if title is valid, >30 characters
        if(typeof title !== "string" || title.length > 30) {
            throw new Error("Invalid Title");
        }
    }

    increaseIndex () {
        return this.Index++;
    }

    addToDo (title, project = "default") {
        this.checkTitle(title);
    }

    
}

