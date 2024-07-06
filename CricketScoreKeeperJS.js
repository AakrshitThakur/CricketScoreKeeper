const SeriesOfSelect = document.querySelector('#SeriesOfSelect');
const OversOfSelect = document.querySelector('#OversOfSelect');
const ScoreSelect = document.querySelector('#EventPerBall');
const RunsScoredH3 = document.querySelector('#RunsScored');
const MatchOversH3 = document.querySelector('#MatchOvers');
const OversBowledH3 = document.querySelector('#OversBowled');
const IsOutBtn = document.querySelector('#IsOut');
const IsNotOutBtn = document.querySelector('#IsNotOut');
const ResetScore = document.querySelector('#ResetScore');
const ResetEverything = document.querySelector('#ResetEverything');
const WhoIsPlaying = document.querySelector('#WhoIsPlayingH3');
const section = document.querySelector('section');
const AppendChildHere = document.querySelector('#AppendChildHere');
let SeriesOfValue = SeriesOfSelect.value;
let ScoreSelectValue = ScoreSelect.value;
let TeamAWins = 0, TeamBWins = 0;
let TotalMatchsPlayed = 0;
let CurrScore = 0;
let CurrOut = 0;
let OversBowled = [0, 0];
let SetTarget = 0;
let TeamA_Scored = 0;
let HasTeamA_Played = false;
const target = document.createElement('h5');
const TotalWins = document.createElement('h5');
target.classList.add("title", "is-5");
TotalWins.classList.add("title", "is-5");
const DisableElm = (ElmObj) => {
    ElmObj.disabled = true;
}
const EnableElm = (ElmObj) => {
    ElmObj.disabled = false;
}
const ResetCurrGame = (InningsOver) => {
    CurrScore = 0;
    CurrOut = 0;
    RunsScoredH3.innerHTML = `${CurrScore - CurrOut}`;
    OversBowled = [0, 0];
    OversBowledH3.innerHTML = `${OversBowled[0]} - ${OversBowled[1]}`
    if (!InningsOver) {
        EnableElm(OversOfSelect);
        section.removeChild(AppendChildHere);
    }
}
const InningsOver = () => {
    if (HasTeamA_Played) {
        TotalMatchsPlayed++;
        if (TeamA_Scored >= CurrScore) {
            if (CurrScore == (SetTarget - 1)) {
                target.innerHTML = `Match Tied(Press Reset Button To Play Again)`;
                section.appendChild(AppendChildHere);
                AppendChildHere.appendChild(target);
                AppendChildHere.appendChild(TotalWins);
                DisableElm(ScoreSelect);
                DisableElm(IsOutBtn);
                DisableElm(IsNotOutBtn);
            }
            else {
                target.innerHTML = `Woohoo!, Team A Won The Match By ${SetTarget - CurrScore} Runs(Press Reset Button To Play Again)`;
                TotalWins.innerHTML = `Total Wins Are: Team A Has ${++TeamAWins} Wins and Team B Has ${TeamBWins} Wins`;
                section.appendChild(AppendChildHere);
                AppendChildHere.appendChild(target);
                AppendChildHere.appendChild(TotalWins);
                DisableElm(ScoreSelect);
                DisableElm(IsOutBtn);
                DisableElm(IsNotOutBtn);
            }
        }
        else {
            target.innerHTML = `Woohoo!, Team B Won The Match By ${10 - CurrOut} Wickets(Press Reset Button To Play Again)`;
            TotalWins.innerHTML = `Total Wins Are: Team A Has ${TeamAWins} Wins and Team B Has ${++TeamBWins} Wins`;
            section.appendChild(AppendChildHere);
            AppendChildHere.appendChild(target);
            AppendChildHere.appendChild(TotalWins);
            DisableElm(ScoreSelect);
            DisableElm(IsOutBtn);
            DisableElm(IsNotOutBtn);
        }
        if (TotalMatchsPlayed == SeriesOfValue) {
            if (TeamAWins > TeamBWins) {
                section.appendChild(AppendChildHere);
                AppendChildHere.removeChild(target);
                AppendChildHere.removeChild(TotalWins);
                const SeriesWin = document.createElement('h3');
                SeriesWin.classList.add("title", "is-5");
                SeriesWin.innerHTML = `Team A Won the series by ${TeamAWins}: ${TeamBWins}(Press Reset Everything Button To Reset Everything)`;
                AppendChildHere.appendChild(SeriesWin);
            }
            else if (TeamAWins < TeamBWins) {
                section.appendChild(AppendChildHere);
                AppendChildHere.removeChild(target);
                AppendChildHere.removeChild(TotalWins);
                const SeriesWin = document.createElement('h3');
                SeriesWin.classList.add("title", "is-5");
                SeriesWin.innerHTML = `Team B Won the series by ${TeamBWins}: ${TeamAWins}(Press Reset Everything Button To Reset Everything)`;
                AppendChildHere.appendChild(SeriesWin);
            }
            else {
                section.appendChild(AppendChildHere);
                AppendChildHere.removeChild(target);
                AppendChildHere.removeChild(TotalWins);
                const SeriesWin = document.createElement('h3');
                SeriesWin.classList.add("title", "is-5");
                SeriesWin.innerHTML = `Team A Tied the series by ${TeamAWins}: ${TeamBWins}(Press Reset Everything Button To Reset Everything)`;
                AppendChildHere.appendChild(SeriesWin);
            }
            DisableElm(ResetScore);
        }
    }
    else {
        HasTeamA_Played = true;
        TeamA_Scored = CurrScore;
        SetTarget = CurrScore + 1;
        target.innerHTML = `Target For TeamB: ${SetTarget}`;
        section.appendChild(AppendChildHere);
        AppendChildHere.appendChild(target);
        AppendChildHere.appendChild(TotalWins);
        ResetCurrGame(true);
        WhoIsPlaying.innerHTML = 'TeamB is Playing';
    }
}
const OversBowledFunc = (OversBowled) => {
    OversBowled[1]++;
    if (OversBowled[1] == 6) {
        OversBowled[0]++;
        OversBowled[1] = 0;
    }
    OversBowledH3.innerHTML = `${OversBowled[0]}.${OversBowled[1]}`;
    if (CurrScore >= SetTarget && HasTeamA_Played) {
        InningsOver();
    }
    if (OversBowled[0] == parseInt(OversOfSelect.value)) {
        InningsOver();
    }
}

