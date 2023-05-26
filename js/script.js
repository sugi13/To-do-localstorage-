let inputField = document.querySelector('#input');
let AddButton = document.querySelector('#add-btn');
let listContainer = document.querySelector('.list-container');
let TaskCount = document.querySelector('#task-count');

let count = 1;

let emptyArray = [];


window.onload = loadData;

// 👉 function for rendering contents // 

function loadData() {
    let data = [...JSON.parse(localStorage.getItem('data'))];

    data.forEach((item) =>{
        let listElement = document.createElement('li');
        let removeButton = document.createElement('p');
        let DoneButton = document.createElement('p');
        let ButtonHolders = document.createElement('div');
        let taskHolder = document.createElement('div');

        taskHolder.setAttribute('class', 'task-holder');
        ButtonHolders.setAttribute('class', 'button-holder');
        DoneButton.setAttribute('onclick', 'TasksDone(event)');

        ButtonHolders.appendChild(removeButton);
        ButtonHolders.appendChild(DoneButton);

        taskHolder.appendChild(listElement);
        taskHolder.appendChild(ButtonHolders);


        listElement.innerHTML = item;
        removeButton.innerHTML = `<i class="ai-trash-can"></i>`;
        DoneButton.innerHTML = `<i class="ai-circle-check-fill"></i>`;

        listContainer.appendChild(taskHolder);
        removeButton.setAttribute('onclick', 'removeItem(event)');
    })
}

// 👉 function create task and store in local storage //
function addItem(){

   if(inputField.value == ''){
    alert('Add Task!');
   }
   
   else{
    let inputValue = inputField.value;
    emptyArray.push(inputValue);

    // 👉 upload array to local storage //
    localStorage.setItem('data', JSON.stringify(emptyArray)); // stored as a string //

     listElement = document.createElement('li');
     removeButton = document.createElement('p');
     DoneButton = document.createElement('p');
     taskHolder = document.createElement('div');
     ButtonHolders = document.createElement('div');

    
    taskHolder.setAttribute('class', 'task-holder')
    ButtonHolders.setAttribute('class', 'button-holder');
    DoneButton.setAttribute('onclick', 'TasksDone(event)');


    ButtonHolders.appendChild(removeButton);
    ButtonHolders.appendChild(DoneButton);

    taskHolder.appendChild(listElement);
    taskHolder.appendChild(ButtonHolders);

    listElement.innerHTML = inputValue;
    removeButton.innerHTML = `<i class="ai-trash-can"></i>`;
    DoneButton.innerHTML = `<i class="ai-circle-check-fill"></i>`;

    listContainer.appendChild(taskHolder);
    removeButton.setAttribute('onclick', 'removeItem(event)');

    inputField.value = '';
   }
}

// 👉 remove item from local storage and DOM //
function removeItem(event){
     text = event.target.parentNode.parentNode.parentNode;
    console.log(text);
    let removeItem = [...JSON.parse(localStorage.getItem('data'))];

    removeItem.forEach((item) =>{
        if(item === text.innerText){
           removeItem.splice(removeItem.indexOf(item),  1);
        }
    })
   // update local storage //
    location.reload(localStorage.setItem('data', JSON.stringify(removeItem)));   
}

function TasksDone(event){
    let doneContent = event.target.parentNode.parentNode.parentNode.childNodes[0];
    doneContent.classList.add('done');
}


AddButton.addEventListener('click', addItem);