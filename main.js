

function handleScroll(e) {
    console.log(document.querySelector("#scrollBox").scrollTop)
}

document.querySelector("#scrollBox").addEventListener("scroll", (e) => {handleScroll(e)});