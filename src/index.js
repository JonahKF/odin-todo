import "./styles.css";
import { ToDoList } from "./toDoCreator.js"

function screenController() {
    const listArray = [];

    const listNav = document.querySelector(".list-nav");
    const pageBody = document.querySelector(".container");

    const defaultList = new ToDoList("Default List");
    listArray.push(defaultList);
    const newTaskIndexOne = defaultList.addToDo("Add validator for new project names", "...", "2024-10-31");
    const newTaskIndexTwo = defaultList.addToDo("Import date-fns, make due date changeable", "...", "2024-11-05");
    const newTaskIndexThree = defaultList.addToDo("Add colors based on due date relation to today", "...", "2024-11-07");
    const newTaskIndexFour = defaultList.addToDo("Allow users to make task important with star click", "...", "2024-11-13");
    const newTaskIndexFive = defaultList.addToDo("Add click functionality to edit button on task", "...", "2024-11-23");

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const displayLists = () => {
        listNav.textContent = "";
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

            const div = document.createElement("div");
            div.classList.add("list-inner-flex");
            div.id = listArray.indexOf(list);
            navListHeaderLi.appendChild(div);

            const wrapperAnchor = document.createElement("a");
            wrapperAnchor.href = "#";
            wrapperAnchor.id = listArray.indexOf(list);
            div.appendChild(wrapperAnchor);

            const listLogo = document.createElement("i");
            listLogo.classList.add("fa-solid");
            listLogo.classList.add("fa-hashtag");
            wrapperAnchor.appendChild(listLogo);

            const navListHeader = document.createElement("span");
            navListHeader.textContent = list.Name;
            wrapperAnchor.appendChild(navListHeader);

            div.addEventListener("click", () => clickList(div));
        });
    }

    // New List Setup
    const newListBtn = document.querySelector(".new-list-btn");
    newListBtn.addEventListener("click", () => newListPrompt());

    const body = document.querySelector("body");
    const promptOverlay = document.createElement("div");
    promptOverlay.classList.add("prompt-overlay");
    promptOverlay.id = "popup";
    body.appendChild(promptOverlay);
    const promptContainer = document.createElement("div");
    promptContainer.classList.add("prompt-container");
    promptOverlay.appendChild(promptContainer);
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid");
    plusIcon.classList.add("fa-plus");
    promptContainer.appendChild(plusIcon);

    const promptForm = document.createElement("form");
    promptForm.action = "";
    promptForm.method = "post";
    promptForm.className = "new-list-prompt-form";
    promptContainer.appendChild(promptForm);

    const promptLine = document.createElement("input");
    promptLine.type = "text";
    promptLine.placeholder = "Enter your new project name here..."
    promptLine.required = true;
    promptForm.appendChild(promptLine);

    const submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-check");
    promptForm.appendChild(submitBtn);
    submitBtn.appendChild(checkIcon);

    promptForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const value = promptLine.value;
        const newProject = newList(value);

        promptLine.value = "";
        
        togglePopup();
    });

    const togglePopup = () => {
        const popup = document.getElementById('popup');
        popup.classList.toggle('active');
    }

    document.getElementById('popup').addEventListener('click', function(e) { // Arrow functions don't work here...
        if (e.target === promptOverlay) {  
            togglePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('popup').classList.contains('active')) {
          togglePopup();
        }
    });

    const newListPrompt = () => {
        togglePopup();
    }

    const newList = (name) => {
        const list = new ToDoList(name);
        listArray.push(list);
        displayLists();
    }

    const deleteList = (name) => {

    }

    const clickHome = (e) => {
        pageBody.replaceChildren();

        const divList = document.querySelectorAll("div");
        updateActiveClass(divList, e);

        const pageHeader = createPageHeader(e.textContent);
        pageBody.appendChild(pageHeader);
    }

    const clickToday = (e) => {
        pageBody.replaceChildren();

        const divList = document.querySelectorAll("div");
        updateActiveClass(divList, e);

        const pageHeader = createPageHeader(e.textContent);
        pageBody.appendChild(pageHeader);
    }

    const clickImportant = (e) => {
        pageBody.replaceChildren();

        const divList = document.querySelectorAll("div");
        updateActiveClass(divList, e);

        const pageHeader = createPageHeader(e.textContent);
        pageBody.appendChild(pageHeader);
    }

    const ClickAllTasks = (e) => {
        pageBody.replaceChildren();

        const divList = document.querySelectorAll("div");
        updateActiveClass(divList, e);

        const pageHeader = createPageHeader(e.textContent);
        pageBody.appendChild(pageHeader);

        listArray.forEach((list) => {
            const taskArray = list.getAllToDoItems();
            taskArray.forEach((task, index) => {
                const taskContainer = createTaskContainer(task, index, list);
                pageBody.appendChild(taskContainer);
            });
        });
    }

    const updateActiveClass = (divList, clickedElement) => {
        divList.forEach(element => element.classList.remove("active"));
        clickedElement.classList.add("active");
    };
      
    const createPageHeader = (pageName) => {
        const pageHeader = document.createElement("h2");
        pageHeader.className = "page-name";
        pageHeader.textContent = pageName;
        return pageHeader;
    };
      
    const createTaskContainer = (task, index, list) => {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        taskContainer.id = `task-${index}`;
      
        const checkbox = generateCheckbox(index);
        checkbox.id = `checkbox-${index}`;
        checkbox.addEventListener("click", async () => {
          try {
            checkbox.disabled = true;
            taskContainer.classList.add('fade-out');
            await delay(1000);
            const elementToRemove = document.getElementById(`task-${index}`);
            if (elementToRemove) {
              elementToRemove.remove();
              list.deleteToDoItem(index);
            }
          } catch (error) {
            console.error('Error during task removal:', error);
            checkbox.disabled = false;
            taskContainer.classList.remove('fade-out');
          }
        });
      
        const taskWrapper = document.createElement("div");
        taskWrapper.className = "task-wrapper";
      
        const title = document.createElement("div");
        title.className = "title";
        // const description = document.createElement("span");
        // description.className = "description";
        const dueDate = document.createElement("span");
        dueDate.className = "due-date";
        const priority = document.createElement("span");
        priority.className = "priority";
      
        title.textContent = task.title;
        // description.textContent = task.description;

        const dateSpan = document.createElement("span");
        dateSpan.className = "date-span";
        dueDate.textContent = "Due";
        dateSpan.textContent = task.dueDate;

        const rightIcons = document.createElement("div");
        const editBtn = document.createElement("button");
        const editIcon = document.createElement("i");
        const importantBtn = document.createElement("button");
        const starIcon = document.createElement("i");

        rightIcons.className = "task-right-icons";
        editBtn.classList.add("edit-btn");
        editBtn.id = `edit-btn-${index}`;
        importantBtn.classList.add("important-btn");
        importantBtn.id = `important-btn-${index}`;
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen-to-square");
        starIcon.classList.add("fa-solid");
        starIcon.classList.add("fa-star");
        // const activeElement = document.querySelector(".active");
        // const activeList = listArray[activeElement.id];
        if (list.ToDoList.get(index).priority) {
            starIcon.classList.add("starred");
        };
      
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskWrapper);
        taskWrapper.appendChild(title);
        // taskWrapper.appendChild(description);
        taskWrapper.appendChild(dueDate);
        taskWrapper.appendChild(dateSpan);
        // taskWrapper.appendChild(priority);

        taskContainer.appendChild(rightIcons);
        rightIcons.appendChild(editBtn);
        editBtn.appendChild(editIcon);
        editBtn.addEventListener("click", function(e) {
            const button = e.target.closest('.edit-btn'); // Needed, because the click targets the <i> element
            const activeTaskContainer = e.target.closest('.task-container');
            // console.log("Button ID:", button.id);
            identifier = parseInt(button.id.split("-")[2]);
            console.log(identifier);
            taskPromptTitle.value = activeTaskContainer.querySelector(".title").textContent;
            taskPromptDescription.value = "";
            taskPromptDueDate.value = activeTaskContainer.querySelector(".date-span").textContent;
            editFlag = true;
            toggleTaskPopup();            
        });

        rightIcons.appendChild(importantBtn);
        importantBtn.appendChild(starIcon);
        importantBtn.addEventListener("click", function(e) {
            const button = e.target.closest('.important-btn'); // Needed, because the click targets the <i> element
            identifier = parseInt(button.id.split("-")[2]);

            const activeElement = document.querySelector(".active");
            const activeList = listArray[activeElement.id];
            const activeItem = activeList.ToDoList.get(identifier);
            const activeItemPriority = activeItem.priority;
            console.log(activeItemPriority);
            if (activeItemPriority === false) {
                activeItem.priority = true;
                const activeLogo = button.querySelector("i");
                activeLogo.classList.add("starred");
            }
            else if (activeItemPriority === true) {
                activeItem.priority = false;
                const activeLogo = button.querySelector("i");
                activeLogo.classList.remove("starred");
            }
        });
      
        return taskContainer;
    };
      
    const createNewTaskButton = () => {
        const newTaskBtn = document.createElement("button");
        newTaskBtn.classList.add("new-task-btn");
        const plusIcon = document.createElement("i");
        plusIcon.classList.add("fa-solid");
        plusIcon.classList.add("fa-plus");
        const btnText = document.createElement("span");
        btnText.textContent = "Add Task";
        newTaskBtn.appendChild(plusIcon);
        newTaskBtn.appendChild(btnText);
        return newTaskBtn;
    };
      
    const clickList = (e) => {
        pageBody.replaceChildren();
      
        const divList = document.querySelectorAll("div");
        updateActiveClass(divList, e);
      
        const list = listArray[e.id];
        const pageHeader = createPageHeader(list.Name);
        pageBody.appendChild(pageHeader);
      
        const taskArray = list.getAllToDoItems();
        taskArray.forEach((task, index) => {
          const taskContainer = createTaskContainer(task, index, list);
          pageBody.appendChild(taskContainer);
        });
      
        const newTaskBtn = createNewTaskButton();
        newTaskBtn.addEventListener("click", () => toggleTaskPopup());
        // Attach event listener to newTaskBtn, calling addTask

        pageBody.appendChild(newTaskBtn);
    };

    // New Task Prompt Setup
    const taskPromptOverlay = document.createElement("div");
    taskPromptOverlay.classList.add("task-prompt-overlay");
    taskPromptOverlay.id = "task-popup";
    body.appendChild(taskPromptOverlay);
    const taskPromptContainer = document.createElement("div");
    taskPromptContainer.classList.add("task-prompt-container");
    taskPromptOverlay.appendChild(taskPromptContainer);
    // const taskPlusIcon = document.createElement("i");
    // taskPlusIcon.classList.add("fa-solid");
    // taskPlusIcon.classList.add("fa-plus");
    // taskPromptContainer.appendChild(taskPlusIcon);

    const taskPromptForm = document.createElement("form"); // Grid Start
    taskPromptForm.action = "";
    taskPromptForm.method = "post";
    taskPromptForm.className = "new-task-prompt-form";
    taskPromptContainer.appendChild(taskPromptForm);

    const taskPromptTitleIcon = document.createElement("i");
    taskPromptTitleIcon.classList.add("fa-solid");
    taskPromptTitleIcon.classList.add("fa-plus");
    taskPromptForm.appendChild(taskPromptTitleIcon);
    const taskPromptTitleIndicator = document.createElement("div");
    taskPromptTitleIndicator.classList.add("task-prompt-indicator");
    taskPromptTitleIndicator.textContent = "Task name: "
    taskPromptForm.appendChild(taskPromptTitleIndicator);
    const taskPromptTitle = document.createElement("input");
    taskPromptTitle.type = "text";
    taskPromptTitle.required = true;
    taskPromptTitle.placeholder = "Enter your new task name here...";
    taskPromptForm.appendChild(taskPromptTitle);

    const taskPromptDescriptionIcon = document.createElement("i");
    taskPromptDescriptionIcon.classList.add("fa-solid");
    taskPromptDescriptionIcon.classList.add("fa-plus");
    taskPromptForm.appendChild(taskPromptDescriptionIcon);
    const taskPromptDescriptionIndicator = document.createElement("div");
    taskPromptDescriptionIndicator.classList.add("task-prompt-indicator");
    taskPromptDescriptionIndicator.textContent = "Task description: "
    taskPromptForm.appendChild(taskPromptDescriptionIndicator);
    const taskPromptDescription = document.createElement("input");
    taskPromptDescription.type = "textarea";
    taskPromptDescription.placeholder = "Enter a description here (optional) ...";
    taskPromptForm.appendChild(taskPromptDescription);

    const taskPromptDueDateIcon = document.createElement("i");
    taskPromptDueDateIcon.classList.add("fa-solid");
    taskPromptDueDateIcon.classList.add("fa-plus");
    taskPromptForm.appendChild(taskPromptDueDateIcon);
    const taskPromptDueDateIndicator = document.createElement("div");
    taskPromptDueDateIndicator.classList.add("task-prompt-indicator");
    taskPromptDueDateIndicator.textContent = "Due date: "
    taskPromptForm.appendChild(taskPromptDueDateIndicator);
    const taskPromptDueDate = document.createElement("input");
    taskPromptDueDate.type = "date";
    taskPromptDueDate.placeholder = "...";
    taskPromptDueDate.required = true;
    taskPromptForm.appendChild(taskPromptDueDate);

    let editFlag = false;
    let identifier = 100;
    const taskSubmitBtn = document.createElement("button");
    taskSubmitBtn.className = "task-submit-btn";
    const taskCheckIcon = document.createElement("i");
    taskCheckIcon.classList.add("fa-solid");
    taskCheckIcon.classList.add("fa-check");
    taskPromptForm.appendChild(taskSubmitBtn);
    taskSubmitBtn.appendChild(taskCheckIcon);

    taskPromptForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = taskPromptTitle.value;
        const description = taskPromptDescription.value;
        const dueDate = taskPromptDueDate.value;
        if (!editFlag) {const newProject = addTask(title, description, dueDate)}
        else if (editFlag) {
            editFlag = false; // Reset editFlag
            // Edit ToDo item with index identifier
            const activeElement = document.querySelector(".active");
            const activeList = listArray[activeElement.id];
            const activeItem = activeList.ToDoList.get(identifier);
            activeItem.title = title;
            activeItem.description = description;
            activeItem.dueDate = dueDate;

            // Display tasks
            pageBody.replaceChildren();
      
            const list = activeList;
            const pageHeader = createPageHeader(list.Name);
            pageBody.appendChild(pageHeader);
        
            const taskArray = list.getAllToDoItems();
            taskArray.forEach((task, index) => {
            const taskContainer = createTaskContainer(task, index, list);
            pageBody.appendChild(taskContainer);
            });
        
            const newTaskBtn = createNewTaskButton();
            newTaskBtn.addEventListener("click", () => toggleTaskPopup());

            pageBody.appendChild(newTaskBtn);
        };

        taskPromptTitle.value = "";
        taskPromptDescription.value = "";
        taskPromptDueDate.value = "";
        
        // Turn prompt off
        toggleTaskPopup();
    });

    const toggleTaskPopup = () => {
        const popup = document.getElementById('task-popup');
        popup.classList.toggle('active');
    }

    document.getElementById('task-popup').addEventListener('click', function(e) { 
        if (e.target === taskPromptOverlay) {
            taskPromptTitle.value = "";
            taskPromptDescription.value = "";
            taskPromptDueDate.value = "";
            toggleTaskPopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('task-popup').classList.contains('active')) {
            taskPromptTitle.value = "";
            taskPromptDescription.value = "";
            taskPromptDueDate.value = "";
            toggleTaskPopup();
        }
    });

    const addTask = (title, description, dueDate) => {
        const activeElement = document.querySelector(".active");
        const activeList = listArray[activeElement.id];
        const newToDo = activeList.addToDo(title, description, dueDate);
        pageBody.replaceChildren();
      
        const list = activeList;
        const pageHeader = createPageHeader(list.Name);
        pageBody.appendChild(pageHeader);
      
        const taskArray = list.getAllToDoItems();
        taskArray.forEach((task, index) => {
          const taskContainer = createTaskContainer(task, index, list);
          pageBody.appendChild(taskContainer);
        });
      
        const newTaskBtn = createNewTaskButton();
        newTaskBtn.addEventListener("click", () => toggleTaskPopup());

        pageBody.appendChild(newTaskBtn);
    };

    const generateCheckbox = (index) => {
        // Checkbox, adapted from https://uiverse.io/mrhyddenn/slippery-bear-64
        // Uses index in a seperate function in order to bypass having to use #ids
        const checkBtn = document.createElement("div");
        checkBtn.className = "check-btn-div";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'custom-checkbox';
        checkbox.id = `cbx-${index}`;
        checkbox.style.display = 'none';

        const label = document.createElement('label');
        label.htmlFor = `cbx-${index}`;
        label.className = 'check';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '18px');
        svg.setAttribute('height', '18px');
        svg.setAttribute('viewBox', '0 0 18 18');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z');

        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '1 9 7 14 15 4');

        svg.appendChild(path);
        svg.appendChild(polyline);
        label.appendChild(svg);
        checkBtn.appendChild(checkbox);
        checkBtn.appendChild(label);

        return checkBtn;
    };

    // Generate Default List
    displayLists();

    //Attach listeners to static sidebar items
    const home = document.querySelector(".home");
    const today = document.querySelector(".today");
    const important = document.querySelector(".important");
    const allTasks = document.querySelector(".all-tasks");

    home.addEventListener("click", () => clickHome(home));
    today.addEventListener("click", () => clickToday(today));
    important.addEventListener("click", () => clickImportant(important));
    allTasks.addEventListener("click", () => ClickAllTasks(allTasks));

    // Start on Home page
    clickHome(home);
}



screenController();