DisableElm(OversOfSelect);
DisableElm(ScoreSelect);
DisableElm(IsOutBtn);
DisableElm(IsNotOutBtn);
DisableElm(ResetScore);
DisableElm(ResetEverything);

SeriesOfSelect.addEventListener('click', () => {
    EnableElm(OversOfSelect);
    SeriesOfValue = parseInt(SeriesOfSelect.value);
});
OversOfSelect.addEventListener('click', () => {
    EnableElm(ScoreSelect);
    EnableElm(IsOutBtn);
    EnableElm(IsNotOutBtn);
    EnableElm(ResetScore);
    EnableElm(ResetEverything);
    DisableElm(SeriesOfSelect);
    MatchOversH3.innerHTML = OversOfSelect.value;
    WhoIsPlaying.innerHTML = 'TeamA Is Batting';
});

ScoreSelect.addEventListener('click', () => {
    DisableElm(OversOfSelect);
    ScoreSelectValue = parseInt(ScoreSelect.value);
});

IsOutBtn.addEventListener('click', () => {
    if (ScoreSelectValue == -2) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${++CurrOut}`;
        if (CurrScore >= SetTarget && HasTeamA_Played) {
            InningsOver();
        }
    }
    else if (ScoreSelectValue == -1) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${CurrOut}`;
        if (CurrScore >= SetTarget && HasTeamA_Played) {
            InningsOver();
        }
    }
    else if (ScoreSelectValue == 0) {
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 1) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 2) {
        CurrScore += 2;
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 3) {
        CurrScore += 3;
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 4) {
        CurrScore += 4;
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 5) {
        CurrScore += 5;
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 6) {
        CurrScore += 6;
        RunsScoredH3.innerHTML = `${CurrScore}-${++CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    if (CurrOut == 10) {
        InningsOver();
    }
});

IsNotOutBtn.addEventListener('click', () => {
    if (ScoreSelectValue == -2) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${CurrOut}`;
        if (CurrScore >= SetTarget && HasTeamA_Played) {
            InningsOver();
        }
    }
    else if (ScoreSelectValue == -1) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${CurrOut}`;
        if (CurrScore >= SetTarget && HasTeamA_Played) {
            InningsOver();
        }
    }
    else if (ScoreSelectValue == 0) {
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 1) {
        RunsScoredH3.innerHTML = `${++CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 2) {
        CurrScore += 2;
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 3) {
        CurrScore += 3;
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 4) {
        CurrScore += 4;
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 5) {
        CurrScore += 5;
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    else if (ScoreSelectValue == 6) {
        CurrScore += 6;
        RunsScoredH3.innerHTML = `${CurrScore}-${CurrOut}`;
        OversBowledFunc(OversBowled);
    }
    if (CurrOut == 10) {
        InningsOver();
    }
});
ResetScore.addEventListener('click', () => {
    ResetCurrGame(false);
    HasTeamA_Played = false;
    SetTarget = 0;
    TeamA_Scored = 0;
    DisableElm(ScoreSelect);
    DisableElm(IsOutBtn);
    DisableElm(IsNotOutBtn);
    DisableElm(ResetScore);
    DisableElm(ResetEverything);
});
ResetEverything.addEventListener('click', () => {
    ResetCurrGame(false);
    HasTeamA_Played = false;
    SetTarget = 0;
    TeamA_Scored = 0;
    TeamAWins = TeamBWins = TotalMatchsPlayed = 0;
    TotalWins.innerHTML = 'Total Wins Are: Team A Has 0 Wins and Team B Has 0 Wins';
    DisableElm(OversOfSelect);
    DisableElm(ScoreSelect);
    DisableElm(IsOutBtn);
    DisableElm(IsNotOutBtn);
    DisableElm(ResetScore);
    DisableElm(ResetEverything);
    EnableElm(SeriesOfSelect);
});