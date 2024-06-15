module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    
    if (query.status) {  // key active on URL
        const index = filterStatus.findIndex(item => item.status == query.status) // check if status of every items == status of user add
        filterStatus[index].class = "active" // add class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.status == "") 
        filterStatus[index].class = "active" 
    }

    return filterStatus
}