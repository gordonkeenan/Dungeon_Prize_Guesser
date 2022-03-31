export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const maybePluralize = (count, noun, suffix = 's') =>
  `${noun}${count !== 1 ? suffix : ''}`;