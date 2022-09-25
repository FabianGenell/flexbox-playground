let controllerEl = document.getElementById('controller');
let childControllerRowEls = document.querySelectorAll('div.child-controller-row');
let flexContainerEl = document.getElementById('flex-container');

let flexChildren = new Array();

//on change get id of element changed and that id will be the flex-box property and can be used to update that property.
controllerEl.addEventListener('change', (e) => { updateValue(e) });

function updateValue(e) {
    //styleKey is the flexbox property we want to change
    let styleKey = e.target.parentNode.id;

    let targetEl = flexContainerEl;

    //the item settings have the id of the property not in the div but in the input
    if (!styleKey) {
        styleKey = e.target.id;

        //Change the target element to the flex item
        let targetElNumber = e.target.parentNode.parentNode.id.split('-').pop();
        let targetId = 'flex-child-' + targetElNumber;

        targetEl = document.getElementById(targetId);
    }

    //style value is the value of that property
    let styleValue = e.target.value

    console.log(`Updated ${styleKey} to ${styleValue}`);

    targetEl.style[styleKey] = styleValue;
}

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
    <span class="material-symbols-outlined flex-child-button" onclick="childRemove('${child.id}')">delete</span>
    <h2>${flexChildren.length}</h2>`

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


    //get the number from id
    let number = id.split('flex-child-').pop();
    let settingsId = 'child-controller-' + number;


    //if there already is an element with the id - just make it visible
    let settingsWindow = document.getElementById(settingsId);

    if (settingsWindow) {

        settingsWindow.style.display = 'block';
        console.log('Settings window already exists, making it visible');
        return;

    }

    //since it doesn't exist lets go ahead and create one
    settingsWindow = document.createElement('section');

    settingsWindow.classList.add('child-controller');
    settingsWindow.id = settingsId;

    //adding the delete and settings buttons
    settingsWindow.innerHTML = `
    <div class="child-controller-head">Flex Item ${number}</div>
    <span class="child-controller-close" onClick="closeSettings('${settingsId}')">x</span>
    <div class="controller-row child-controller-row">
        <span>order: </span>
        <input type="text" id="order" value="0">
    </div>
    <div class="controller-row child-controller-row">
        <span>flex-grow: </span>
        <input type="text" id="flew-grow" value="0">
    </div>
    <div class="controller-row child-controller-row">
        <span>flex-shrink: </span>
        <input type="text" id="flex-shrink" value="0">
    </div>
    <div class="controller-row child-controller-row">
        <span>flex-basis: </span>
        <input type="text" id="flex-basis" value="0">
    </div>
    <div class="controller-row child-controller-row">
        <span>align-self: </span>
        <select id="align-self">
            <option value="auto">auto</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="stretch">stretch</option>
            <option value="baseline">baseline</option>
        </select>
    </div>
    <div class="controller-row child-controller-row">
    <span>width: </span>
    <input type="text" id="width" value="200px">
</div>
<div class="controller-row child-controller-row">
    <span>height: </span>
    <input type="text" id="height" value="200px">
</div>

    `

    makeDraggable(settingsWindow);
    settingsWindow.addEventListener('change', (e) => { updateValue(e) });


    //add settings window to wrapper
    document.getElementsByClassName('wrapper')[0].appendChild(settingsWindow); //flexContainerEl.appendChild(child);


}

function closeSettings(settingsId) {
    document.getElementById(settingsId).style.display = 'none';

}










// The current position of mouse
let x = 0;
let y = 0;
let ele;


function makeDraggable(element) {

    if (!element) { return; }

    console.log(`Making ${element.id} draggable`);

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
