const list : HTMLElement = document.querySelector('#list');
const input : HTMLInputElement = document.querySelector('#input');
const dateElement : HTMLElement = document.getElementById("date");
const LIST : any[] = [];
let id : number = 0;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Show todays date
const options : any = {weekday : "long", month : "short", day : "numeric"};
const today : Date = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);




document.addEventListener('keyup', function (event : KeyboardEvent) {
    if (event.key === 'Enter') {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
        }
        input.value = '';
    }
});

function addToDo (toDo : string, id : number, done : boolean, trash : boolean) {

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

function completeToDo (element : HTMLElement) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo (element : HTMLElement) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}



list.addEventListener('click', function (event : MouseEvent) {
    const element : any = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob === 'complete') {
        completeToDo(element);
    } else if (elementJob === 'delete') {
        removeToDo(element);
    }

});
