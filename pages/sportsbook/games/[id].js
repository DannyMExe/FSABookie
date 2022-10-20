import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BetSlip from "../../../src/components/sports-components/betslipComponents/BetSlip";
import { addToBetSlip } from "../../../src/redux/slices/BetSlip-slice";
import {
  selectFirstHalf,
  selectFullGame,
  selectPeriod,
  selectQuarter,
} from "../../../src/redux/slices/game-slice";
import {
  NBAlogos,
  NFLlogos,
  MLBlogos,
  NHLlogos,
} from "../../../public/teamLogos";

const SingleGameContainer = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  padding: 4%;
  .eventSport {
    text-align: center;
    font-weight: 200;
    font-size: 0.75em;
    margin-top: 15%;
    padding-bottom: 3%;
    border-bottom: 0.15em solid #242424;
    opacity: 0.8;
  }

  .MatchupContainer {
    display: flex;
    flex-direction: row;
    gap: 5%;
    margin-top: 7%;
  }

  .team1 {
    text-align: center;
    font-weight: 200;
  }

  .team2 {
    margin-right: 5%;
    text-align: center;
    font-weight: 200;
  }

  .AT {
    background: #242424;
    padding: 2%;
    font-size: 0.8em;
    height: 5%;
    font-weight: 800;
  }
  .headimg {
    width: 50px;
    height: 50px;
  }

  .gamecard {
    margin-top: 4%;
  }
`;
const GameCard = styled.div`
  color: white;
  border-top: 0.1em solid #242424;
  padding-bottom: 0.5em;
  padding-top: 0.5em;

  .eventCellLink {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 10px;
    text-decoration: none;
  }
  .gametitle {
    display: flex;
    align-items: center;
    text-align: unset;
  }
  .eventCell {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 10px;
    text-decoration: none;
  }

  .team1 {
    font-size: 0.9em;
    color: white;
    margin-left: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100px;
    min-width: 100px;
  }
  .gameTime {
    font-size: 0.1em;
  }

  .teamInfo {
    margin-top: 0.5em;
    display: flex;
    overflow: hidden;
  }
  .imgContainer {
    img {
      height: 18px;
    }
  }

  .line {
    color: white;
  }

  .lineodds {
    color: #00aa38;
  }

  .lineContainer {
    display: flex;
    padding: 2%;
    margin: 1px;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 0.5em;
    background-color: #242424;
    height: 48px;
    color: white;
  }
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  .gameInfo {
    /* border-top: 0.25em solid #242424; */
    /* padding-top: 4%; */
    /* flex-grow: 2; */
    width: 150%;
  }
  .game2Info {
    /* padding-top: 4%; */
    /* flex-grow: 2; */
    width: 150%;
  }
  .lineCol {
    /* border-top: 0.25em solid #242424; */
    /* padding-top: 6%; */
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
    /* flex-grow: 1; */
  }

  .line2Col {
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
  }
`;

const SportsHeader = styled.div`
  margin-top: 18%;
  height: 100%;
  color: white;
  background: black;
  position: relative;
  display: flex;
  gap: 1%;
  div {
    position: relative;
    text-decoration: none;
    box-sizing: border-box;
    padding: 2% 4.25%;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #ababab;
    background-color: #000;
    white-space: nowrap;
    font-size: 0.625em;
    line-height: 14px;
    font-weight: 600;
    font-family: "Saira Condensed", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.16s ease;
  }
