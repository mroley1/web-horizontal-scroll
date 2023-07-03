

let actionSectionBarriers = []

let actionSections = document.querySelectorAll(".actionSection")

function calculateBarriers() {
    console.log("calculated!")
    for (var i = 0; i < actionSections.length; i++) {
        barrier = actionSections[i];
        actionSectionBarriers[i] = {
            id: barrier.id,
            start: barrier.getBoundingClientRect().top + document.querySelector("#scrollBox").scrollTop,
            end: barrier.getBoundingClientRect().bottom + document.querySelector("#scrollBox").scrollTop
        }
    }
}
calculateBarriers()

function resizeHandler() {
    calculateBarriers()
}
window.onresize = resizeHandler;

function handleScroll(e) {
    let position = document.querySelector("#scrollBox").scrollTop;
    for (var i = 0; i < actionSectionBarriers.length; i++) {
        if (position > actionSectionBarriers[i].start && position < actionSectionBarriers[i].end) {
            console.log(actionSectionBarriers[i].id);
        }
    }
}

document.querySelector("#scrollBox").addEventListener("scroll", (e) => {handleScroll(e)});

