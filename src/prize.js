import { dungeonBosses } from "./dungeons";

export const noPrize = {
  prizeName: "none",
  prizeIcon: "prize0.png",
  guessIcon: "prize0.png"
};

export const greenPendant = {
  prizeName: "greenPendant",
  prizeIcon: "green_pendant_r.gif",
  guessIcon: "prize1.png"
};

export const redBluePendant = {
  prizeName: "redBluePendant",
  prizeIcon: "red_blue_pendant.png",
  guessIcon: "prize2.png",
  altPrizeIcon: "one.png"
};

export const redPendant = {
  prizeName: "redBluePendant",
  prizeIcon: "red_p2.gif"
};

export const bluePendant = {
  prizeName: "redBluePendant",
  prizeIcon: "blue_p2.gif"
};

export const crystal = {
  prizeName: "crystal",
  prizeIcon: "c1.gif",
  altPrizeIcon: "one.png",

  guessIcon: "prize3.png"
};

export const crystal1 = {
  prizeName: "crystal",
  prizeIcon: "c1.gif",
  guessIcon: "prize3.png"
};
export const crystal2 = {
  prizeName: "crystal",
  prizeIcon: "c2.gif",
  guessIcon: "prize3.png"
};
export const crystal3 = {
  prizeName: "crystal",
  prizeIcon: "c3-2.gif",
  guessIcon: "prize3.png"
};
export const crystal4 = {
  prizeName: "crystal",
  prizeIcon: "c4.gif",
  guessIcon: "prize3.png"
};
export const crystal7 = {
  prizeName: "crystal",
  prizeIcon: "c7.gif",
  guessIcon: "prize3.png"
};

export const redCrystal = {
  prizeName: "redCrystal",
  prizeIcon: "red-crystal.png",
  guessIcon: "prize4.png"
};

export const redCrystal1 = {
  prizeName: "redCrystal",
  prizeIcon: "c5.gif",
  guessIcon: "prize4.png"
};

export const redCrystal2 = {
  prizeName: "redCrystal",
  prizeIcon: "c6.gif",
  guessIcon: "prize4.png"
};

const prizes = [
  greenPendant,
  bluePendant,
  redPendant,
  crystal1,
  crystal2,
  crystal3,
  crystal4,
  crystal7,
  redCrystal1,
  redCrystal2
];

// const dungeonMap = {
//   hera: undefined,
//   eastern: undefined,
//   desert: undefined,
//   pod: undefined,
//   swamp: undefined,
//   woods: undefined,
//   thievesTown: undefined,
//   ice: undefined,
//   mire: undefined,
//   turtleRock: undefined
// };

export const randomizePrizes = () => {
  const leftprizes = [...prizes];

  const prizeArray = dungeonBosses.map((boss) => {
    const index = getRandomInt(leftprizes.length);
    return leftprizes.splice(index, 1)[0];
  });

  return {
    hera: prizeArray[0],
    eastern: prizeArray[1],
    desert: prizeArray[2],
    pod: prizeArray[3],
    swamp: prizeArray[4],
    woods: prizeArray[5],
    thievesTown: prizeArray[6],
    ice: prizeArray[7],
    mire: prizeArray[8],
    turtleRock: prizeArray[9]
  };
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
