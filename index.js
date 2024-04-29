class Move {
  constructor(move, parentMove) {
    this.move = move;
    this.parentMove = parentMove;
  }
}

function possibleMoves(move) {
  const moves = [];
  const possibilities = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1],
  ];

  possibilities.forEach((value) => {
    const newMove = [move[0] + value[0], move[1] + value[1]];
    if (newMove[0] >= 0 && newMove[0] <= 7 
      && newMove[1] >= 0 && newMove[1] <= 7
    ) {
      moves.push(newMove);
    }
  });

  return moves;
}

function knightMoves(startMove, endMove) {
  if (startMove[0] < 0 || startMove[0] > 7 
    || startMove[1] < 0 || startMove[1] > 7
    || endMove[0] < 0 || endMove[0] > 7 
    || endMove[1] < 0 || endMove[1] > 7
  ) {
    throw new Error('Move(s) out of range');
  }

  const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const q = [];
  let i = 0;

  possibleMoves(startMove).forEach((move) => {
    matrix[move[0]][move[1]] = 1;
    q.push(new Move(move, new Move(startMove, null)));
  });

  const moves = [];
  while (q[i] !== undefined) {
    if (q[i].move[0] === endMove[0] && q[i].move[1] === endMove[1]) {
      moves.push(q[i].move);

      let parentPointer = q[i].parentMove;
      while (parentPointer !== null) {
        moves.push(parentPointer.move);

        parentPointer = parentPointer.parentMove;
      }

      return moves.reverse();
    }

    possibleMoves(q[i].move).forEach((move) => {
      if (matrix[move[0]][move[1]] === 0) {
        matrix[move[0]][move[1]] = 1;
        q.push(new Move(move, q[i]));
      }
    });

    i += 1;
  }

  return moves;
}

console.log(knightMoves([0, 0], [0, 0])); // [ [ 0, 0 ], [ 1, 2 ], [ 0, 0 ] ]
console.log(knightMoves([3, 3], [0, 0])); // [ [ 3, 3 ], [ 1, 2 ], [ 0, 0 ] ]
console.log(knightMoves([0, 0], [7, 7])); // [ [ 0, 0 ], [ 1, 2 ], [ 0, 4 ], [ 1, 6 ], [ 3, 5 ], [ 5, 6 ], [ 7, 7 ] ]
console.log(knightMoves([0, 0], [7, 0])); // [ [ 0, 0 ], [ 1, 2 ], [ 2, 0 ], [ 3, 2 ], [ 5, 1 ], [ 7, 0 ] ]
