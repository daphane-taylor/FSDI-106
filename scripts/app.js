function saveTask() {
    console.log("saving task");

    //get values
    const title = $("#txtTitle").val();
    const descript = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title,descript,color,date,status,budget);

    //build an object
    let taskToSave = new Task(title, descript, color, date, status, budget);
    console.log(taskToSave);

    //save to server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            displayTask(taskToSave);
            clearForm();
        },
        error: function(error) {
            console.log(error);
            alert("Error saving task. Please try again.");
        }
    });
}

function displayTask(task) {
    let syntax = `
    <div class="task" style="background-color: #1d1d1d">
        <div class="task-header">
            <h5>${task.title}</h5>
            <button class="btn btn-sm btn-light delete-task">Delete</button>
        </div>
        <p class="task-description">${task.description}</p>
        <div class="task-details">
            <span class="badge bg-info">${task.status}</span>
            <span>${task.date}</span>
            <span>Budget: $${task.budget}</span>
        </div>
    </div>`;
        
    $(".list").append(syntax);
}

function loadTasks() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response) {
            let data = JSON.parse(response);
        }});
}

function clearForm() {
    $("#txtTitle").val('');
    $("#txtDescription").val('');
    $("#selColor").val('#000000');
    $("#selDate").val('');
    $("#selStatus").val('');
    $("#numBudget").val('');
}

function deleteAllTasks() {
    $.ajax({
        type: "DELETE",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/clear",
        success: function(response) {
            console.log("All tasks deleted");
            $(".list").empty();
        },
        error: function(error) {
            console.log(error);
            alert("Error deleting tasks. Please try again.");
        }
    });
}

function init() {
    console.log("task manager");
    
    // Load tasks when page initializes
    loadTasks();
    
    // Hook events
    $("#btnSave").click(saveTask);
    $("#btnDeleteAll").click(deleteAllTasks);
}

window.onload = init;