let api = "https://api.unsplash.com/photos/?client_id=";
let key = "Dr0PsxcHJmu8ZrNdVhPQs-7XMTAH4kvLvajIEXdx3SQ"

document.addEventListener("DOMContentLoaded", async function(){

    let response = await fetch(`${api}${key}`);
    let data = await response.json();
    console.log(data);
    data.unsplash.photos.getPhoto("gCTPav6smJE");
})