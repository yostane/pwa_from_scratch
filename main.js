let animes = Array();
const API_BASE = "https://api.jikan.me/";
const API_ANIME = API_BASE + "anime/"

function buildAnimeMarkup(anime) {
    return `<img class='anime_image' src=${anime.image_url} />` +
        `<h3 class='anime_name'>${anime.title}</h3>` +
        `<p class='anime_description'>${anime.premiered}</p>`;
}

async function loadAnimeAsync(targetElementId) {
    let animeId = document.querySelector("#anime_id_input").value;
    let response = await fetch(API_ANIME + animeId);
    if (!response.ok) {
        return;
    }
    let anime = await response.json();
    console.log("anime", anime);
    animes.push(anime);
    document.querySelector(targetElementId).innerHTML = buildAnimeMarkup(anime);

    document.querySelector('#history').innerHTML = buildAnimeMarkup(anime) + document.querySelector('#history').innerHTML;
}