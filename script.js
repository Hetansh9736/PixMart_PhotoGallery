let currentPage = 1; 

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

async function display(query, page = 1) {
    const display = await fetchImages(query, page);
    console.log(display);
    display.results.forEach((element) => {
        let container = document.querySelector('.images');
        let card = document.createElement('div');
        let image = document.createElement('img');
        image.src = element.urls.regular;
        card.appendChild(image);
        container.appendChild(card);
    });
}

function search() {
    let container = document.querySelector('.images');
    container.innerHTML = '';
    let search = document.querySelector('#search');
    currentPage = 1; 
    display(search.value, currentPage);
    let heading = document.querySelector('#heading');
    heading.innerHTML = search.value.toUpperCase();
    search.value = "";
    let options = document.querySelector('#options');
    options.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    display('random', currentPage);
    let search_press = document.querySelector('#search');
    search_press.addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            search();
            e.preventDefault();
        }
    });

    let btns = document.getElementsByClassName("btn");
    Array.from(btns).forEach((element) => {
        element.classList.add("!bg-white");
        element.classList.add("!text-black");
        element.addEventListener("click", function () {
            let btns = document.getElementsByClassName("btn");
            Array.from(btns).forEach(function (e) {
                e.classList.add("!bg-white");
                e.classList.add("!text-black");
            });
            element.classList.remove("!text-black");
            element.classList.remove("!bg-white");
            element.classList.add("bg-black");
            element.classList.add("text-white");
        });
        element.addEventListener("click", function () {
            let container = document.querySelector('.images');
            container.innerHTML = "";
            display(`${element.innerHTML}`, currentPage);
            let heading = document.querySelector('#heading');
            heading.innerHTML = element.innerHTML.toUpperCase();
        });
    });

    let explore = document.querySelector('#explore');
    explore.addEventListener("click", function () {
        currentPage++;
        if (currentPage > 10) currentPage = 1; 
        display('travel', currentPage);
        let container = document.querySelector('.images');
        container.innerHTML = "";
        let heading = document.querySelector('#heading');
        heading.innerHTML = "Trending images";
        let options = document.querySelector('#options');
        options.classList.remove('hidden');
    });

    let showmore = document.querySelector("#show-more");
    showmore.addEventListener("click", () => {
        currentPage++; 
        let searchQuery = document.querySelector('#search').value || 'random'; 
        display(searchQuery, currentPage); 
    });
});
