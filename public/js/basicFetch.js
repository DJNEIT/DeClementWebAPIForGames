fetch("/api/data")
.then(response => response.json())
.then(data => {
    console.log("recieved data: ", data)
    document.getElementById("player").textContent = data.player;
    document.getElementById("timeStamp").textContent = data.timeStamp;

    document.getElementById("games").innerHTML=
    data.games.map(games=>`<li>${games}</li>`).join("");
})
.catch(error => {
    console.log("Error Fecthing Data: ", error);
     
    });