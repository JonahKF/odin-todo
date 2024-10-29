import "./styles.css";
import { ToDoList } from "./toDoCreator.js"

function screenController() {
    const listArray = [];

    const listNav = document.querySelector(".list-nav");
    const pageBody = document.querySelector(".container");

    const defaultList = new ToDoList("Default Project");
    listArray.push(defaultList);
    const defaultTaskIndex = defaultList.addToDo("Default Task", "Default Project");


    const displayLists = () => {
        listArray.forEach(list => {
            const navListContainer = document.createElement("div");
            navListContainer.classList.add("nav-list-container");
            navListContainer.id = listArray.indexOf(list);
            listNav.appendChild(navListContainer);

            const navListUl = document.createElement("ul");
            navListContainer.appendChild(navListUl);

            const navListHeaderLi = document.createElement("li");
            navListHeaderLi.classList.add("nav-list-header");
            navListUl.appendChild(navListHeaderLi);

            const wrapperAnchor = document.createElement("a");
            wrapperAnchor.href = "#";
            navListHeaderLi.appendChild(wrapperAnchor);

            const listLogo = document.createElement("i");
            listLogo.classList.add("fa-solid");
            listLogo.classList.add("fa-hashtag");
            wrapperAnchor.appendChild(listLogo);

            const navListHeader = document.createElement("span");
            navListHeader.textContent = list.Name;
            wrapperAnchor.appendChild(navListHeader);

            const taskArray = list.getAllToDoItems();
        });
        // Displays list's Tasks in sidebar
        // taskArray.forEach(ToDo => {
        //     const li = document.createElement("li");
        //     navListUl.appendChild(li);

        //     const div = document.createElement("div");
        //     div.classList.add("list-inner-flex");
        //     div.classList.add("nav-list-child");
        //     li.appendChild(div);

        //     const a = document.createElement("a");
        //     a.href = "#";
        //     div.appendChild(a);

        //     const i = document.createElement("i");
        //     i.classList.add("fa-solid");
        //     i.classList.add("fa-hashtag");
        //     a.appendChild(i);

        //     const span = document.createElement("span");
        //     span.textContent = ToDo.title;
        //     a.appendChild(span);

        //     // Attach event listener for click
        //     a.addEventListener("click", clickTask);
        // });
    }

    const newList = (name) => {
        //const list =

        listArray.push(list);
        displayLists();
    }

    const deleteList = (name) => {

    }

    const clickTask = (e) => {
        // Changes contents of .container to match contents of clicked Task
        console.log(`${e} clicked`)
    }

    // Test ToDo Item
    displayLists();

}



screenController();