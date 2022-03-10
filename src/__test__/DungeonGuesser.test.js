import { getWrongGuesses } from "../DungeonGuesser";

describe("DungeonGuesser", () => {
  it("should return an empty array if no wrong guesses", () => {
    const answer = {
      hera: {
        prizeName: "redCrystal",
        prizeIcon: "c5.gif",
        guessIcon: "prize4.png",
      },
      eastern: {
        prizeName: "crystal",
        prizeIcon: "c4.gif",
        guessIcon: "prize3.png",
      },
      desert: {
        prizeName: "crystal",
        prizeIcon: "c7.gif",
        guessIcon: "prize3.png",
      },
      pod: {
        prizeName: "greenPendant",
        prizeIcon: "green_pendant_r.gif",
        guessIcon: "prize1.png",
      },
      swamp: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        guessIcon: "prize3.png",
      },
      woods: {
        prizeName: "crystal",
        prizeIcon: "c3-2.gif",
        guessIcon: "prize3.png",
      },
      thievesTown: {
        prizeName: "redBluePendant",
        prizeIcon: "red_p2.gif",
      },
      ice: {
        prizeName: "redBluePendant",
        prizeIcon: "blue_p2.gif",
      },
      mire: {
        prizeName: "redCrystal",
        prizeIcon: "c6.gif",
        guessIcon: "prize4.png",
      },
      turtleRock: {
        prizeName: "crystal",
        prizeIcon: "c2.gif",
        guessIcon: "prize3.png",
      },
    };
    const guess = {
      eastern: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        altPrizeIcon: "one.png",
        guessIcon: "prize3.png",
      },
      desert: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        altPrizeIcon: "one.png",
        guessIcon: "prize3.png",
      },
      hera: {
        prizeName: "redCrystal",
        prizeIcon: "red-crystal.png",
        guessIcon: "prize4.png",
      },
      pod: {
        prizeName: "greenPendant",
        prizeIcon: "green_pendant_r.gif",
        guessIcon: "prize1.png",
      },
      swamp: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        guessIcon: "prize3.png",
      },
      woods: {
        prizeName: "crystal",
        prizeIcon: "c3-2.gif",
        guessIcon: "prize3.png",
      },
      thievesTown: {
        prizeName: "redBluePendant",
        prizeIcon: "red_p2.gif",
      },
      ice: {
        prizeName: "redBluePendant",
        prizeIcon: "blue_p2.gif",
      },
      mire: {
        prizeName: "redCrystal",
        prizeIcon: "c6.gif",
        guessIcon: "prize4.png",
      },
      turtleRock: {
        prizeName: "crystal",
        prizeIcon: "c2.gif",
        guessIcon: "prize3.png",
      },
    };
    expect(getWrongGuesses(answer, guess)).toStrictEqual({});
  });

  it("should return an empty array if no wrong guesses", () => {
    const answer = {
      hera: {
        prizeName: "redCrystal",
        prizeIcon: "c5.gif",
        guessIcon: "prize4.png",
      },
      eastern: {
        prizeName: "crystal",
        prizeIcon: "c4.gif",
        guessIcon: "prize3.png",
      },
      desert: {
        prizeName: "crystal",
        prizeIcon: "c7.gif",
        guessIcon: "prize3.png",
      },
      pod: {
        prizeName: "greenPendant",
        prizeIcon: "green_pendant_r.gif",
        guessIcon: "prize1.png",
      },
      swamp: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        guessIcon: "prize3.png",
      },
      woods: {
        prizeName: "crystal",
        prizeIcon: "c3-2.gif",
        guessIcon: "prize3.png",
      },
      thievesTown: {
        prizeName: "redBluePendant",
        prizeIcon: "red_p2.gif",
      },
      ice: {
        prizeName: "redBluePendant",
        prizeIcon: "blue_p2.gif",
      },
      mire: {
        prizeName: "redCrystal",
        prizeIcon: "c6.gif",
        guessIcon: "prize4.png",
      },
      turtleRock: {
        prizeName: "crystal",
        prizeIcon: "c2.gif",
        guessIcon: "prize3.png",
      },
    };
    const guess = {
      eastern: {
        prizeName: "none",
        prizeIcon: "c1.gif",
        altPrizeIcon: "one.png",
        guessIcon: "prize3.png",
      },
      desert: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        altPrizeIcon: "one.png",
        guessIcon: "prize3.png",
      },
      hera: {
        prizeName: "redCrystal",
        prizeIcon: "red-crystal.png",
        guessIcon: "prize4.png",
      },
      pod: {
        prizeName: "greenPendant",
        prizeIcon: "green_pendant_r.gif",
        guessIcon: "prize1.png",
      },
      swamp: {
        prizeName: "crystal",
        prizeIcon: "c1.gif",
        guessIcon: "prize3.png",
      },
      woods: {
        prizeName: "crystal",
        prizeIcon: "c3-2.gif",
        guessIcon: "prize3.png",
      },
      thievesTown: {
        prizeName: "redBluePendant",
        prizeIcon: "red_p2.gif",
      },
      ice: {
        prizeName: "redBluePendant",
        prizeIcon: "blue_p2.gif",
      },
      mire: {
        prizeName: "redCrystal",
        prizeIcon: "c6.gif",
        guessIcon: "prize4.png",
      },
      turtleRock: {
        prizeName: "crystal",
        prizeIcon: "c2.gif",
        guessIcon: "prize3.png",
      },
    };
    expect(getWrongGuesses(answer, guess)).toStrictEqual({
      eastern: {
        prizeName: "crystal",
        prizeIcon: "c4.gif",
        guessIcon: "prize3.png",
      },
    });
  });
});
