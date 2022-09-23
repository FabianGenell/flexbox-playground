let controllerEl = document.getElementById('controller');
let flexContainerEl = document.getElementById('flex-container');

let children = 0;

//on change get id of element changed and that id will be the flex-boc property and can be used to update that property.
controllerEl.addEventListener('change', (e) => {

    console.log(`Updated ${e.target.id} to ${e.target.value}`);

    flexContainerEl.style[e.target.id] = e.target.value;

});

function createFlexChild(container, amount) {
    for (let index = 0; index < amount; index++) {
        children++;

        let child = document.createElement('div');

        child.classList.add('flex-child');
        child.id = 'flex-child-' + index;
        container.appendChild(child); //flexContainerEl.appendChild(child);

    }

}


createFlexChild(flexContainerEl, 3);
console.log(`Created ${children} flex items`);



