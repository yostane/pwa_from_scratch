//create an empty array on startup
let animes = Array();
const API_BASE = "https://api.jikan.me/";
const API_ANIME = API_BASE + "anime/"

//generate anime tag
function buildAnimeMarkup(anime) {
    return `<div class="anime_item"><img class='anime_image' src=${anime.image_url} />` +
        `<h2 class='anime_name'>${anime.title}</h2>` +
        `<p class='anime_description'>${anime.premiered}</p></div>`;
}

//update History with new result
function updateHistory(anime) {
    animes.push(anime);
    document.querySelector('#history').innerHTML = buildAnimeMarkup(anime) + document.querySelector('#history').innerHTML;
}

//loadAnAnime from the internet and place it on a target element
async function onOkButtonClickAsync() {
    let targetElementId = '#main_anime';
    let animeId = document.querySelector("#anime_id_input").value;
    let response = await fetch(API_ANIME + animeId);
    if (!response.ok) {
        return;
    }
    let anime = await response.json();
    console.log("anime", anime);
    document.querySelector(targetElementId).innerHTML = buildAnimeMarkup(anime);

    updateHistory(anime);
}