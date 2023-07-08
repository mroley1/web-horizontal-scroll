

let actionSectionBarriers = []

let actionSections = document.querySelectorAll(".actionSection")

const SCROLLSPEED = 1;

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function calcTravel(start, end) {
    if (!(start instanceof Pos && end instanceof Pos)) {
        throw new TypeError("\"start\" and \"end\" must be of Pos class");
    }
    return Math.sqrt(((end.x - start.x)**2) + ((end.y - start.y)**2))
}

const ZONEDATA = [
                    {id: "zone1", startPos: new Pos(300, 30), endPos: new Pos(300, 225)},
                    {id: "zone2", startPos: new Pos(350, 300), endPos: new Pos(650, 625)},
                    {id: "zone3", startPos: new Pos(350, 600), endPos: new Pos(50, 925)}
                ]

console.log(calcTravel(new Pos(2, 0), new Pos(0, 2)))
                
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
    let progression = interPosition / (activeSection.end - activeSection.start)
    let zoneData = null;
    for (var i = 0; i < ZONEDATA.length; i++) {
        if (ZONEDATA[i].id == activeSection.id) {
            zoneData = ZONEDATA[i];
        }
    }
    if (zoneData == null) {
        return;
    }
    let x = zoneData.startPos.x + ((zoneData.endPos.x - zoneData.startPos.x) * progression)
    let y = zoneData.startPos.y + ((zoneData.endPos.y - zoneData.startPos.y) * progression)
    console.log(x + " " + y)
    document.getElementById("stickyViewport").style.backgroundPosition = -x + "vw " + -y + "vh"
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

