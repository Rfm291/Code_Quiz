function printHighscores() {
    // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // (optional) sort highscores by score property in descending order
  
    // for each score
    highscores.forEach(function(score) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;

      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}
  
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  // attache clear event to clear score button
  document.getElementById("clear").onclick = clearHighscores;
  // run printhighscore when page loads
  printHighscores();