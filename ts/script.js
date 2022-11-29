const list = document.querySelector('#list');
const input = document.querySelector('#input');
const dateElement = document.getElementById("date");
const LIST = [];
let id = 0;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
        }
        input.value = '';
    }
});
function addToDo(toDo, id, done, trash) {
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';
    const text = '<li class="item">' +
        '<i class="fa ' + DONE + ' co" job="complete" id="' + id + '"></i>' +
        '<p class="text ' + LINE + '">' + toDo + '</p>' +
        '<i class="fa fa-trash-o de" job="delete" id="' + id + '"></i>' +
        '</li>';
    const position = "beforeend";
    list.insertAdjacentHTML(position, text);
}
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener('click', function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob === 'complete') {
        completeToDo(element);
    }
    else if (elementJob === 'delete') {
        removeToDo(element);
    }
});
