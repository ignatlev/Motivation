document.addEventListener("DOMContentLoaded", function() {
    const getQuoteButton = document.getElementById("getQuote");
    const quoteDisplay = document.getElementById("quoteDisplay");
    const goalInput = document.getElementById("goalInput");
    const setGoalButton = document.getElementById("setGoal");
    const goalsList = document.getElementById("goalsList");
    const quoteGenreSelect = document.getElementById("quoteGenre");
    const predefinedLine = document.getElementById("predefinedLine");
 
    getQuoteButton.addEventListener("click", getMotivationalQuote);
    setGoalButton.addEventListener("click", setGoal);
 
    function getMotivationalQuote() {
        const selectedGenre = quoteGenreSelect.value;
        let apiUrl = "https://api.quotable.io/random";
 
        if (selectedGenre !== "random") {
            apiUrl = `https://api.quotable.io/random?tags=${selectedGenre}`;
        }
 
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                quoteDisplay.innerHTML = `"${data.content}" - ${data.author}`;
            })
            .catch(error => {
                console.error("An error occurred while getting a quote: " + error);
                quoteDisplay.innerHTML = "Unable to get a quote. Please try again.";
            });
    }
 
    function setGoal() {
        const goalText = goalInput.value.trim();
        if (goalText !== "") {
            const currentTime = new Date();
            const formattedDate = formatDate(currentTime);
            const goalItem = document.createElement("li");
            goalItem.textContent = `${goalText} (Created at: ${formattedDate})`;
            goalsList.appendChild(goalItem);
            goalInput.value = "";
            goalItem.addEventListener("click", markGoalAsCompleted);
        }
    }
 
    function markGoalAsCompleted(event) {
        const goalItem = event.target;
        goalItem.classList.toggle("completed");
        const currentTime = new Date();
        const formattedDate = formatDate(currentTime);
        if (goalItem.classList.contains("completed")) {
            goalItem.textContent += ` - Completed at: ${formattedDate}`;
        } else {
            goalItem.textContent = goalItem.textContent.replace(/ - Completed at:.*$/, '');
        }
    }
 
    function changePredefinedLine() {
        const words = ['studying ', 'revising ', 'working ', 'learning ', 'analysing ', 'reading ', 'writing ', 'reviewing ', 'schooling', 'going', 'dreaming'];
        const randomIndex = Math.floor(Math.random() * words.length);
        predefinedLine.textContent = `Keep calm and keep ${words[randomIndex]}`;
    }
 

    setInterval(changePredefinedLine, 5000);
    changePredefinedLine(); 
 
  
    const pressButton = document.getElementById("pressButton");
    if (pressButton) {
        pressButton.remove();
    }
 
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
 });
 