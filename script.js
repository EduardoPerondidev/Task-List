const taskList = document.getElementById('task-list')

const taskForm = document.querySelector('.task-form')
taskForm.addEventListener('submit', function(e){
    e.preventDefault()
    let taskTitle = document.querySelector('.task-name-input').value
    let taskTitleInput = document.querySelector('.task-name-input')

    let taskUrgency = document.querySelector('#urgency-select').value
    let taskUrgencyInput = document.querySelector('#urgency-select')
    taskUrgencyInput.value = ''
    taskTitleInput.value = ''
    createTask(taskTitle, taskUrgency)
})

let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
function createTask(title, urgency){
    let task = {}
    task.title   = title
    task.urgency = urgency
    taskArray.unshift(task)
    storage()
    insertTaskOnHTML(taskArray)
}

function insertTaskOnHTML(array){
    taskList.innerHTML = ''
    array.sort((firstElement, secondElement) => secondElement.urgency - firstElement.urgency)
    for(let i = 0; i < array.length; i++){
        let listItem = document.createElement('li')
        listItem.className = 'task-list-item'

        let taskDiv = document.createElement('div')
        taskDiv.className = 'task-div'

        let span = document.createElement('span')
        span.className = 'task-urgency-color'
        if(array[i].urgency == '2'){
            span.classList.add('important')
        }
        if(array[i].urgency == '3'){
            span.classList.add('urgent')
        }
        taskDiv.appendChild(span)

        let taskName = document.createElement('p')
        taskName.className = 'task-name'
        taskName.innerText = `${array[i].title}`
        taskDiv.appendChild(taskName)

        listItem.appendChild(taskDiv)

        let removeButton = document.createElement('button')
        removeButton.className = 'remove-task-button'
        removeButton.id = `${i}`
        listItem.appendChild(removeButton)
        
        taskList.appendChild(listItem)
    }
}

taskList.addEventListener('click', function(e){
    let btn = e.target
    if(btn.tagName == 'BUTTON'){
        let index = btn.id;

        taskArray.splice(index, 1)
        storage()
        insertTaskOnHTML(taskArray)
    }
})

const searchForm = document.querySelector('.search-form')
searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    let taskSearched = document.querySelector('.search-input').value
    let taskSearchedInput = document.querySelector('.search-input')
    filterList(taskSearched)
    taskSearchedInput.value = ''
})
function filterList(string){
    let filteredArray = []
    let input = string.toLowerCase()
    for(let i = 0; i < taskArray.length; i++){
        let titleOfTask = taskArray[i].title.toLowerCase()
        if(titleOfTask.includes(input)){
            filteredArray.push(taskArray[i])
        }
    }
    insertTaskOnHTML(filteredArray)
}

function storage(){
    localStorage.setItem('tasks', JSON.stringify(taskArray))
}

insertTaskOnHTML(taskArray)