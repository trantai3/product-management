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

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href) // get url 
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length // check input checked 
            if(countChecked == inputsId.length) 
                inputCheckAll.checked = true
            else
                inputCheckAll.checked = false
        })
    })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()  // prevent load page
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeChange = e.target.elements.type.value
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này ?")
            if (!isConfirm) {
                return;
            }
        }
        
        if(inputsChecked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(input => {
                const id = input.value
                
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id)
                }
            })
                inputIds.value = ids.join(", ")
                formChangeMulti.submit()
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi!")
        }

    })

}
// End Form Change Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time)
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End upload image

// Sort
const sort = document.querySelector("[sort]")
if (sort) {
    let url = new URL(window.location.href)
    const sortSelect = sort.querySelector("[sort-select]")

    sortSelect.addEventListener("change", () => {
        const [sortKey, sortValue] = sortSelect.value.split("-")
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href
    })

    const selectedSortKey = url.searchParams.get("sortKey")
    const selectedSortValue = url.searchParams.get("sortValue")
    if (selectedSortKey && selectedSortValue) {
        const stringSort = `${selectedSortKey}-${selectedSortValue}`
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected = true
    }
}