`;

// async function getServerSideProps(context) {
//   return {
//     props: {
//       sport: context.sport,
//     },
//   };
// }

function GamePage() {
  const [d, setDate] = useState();
  const [t, setT] = useState();
  const [time, setTime] = useState();
  const {
    game,
    odds: odd,
    sport,
    awayTeamLogo,
    homeTeamLogo,
  } = useSelector((state) => state.persistedGame);
  const { betSlip } = useSelector((state) => state.betSlip);

  const dispatch = useDispatch();

  useEffect(() => {
    if (game) {
      setDate(new Date(game.MatchTime).toDateString());
      setT(
        new Date(game.MatchTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setTime(d + " " + t);
      console.log(odd);
    }
  }, [game]);

  return game && odd ? (
    <>
      <SingleGameContainer>
        <div className="GameHeader">
          <div className="eventSport">{sport}</div>
          <div className="MatchupContainer">
            <div className="team1">
              {game.AwayTeam}
              <img src={awayTeamLogo} />
            </div>
            <div className="AT">AT</div>
            <div className="team2">
              {game.HomeTeam}
              <img src={homeTeamLogo} />
            </div>
          </div>
        </div>

        <div>
          <SportsHeader>
            <div onClick={() => dispatch(selectFullGame())}>GAME LINES</div>

            {sport === "NBA" && (
              <div onClick={() => dispatch(selectFirstHalf())}>HALF</div>
            )}
            {sport === "NFL" && (
              <div onClick={() => dispatch(selectFirstHalf())}>HALF</div>
            )}

            {sport === "MLB" && (
              <div onClick={() => dispatch(selectFirstHalf())}>First 5 Inn</div>
            )}
            {sport === "NHL" && (
              <div onClick={() => dispatch(selectPeriod())}>PERIOD</div>
            )}

            {sport === "NBA" && (
              <div onClick={() => dispatch(selectQuarter())}>QUARTER</div>
            )}
            {sport === "NFL" && (
              <div onClick={() => dispatch(selectQuarter())}>QUARTER</div>
            )}
          </SportsHeader>
        </div>

        <div className="gamecard">
          {odd.map((odd) => (
            <GameCard key={odd.ID}>
              <TableRow>
                {/* AWAY TEAM SPREAD!!!!!!!!!!! */}
                <div className="lineCol">
                  {odd.PointSpreadAway == 0 || odd.PointSpreadAway == 0.0 ? (
                    <div className="lineContainer">N/A</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: game.AwayTeam + " " + odd.PointSpreadAway,
                            odds: odd.PointSpreadAwayLine,
                            teamToWin: "AwayTeam",
                            oddType: odd.OddType,
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            time: time,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "spread",
                            spread: Number(odd.PointSpreadAway),
                            calc:
                              odd.PointSpreadAway[0] === "-" ? "minus" : "plus",
                          })
                        );
                      }}
                    >
                      <div className="line">
                        {odd.PointSpreadAway[0] === "-"
                          ? odd.PointSpreadAway
                          : "+" + odd.PointSpreadAway}
                      </div>
                      <div className="lineodds">
                        {odd.PointSpreadAwayLine[0] === "-"
                          ? odd.PointSpreadAwayLine
                          : "+" + odd.PointSpreadAwayLine}
                      </div>
                    </div>
                  )}
                </div>
                {/* OVER!!!!!!!!!!! */}
                <div className="lineCol">
                  {odd.PointSpreadAway == 0 || odd.PointSpreadAway == 0.0 ? (
                    <div className="lineContainer">N/A</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: "Over " + odd.TotalNumber,
                            odds: odd.OverLine,
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            oddType: odd.OddType,
                            time,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "total",
                          })
                        );
                      }}
                    >
                      <div className="line">O {odd.TotalNumber}</div>
                      <div className="lineodds">
                        {odd.OverLine[0] === "-"
                          ? odd.OverLine
                          : "+" + odd.OverLine}
                      </div>
                    </div>
                  )}
                </div>
                {/* AWAY TEAM!!!!!!!!!!! */}
                <div className="lineCol">
                  {odd.MoneyLineAway == 0 || odd.PointSpreadAway == 0.0 ? (
                    <div className="lineContainer">N/A</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: game.AwayTeam + " ML",
                            odds: odd.MoneyLineAway,
                            teamToWin: "AwayTeam",
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            oddType: odd.OddType,
                            time,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "ML",
                          })
                        );
                      }}
                    >
                      <div className="lineodds">
                        {" "}
                        {odd.MoneyLineAway[0] === "-"
                          ? odd.MoneyLineAway
                          : "+" + odd.MoneyLineAway}
                      </div>
                    </div>
                  )}
                </div>
              </TableRow>
              <TableRow>
                {/* HOME TEAM SPREAD!!!!!!!!!!! */}
                <div className="line2Col">
                  {odd.PointSpreadAway == 0 || odd.PointSpreadAway == 0.0 ? (
                    <div className="lineContainer">NA</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: game.HomeTeam + " " + odd.PointSpreadHome,
                            odds: odd.PointSpreadHomeLine,
                            teamToWin: "HomeTeam",
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            time,
                            oddType: odd.OddType,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "spread",
                            spread: Number(odd.PointSpreadHome),
                            calc:
                              odd.PointSpreadHome[0] === "-" ? "minus" : "plus",
                          })
                        );
                      }}
                    >
                      <div className="line">
                        {odd.PointSpreadHome[0] === "-"
                          ? odd.PointSpreadHome
                          : "+" + odd.PointSpreadHome}
                      </div>
                      <div className="lineodds">
                        {odd.PointSpreadHomeLine[0] === "-"
                          ? odd.PointSpreadHomeLine
                          : "+" + odd.PointSpreadHomeLine}
                      </div>
                    </div>
                  )}
                </div>
                {/* UNDER!!!!!!!!!!! */}
                <div className="line2Col">
                  {odd.PointSpreadAway == 0 || odd.PointSpreadAway == 0.0 ? (
                    <div className="lineContainer">N/A</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: "Under " + odd.TotalNumber,
                            odds: odd.UnderLine,
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            oddType: odd.OddType,
                            time,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "total",
                          })
                        );
                      }}
                    >
                      <div className="line">U {odd.TotalNumber}</div>
                      <div className="lineodds">
                        {odd.UnderLine[0] === "-"
                          ? odd.UnderLine
                          : "+" + odd.UnderLine}
                      </div>
                    </div>
                  )}
                </div>
                {/* HOME TEAM ML!!!!!!!!!!! */}
                <div className="line2Col">
                  {odd.MoneyLineHome == "0" || odd.MoneyLineHome == 0.0 ? (
                    <div className="lineContainer">N/A</div>
                  ) : (
                    <div
                      className="lineContainer"
                      onClick={() => {
                        dispatch(
                          addToBetSlip({
                            id: betSlip.length,
                            gameLine: game.HomeTeam + " ML",
                            odds: odd.MoneyLineHome,
                            team: game.HomeTeam,
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            teamToWin: "HomeTeam",
                            oddType: odd.OddType,
                            time,
                            toWin: 0,
                            wager: 0,
                            betId: odd.ID,
                            betType: "ML",
                          })
                        );
                      }}
                    >
                      <div className="lineodds">
                        {odd.MoneyLineHome[0] === "-"
                          ? odd.MoneyLineHome
                          : "+" + odd.MoneyLineHome}
                      </div>
                    </div>
                  )}
                </div>
              </TableRow>
            </GameCard>
          ))}
        </div>
      </SingleGameContainer>
      {betSlip.length > 0 && <BetSlip />}
    </>
  ) : (
    <div> No Lines Available</div>
  );
}

export default GamePage;
