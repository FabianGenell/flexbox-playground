let controllerEl = document.getElementById('controller');
let childControllerRowEls = document.querySelectorAll('div.child-controller-row');
let flexContainerEl = document.getElementById('flex-container');

let flexChildren = new Array();

//on change get id of element changed and that id will be the flex-box property and can be used to update that property.
controllerEl.addEventListener('change', (e) => {
    //styleKey is the flexbox property we want to change
    let styleKey = e.target.parentNode.id;
    //style value is the value of that property
    let styleValue = e.target.value

    console.log(`Updated ${styleKey} to ${styleValue}`);

    flexContainerEl.style[styleKey] = styleValue;


});


//if you click anywhere in the flex child controller rows it will select typing (focus) in the text box
childControllerRowEls.forEach(element => {
    element.addEventListener('click', (e) => {

        let div = e.target;

        //if what they clicked is not a div (so they clicked the text or textbox or select or whatever)
        if (div.tagName !== 'div') {
            //then select the parent div
            div = div.parentNode;
        }

        //set focus on the second child of div (which will be the input / selection)
        div.children[1].focus()
    });


});


function createFlexChild(container, amount) {

    //if container or amount isn't specified, use default values
    container = container || flexContainerEl;
    amount = amount || 1;

    for (let index = 0; index < amount; index++) {

        let child = document.createElement('div');

        child.classList.add('flex-child');
        child.id = 'flex-child-' + flexChildren.length;

        //adding the delete and settings buttons
        child.innerHTML = `<span class="material-symbols-outlined flex-child-button" onclick="childSettings('${child.id}')">settings</span>
    <span class="material-symbols-outlined flex-child-button" onclick="childRemove('${child.id}')">delete</span>`

        container.appendChild(child); //flexContainerEl.appendChild(child);

        flexChildren.push(child);

    }

}


createFlexChild(flexContainerEl, 3);
console.log(`Created ${flexChildren.length} flex items`);



function childRemove(id) {
    console.log(`Flex item with id ${id} removed`)
    element = document.getElementById(id);
    element.remove();

    flexChildren[flexChildren.indexOf(element)].removed = true;

}

function childSettings(id) {
    console.log(`Opening ${id} flex item settings`);
}



// The current position of mouse
let x = 0;
let y = 0;
let ele;


function makeDraggable(element) {

    console.log(`Makine element with id ${element.id} draggable`);

    //add mousedown event listener to element
    element.addEventListener('mousedown', (e) => { mouseDownHandler(e, element) }); //if i remove an item entirely - do i still need to remove its event listeners?

}

function mouseDownHandler(e, element) {

    ele = element;

    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;
    document.addEventListener('mousemove', mouseMoveHandler);

    document.addEventListener('mouseup', mouseUpHandler);



}

const mouseMoveHandler = function (e) {


    // console.log('moseMoveHandler');

    // How far the mouse has been moved
    const dx = x - e.clientX;
    const dy = y - e.clientY;


    /*
    Because as soon as we add a location styling the position: absolute; starts taking effect we have to grab the
    absolute coordinates to the left (with getBoundingClientRect())
    */
    const styleLeft = parseFloat(ele.style.left.split('px')[0]) || ele.getBoundingClientRect().left;
    const styleTop = parseFloat(ele.style.top.split('px')[0]) || ele.getBoundingClientRect().top;


    coordX = styleLeft - dx;
    coordY = styleTop - dy;

    // console.log('clientX: ' + e.clientX);
    // console.log('ele.style.left: ' + ele.style.left);
    // console.log('rect.left: ' + rect.left);
    // console.log('moved(dx) ( - ): ' + dx);
    // console.log('left difference (rect - style): ' + (rect.left - ele.style.left.split('px')[0]));
    // console.log('coordX: ' + coordX);

    ele.style.left = coordX + 'px';
    ele.style.top = coordY + 'px';

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;

}

const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};


makeDraggable(document.getElementById('child-controller'));
