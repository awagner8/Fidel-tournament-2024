// app.js

// Define your bracket matchups (replace with actual team names)
const matchups = [
    { id: 1, teamA: 'Team A', teamB: 'Team B' },
    { id: 2, teamA: 'Team A', teamB: 'Team B' },
    { id: 3, teamA: 'Team A', teamB: 'Team B' },
    { id: 4, teamA: 'Team A', teamB: 'Team B' },
    { id: 5, teamA: 'Team A', teamB: 'Team B' },
    { id: 6, teamA: 'Team A', teamB: 'Team B' },
    { id: 7, teamA: 'Team A', teamB: 'Team B' },
    { id: 8, teamA: 'Team A', teamB: 'Team B' },
    { id: 9, teamA: 'Team A', teamB: 'Team B' },
    { id: 10, teamA: 'Team A', teamB: 'Team B' },
    { id: 11, teamA: 'Team A', teamB: 'Team B' },
    { id: 12, teamA: 'Team A', teamB: 'Team B' },
    { id: 13, teamA: 'Team A', teamB: 'Team B' },
    { id: 14, teamA: 'Team A', teamB: 'Team B' },
    { id: 15, teamA: 'Team A', teamB: 'Team B' },
    { id: 16, teamA: 'Team A', teamB: 'Team B' },
    { id: 17, teamA: 'Team A', teamB: 'Team B' },
    { id: 18, teamA: 'Team A', teamB: 'Team B' },
    { id: 19, teamA: 'Team A', teamB: 'Team B' },
    { id: 20, teamA: 'Team A', teamB: 'Team B' },
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