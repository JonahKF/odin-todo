import "./styles.css";
import { ToDoList } from "./toDoCreator.js"

function screenController() {
    const listNav = document.querySelector(".list-nav");
    const pageBody = document.querySelector(".container");

    const defaultList = new ToDoList("default");
    const defaultTaskIndex = defaultList.addToDo("Task Title", "default");


    const displayList = (list) => {
        // Displays List name in sidebar
        const navListContainer = document.createElement("div");
        navListContainer.classList.add("nav-list-container");
        listNav.appendChild(navListContainer);
        const navListHeader = document.createElement("div");
        navListHeader.classList.add("nav-list-header");
        navListHeader.textContent = list.Name;
        navListContainer.appendChild(navListHeader);

        const taskArray = list.getAllToDoItems();

        // Displays list's Tasks in sidebar
        taskArray.forEach(ToDo => {
            const task = document.createElement("div");
            task.classList.add("nav-list-child");
            task.textContent = ToDo.title;
            navListContainer.appendChild(task);

            // Attach event listener for click
            task.addEventListener("click", clickTask);
        });
    }

    const newList = () => {

    }

    const clickTask = () => {
        // Changes contents of .container to match contents of clicked Task
    }

    // Test ToDo Item
    displayList(defaultList);

}



screenController();