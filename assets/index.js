const form = document.querySelector("form");
const author = document.getElementById("author");
const music = document.getElementById("music");
const divLyrics = document.getElementById("lyrics");
const paragrapheLyrics = document.createElement("p");
paragrapheLyrics.setAttribute("id","plyrics");

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
  }
  
form.addEventListener("submit", (e) => {
    e.preventDefault();
    author.value = escapeHtml(author.value);
    music.value = escapeHtml(music.value);
    axios.get(`https://api.lyrics.ovh/v1/${author.value}/${music.value}`)
    .then((response) => {
        if(response.data.lyrics !== "") {
            console.log(response.data.lyrics);
            paragrapheLyrics.innerHTML = `<b>Voici les paroles de ${author.value} - ${music.value}</b><br><br>${response.data.lyrics}`;
            divLyrics.append(paragrapheLyrics);
        }
        else {
            paragrapheLyrics.innerHTML = "La chanson n'est pas présente dans la base de donnée :(";
            divLyrics.append(paragrapheLyrics);
        }
    })
    .catch((error) => {
        // :)
    })
})
