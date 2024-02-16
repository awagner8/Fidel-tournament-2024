import React, { useState } from 'react';
import './App.css';

function App() {
  /*class Team {
    static getWinnerIndex(){
      //TODO
    }

    constructor(teamIndex, winner) {
      this.index = teamIndex;
      this.winner = winner;
    }

    setIndex(index){
      this.index = index;
      teams[]
    }

    setWinner(){
      this.winner.setName(index);
    }
  }*/

  const [teams, setTeams] = useState(Array(4).fill('').map((_, index) => `Team ${String.fromCharCode(65 + index)}`));
  const [winners, setWinners] = useState(Array(2).fill(''));
  const [champion, setChampion] = useState('');

  const handleTeamClick = (index, team) => {
    return () => {
      const newTeams = [...teams];
      newTeams[index] = newTeams[index] !== team ? team : '';
      setTeams(newTeams);
    };
  };

  const handleWinnerClick = (index) => {
    return () => {
      if (teams[index * 2] && teams[index * 2 + 1]) {
        const winningTeam = Math.random() < 0.5 ? teams[index * 2] : teams[index * 2 + 1];
        const newWinners = [...winners];
        newWinners[index] = winningTeam;
        setWinners(newWinners);
      }
    };
  };

  const handleChampionClick = () => {
    if (winners[0] && winners[1]) {
      const winningTeam = Math.random() < 0.5 ? winners[0] : winners[1];
      setChampion(winningTeam);
    }
  };

  const resetBracket = () => {
    setTeams(Array(4).fill('').map((_, index) => `Team ${String.fromCharCode(65 + index)}`));
    setWinners(Array(2).fill(''));
    setChampion('');
  };

  return (
    <div className="App">
      <h1>Variable Team Bracket</h1>
      <div className="bracket">
        {Array(2).fill('').map((_, roundIndex) => (
          <div className="round" key={roundIndex}>
            <div className="match" onClick={handleTeamClick(roundIndex * 2, 'Team A')}>
              {teams[roundIndex * 2] || 'Team A'}
            </div>
            <div className="match" onClick={handleTeamClick(roundIndex * 2, 'Team B')}>
              {teams[roundIndex * 2 + 1] || 'Team B'}
            </div>
          </div>
        ))}
      </div>
      <div className="winners">
        {winners.map((winner, index) => (
          <div className="winner" key={index} onClick={handleWinnerClick(index)}>
            {winner ? `Winner: ${winner}` : 'Click to determine winner'}
          </div>
        ))}
      </div>
      <div className="champion" onClick={handleChampionClick}>
        {champion ? `Champion: ${champion}` : 'Click to determine champion'}
      </div>
      <button onClick={resetBracket}>Reset Bracket</button>
    </div>
  );
}

export default App;
