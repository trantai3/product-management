module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }
    if(query.keyword) {
        objectSearch.keyword = query.keyword
        const regex = new RegExp(objectSearch.keyword, "i") // i: no difference between uppercase and lowercase
        // const regex = /keyword/i // false cause look for "keyword" word in database
        objectSearch.regex = regex
    }
    return objectSearch
}