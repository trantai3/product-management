// Button status
const buttonsStatus = document.querySelectorAll("[button-status]") // cause self-definition variable so add []
if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href) // get url 
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status") // get attribute button-status
            if(status) {
                url.searchParams.set("status", status) // set params
            } else { 
                url.searchParams.delete("status")    // delete params
            }
            window.location.href = url.href // when click on button will navigate the other website
        })
    })
}