

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

function horizScroll(activeSection, position, interPosition) {
    console.log(activeSection.start + " " + activeSection.end + " " + position);
    document.getElementById("debug").innerHTML = activeSection.id
    document.getElementById("debug").style.transform = "translateX(" + interPosition/3 + "px)";
}


function handleScroll(e) {
    let position = document.querySelector("#scrollBox").scrollTop;
    let activeSection = {id: null, start: 0, end: actionSectionBarriers[1].start};
    let interPosition = 0;
    for (var i = 0; i < actionSectionBarriers.length; i++) {
        if (position > actionSectionBarriers[i].start) {
            activeSection = actionSectionBarriers[i]
            interPosition = position - actionSectionBarriers[i].start;
        }
    }
    horizScroll(activeSection, position, interPosition)
}

document.querySelector("#scrollBox").addEventListener("scroll", (e) => {handleScroll(e)});

