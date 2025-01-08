
async function fetchImages(query, page = 1) {
    const accessKey = 'nvYhsZpv73hd4jjKdLPJjU8-W_iu7BEuXT17IMTbm9I';
    const perPage = 30;
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function display(c) {
    const display = await fetchImages(c, 1);
    display.results.forEach((element) => {
        let container = document.querySelector('.images');
        let card = document.createElement('div');
        let hover_btns = document.createElement('div');
        let like = document.createElement('button');
        let download = document.createElement('button');
        let image = document.createElement('img');
        image.src = element.urls.regular;
        card.appendChild(image);
        container.appendChild(card);
        card.appendChild(hover_btns);
        hover_btns.appendChild(like);
        hover_btns.appendChild(download);
        card.classlist = 'group ';
        hover_btns.classList = 'flex justify-between px-6 py-3 *:rounded-md *:w-[124px] hover:scale-105 transition duration-300 ease-in-out hidden *:hover:visible';
        like.innerHTML = "Save";
        download.innerHTML = "Download";
        like.classList = " w-20 h-10 bg-black text-white zindex-1  ";
        download.classList = " w-20 h-10 bg-black text-white zindex-1 ";
    });
}

function search() {
    let container = document.querySelector('.images');
    container.innerHTML = '';
    let search = document.querySelector('#search');
    display(search.value);
    let btns = document.getElementsByClassName("btns");
    let heading = document.querySelector('#heading');
    heading.innerHTML = search.value.toUpperCase();
    search.value = "";
    let options = document.querySelector('#options');
    options.classList.add('hidden');
}


document.addEventListener('DOMContentLoaded', () => {
    display('random');
    let search_press = document.querySelector('#search');
    search_press.addEventListener("keydown", function (e) {

        if (e.key === 'Enter') {
            search();
            e.preventDefault();
        }
    });
    let btns = document.getElementsByClassName("btn")

    Array.from(btns).forEach((element) => {
        element.classList.add("!bg-white")
        element.classList.add("!text-black")
        element.addEventListener("click", function () {
            let btns = document.getElementsByClassName("btn")
            Array.from(btns).forEach(function (e) {

                e.classList.add("!bg-white")
                e.classList.add("!text-black")
            });
            element.classList.remove("!text-black")
            element.classList.remove("!bg-white")
            element.classList.add("bg-black")
            element.classList.add("text-white")
        });
        element.addEventListener("click", function () {
            let container = document.querySelector('.images');
            container.innerHTML = "";
            display(`${element.innerHTML}`);
            let heading = document.querySelector('#heading');
            heading.innerHTML = element.innerHTML.toUpperCase();
        });

    });

});

document.addEventListener('DOMContentLoaded', () => {
    let explore = document.querySelector('#explore');
    explore.addEventListener("click", function () {
        let options = document.querySelector('#options');
        options.classList.remove('hidden');
    });
});


