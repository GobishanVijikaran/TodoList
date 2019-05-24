const clear = document.querySelector(".clear"); 
const dateElement = document.getElementById("date");
const list = document.getElementById("list"); 
const input = document.getElementById("input");

let listArray = []; 
let id = 0; 

const check = "fa-check-circle"; 
const uncheck = "fa-circle-thin"; 
const line_through = "lineThrough"; 

const options = {weekday : "long", month:"short", day:"numeric"}; 
dateElement.innerHTML = new Date().toLocaleDateString("en-US", options);

function addTask(task, id, done, trash){
    if(trash){
        return; 
    }
    const checkDone = done ? check : uncheck; 
    const checkLine = done ? lineThrough : ""; 
    const item = `<li class="task">
                    <i class="fa ${checkDone}" job="complete" id="${id}"></i>
                    <p class="task-text ${checkLine}">${task}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    const position = "beforeend"; 
    list.insertAdjacentHTML(position, item); 
}

document.addEventListener("keyup", (even)=>{
    if(event.keyCode == 13){
        const task = input.value; 
        if(task)
        {
            addTask(task, id, false, false); 
            listArray.push({
                name: task, 
                id: id, 
                done: false, 
                trash: false
            });

            id++; 
        }
        input.value =""; 
    }
}); 

function completeTask(element){
    element.classList.toggle(check); 
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".task-text").classList.toggle(line_through);
    listArray[element.id].done = listArray[element.id].done ? false : true;
}

function removeTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode); 
    listArray[element.id].trash = true; 
}

list.addEventListener("click", (event)=>{
    const element = event.target; 
    const elementJob = event.attributes.job.value; 

    if(elementJob == "complete"){
        completeTask(element); 
    }
    else if(elementJob == "delete"){
        removeTask(element); 
    }
}); 