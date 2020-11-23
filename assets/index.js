$(() => {
    $("form").submit((e) => {
        e.preventDefault();
        function escapeHtml(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
          }
        let author = escapeHtml($("#author").val());
        let music = escapeHtml($("#music").val());
        $.get(`https://api.lyrics.ovh/v1/${author}/${music}`, (data) => {
            let lyrics = data.lyrics;
            if(lyrics !== "") {
                $("#lyrics").html(`<p id='pres'><b>Voici les paroles de ${author} - ${music}</b></p><p id='plyrics'>${lyrics}</p>`);
            }
            else {
                $("#lyrics").html("<p id='plyrics'>La chanson n'est pas présente dans la base de donnée :(</p>");
            }
        });
    });
});
