import {writable} from 'svelte/store';
import {save, load} from './storage.js';

const BOARD_KEY = 'currentBoard';
const EMPTY_KEY = 'currentEmpty';

const gameBoard = [
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [4, 8, 12, 0]
];
const empty = [3, 3];

function flatten(b) {
  const flat = [];
  let order = 1;
  let win = true;
  for (let y = 0; y < 4; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      const value = b[x][y];
      flat[value] = { label: value ? value.toString() : '', x, y};
      if ((order % 16) !== value) {
        win = false;
      }
      order += 1;
    }
  }
  isWinner.set(win);
  return flat;
}

const MAX_INT = 2147483647;

function rand() {
  const crypto = window.crypto || window.msCrypto;
  if (crypto) {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return (a[0] & MAX_INT) / MAX_INT;
  } else {
    return Math.random();
  }
}

function randomPosInt(maxInc) {
  return Math.floor(rand() * maxInc) + 1;
}

function randomBool() {
  return rand() >= 0.5;
}

function randomMove() {
  if (randomBool()) {
    // X
    const x = (empty[0] + randomPosInt(3)) % 4;
    const dx = empty[0] - x;
    return [dx, 0];
  } else {
    // Y
    const y = (empty[1] + randomPosInt(3)) % 4;
    const dy = empty[1] - y;
    return [0, dy];
  }
}

function update() {
  board.set(flatten(gameBoard));
  save(BOARD_KEY, gameBoard);
  save(EMPTY_KEY, empty);
}

function getMove(x, y) {
  const [ex, ey] = empty;
  if (y === ey) {
    return [ex - x, 0];
  } else if (x === ex) {
    return [0, ey - y];
  } else {
    return [0, 0];
  }
}

function range(start, end) {
  const res = [];
  if (start < end) {
    for (let xx = start; xx < end; xx += 1) {
      res.push(xx);
    }
  } else {
    for (let yy = start; yy > end; yy -= 1) {
      res.push(yy);
    }
  }
  return res;
}

function moveCell(dx, dy) {
  const x = empty[0] - dx;
  const y = empty[1] - dy;
  if (dx !== 0) {
    const drange = range(dx, 0);
    const offset = dx / Math.abs(dx);
    for (let ix = 0; ix < drange.length; ix += 1) {
      gameBoard[x + drange[ix]][y] = gameBoard[x + drange[ix] - offset][y];
    }
  } else if (dy !== 0) {
    const drange = range(dy, 0);
    const offset = dy / Math.abs(dy);
    for (let iy = 0; iy < drange.length; iy += 1) {
      gameBoard[x][y + drange[iy]] = gameBoard[x][y + drange[iy] - offset];
    }
  }
  gameBoard[x][y] = 0;
  empty[0] = x;
  empty[1] = y;
}

function shuffleBoard() {
  const moves = 80 + randomPosInt(40);
  for (let m = 0; m < moves; m += 1) {
    const [dx, dy] = randomMove();
    moveCell(dx, dy);
  }
}

function initialize() {
  const loaded = load(BOARD_KEY);
  if (loaded) {
    const loadEmpty = load(EMPTY_KEY);
    if (loadEmpty) {
      gameBoard[0] = loaded[0];
      gameBoard[1] = loaded[1];
      gameBoard[2] = loaded[2];
      gameBoard[3] = loaded[3];
      empty[0] = loadEmpty[0];
      empty[1] = loadEmpty[1];
    } else {
      shuffleBoard();
    }
  } else {
    shuffleBoard();
  }
}

export function randomize() {
  shuffleBoard();
  update();
}

export function clickCell(x, y) {
  const [dx, dy] = getMove(x, y);
  if (dx === 0 && dy === 0) {
    return;
  }
  moveCell(dx, dy);
  update();
}

initialize();
export const isWinner = writable(false);
export const board = writable(flatten(gameBoard));
