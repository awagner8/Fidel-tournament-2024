// app.js

// Define your bracket matchups (replace with actual team names)
const matchups = [
    { id: 1, teamA: 'Team A', teamB: 'Team B' },
    // Add more matchups as needed
];

// Initialize winners object
const winners = {};

// Render the bracket
function renderBracket() {
    const bracketDiv = document.getElementById('bracket');
    bracketDiv.innerHTML = '';

    matchups.forEach(matchup => {
        const matchDiv = document.createElement('div');
        matchDiv.innerHTML = `
            <div>Matchup ${matchup.id}: 
                <button onclick="selectWinner(${matchup.id}, 'Team A')">${matchup.teamA}</button>
                <button onclick="selectWinner(${matchup.id}, 'Team B')">${matchup.teamB}</button>
            </div>
        `;
        bracketDiv.appendChild(matchDiv);
    });
}

// Handle winner selection
function selectWinner(matchId, winner) {
    winners[matchId] = winner;
    // Highlight the selected winner (you can add CSS styles here)
    console.log(`Match ${matchId} winner: ${winner}`);
}

// Submit bracket
function submitBracket() {
    const submissionName = document.getElementById('submissionName').value;
    // Send winners and submissionName to the server (AJAX request or fetch API)
    // Example: POST request to '/api/submit' with data { winners, submissionName }
    // ...
    console.log('Bracket submitted:', winners, submissionName);
}

// Call renderBracket to display the initial bracket
renderBracket();