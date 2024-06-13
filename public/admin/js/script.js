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

// Form search
const formSearch = document.querySelector("#form-search")
if(formSearch) {
    let url = new URL(window.location.href) // get url 
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault()  // prevent the other website navigation to keep the status like that status=active&keyword=iphone
        //console.log(event.target.elements.keyword.value) // get value
        const keyword = event.target.elements.keyword.value
        if(keyword) {
            url.searchParams.set("keyword", keyword) // set params
        } else { 
            url.searchParams.delete("keyword")    // delete params
        }
        window.location.href = url.href // when click on button will navigate the other website
    })
}