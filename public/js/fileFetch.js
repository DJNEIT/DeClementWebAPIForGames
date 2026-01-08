fetch("/api/games")
.then(response => response.json())
.then(data => {
    console.log("recieved data: ", data)
    document.getElementById("studio").textContent = data.studio;
    document.getElementById("company").textContent = data.company;

    document.getElementById("games").innerHTML=
    data.games.map(games=>`<li>${games}</li>`).join("");
})
.catch(error => {
    console.log("Error Fecthing Data: ", error);
     
    });