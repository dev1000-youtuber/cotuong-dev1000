/*******************************************************\
 *                                                     *
 *      GAME CỜ TƯỚNG engine developed by DEV 1000     *
 *                                                     *
\*******************************************************/

var Engine = function() {
    const VERSION = '1.0';

    const START_FEN = 'rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR r - - 0 1';

    // side to move
    const RED = 0;
    const BLACK = 1;

    // piece encoding
    const EMPTY = 0;
    const RED_PAWN = 1;
    const RED_ADVISOR = 2;
    const RED_ELEPHANT = 3;
    const RED_HORSE = 4;
    const RED_CANNON = 5;
    const RED_ROOK = 6;
    const RED_KING = 7;
    const BLACK_PAWN = 8;
    const BLACK_ADVISOR = 9;
    const BLACK_ELEPHANT = 10;
    const BLACK_HORSE = 11;
    const BLACK_CANNON = 12;
    const BLACK_ROOK = 13;
    const BLACK_KING = 14;
    const OFFBOARD = 15;

    // square encoding
    const a9 = 23, b9 = 24, c9 = 25, d9 = 26, e9 = 27, f9 = 28, g9 = 29, h9 = 30, i9 = 31;
    const a8 = 34, b8 = 35, c8 = 36, d8 = 37, e8 = 38, f8 = 39, g8 = 40, h8 = 41, i8 = 42;
    const a7 = 45, b7 = 46, c7 = 47, d7 = 48, e7 = 49, f7 = 50, g7 = 51, h7 = 52, i7 = 53;
    const a6 = 56, b6 = 57, c6 = 58, d6 = 59, e6 = 60, f6 = 61, g6 = 62, h6 = 63, i6 = 64;
    const a5 = 67, b5 = 68, c5 = 69, d5 = 70, e5 = 71, f5 = 72, g5 = 73, h5 = 74, i5 = 75;
    const a4 = 78, b4 = 79, c4 = 80, d4 = 81, e4 = 82, f4 = 83, g4 = 84, h4 = 85, i4 = 86;
    const a3 = 89, b3 = 90, c3 = 91, d3 = 92, e3 = 93, f3 = 94, g3 = 95, h3 = 96, i3 = 97;
    const a2 = 100, b2 = 101, c2 = 102, d2 = 103, e2 = 104, f2 = 105, g2 = 106, h2 = 107, i2 = 108;
    const a1 = 111, b1 = 112, c1 = 113, d1 = 114, e1 = 115, f1 = 116, g1 = 117, h1 = 118, i1 = 119;
    const a0 = 122, b0 = 123, c0 = 124, d0 = 125, e0 = 126, f0 = 127, g0 = 128, h0 = 129, i0 = 130;

    // coordinates encoding
    const COORDINATES = [
        'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx',
        'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx',
        'xx', 'a9', 'b9', 'c9', 'd9', 'e9', 'f9', 'g9', 'h9', 'i9', 'xx',
        'xx', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'i8', 'xx',
        'xx', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'i7', 'xx',
        'xx', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'i6', 'xx',
        'xx', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'i5', 'xx',
        'xx', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'i4', 'xx',
        'xx', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'i3', 'xx',
        'xx', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'i2', 'xx',
        'xx', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'i1', 'xx',
        'xx', 'a0', 'b0', 'c0', 'd0', 'e0', 'f0', 'g0', 'h0', 'i0', 'xx',
        'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx',
        'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx',
    ];


    /*
        P  A  E   H   C  R   K            p   a  e  h   c  r  k
        兵 仕  相  傌  炮  俥  帥           卒  士  象 馬  炮  車 將

        Board representation 11 x 14

        x x x x x x x x x x x
        x x x x x x x x x x x
        x r h e a k a e h r x
        x . . . . . . . . . x
        x . c . . . . c . . x
        x p . p . p . p . p x
        x . . . . . . . . . x
        x . . . . . . . . . x
        x P . P . P . P . P x
        x . C . . . . . C . x
        x . . . . . . . . . x
        x R H E A K A E H R x
        x x x x x x x x x x x
        x x x x x x x x x x x
    */

    // board array
    var board = new Array(11 * 14);

    // side to move
    var side = RED;

    // sixty moves draw rule
    var sixty = 0;

    // king position
    var kingSquare = [0, 0];

    // reset board array & game state
    function resetBoard() {
        // reset board position
        for (let rank = 0; rank < 14; rank++) {
            for (let file = 0; file < 11; file++) {
                let square = rank * 11 + file;

                if (COORDINATES[square] != 'xx') board[square] = EMPTY;
                else board[square] = OFFBOARD;
            }
        }

        // reset game state
        side = RED;
        sixty = 0;
        kingSquare = [0, 0];
    }

    // encode string to pieces
    const charPieces = {
        'P': RED_PAWN,
        'A': RED_ADVISOR,
        'E': RED_ELEPHANT,
        'H': RED_HORSE,
        'C': RED_CANNON,
        'R': RED_ROOK,
        'K': RED_KING,
        'p': BLACK_PAWN,
        'a': BLACK_ADVISOR,
        'e': BLACK_ELEPHANT,
        'h': BLACK_HORSE,
        'c': BLACK_CANNON,
        'r': BLACK_ROOK,
        'k': BLACK_KING
    }

    // string representation for pieces
    const asciiPieces = ['.', 'P', 'A', 'E', 'H', 'C', 'R', 'K', 'p', 'a', 'e', 'h', 'c', 'r', 'k'];

    function setBoard(fen) {
        resetBoard();
        let index = 0;

        // parse board position
        for (let rank = 0; rank < 14; rank++) {
            for (let file = 0; file < 11; file++) {
                let square = rank * 11 + file;

                if (COORDINATES[square] != 'xx') {
                    // parse pieces
                    if ((fen[index].charCodeAt() >= 'a'.charCodeAt() && fen[index].charCodeAt() <= 'z'.charCodeAt()) ||
                        (fen[index].charCodeAt() >= 'A'.charCodeAt() && fen[index].charCodeAt() <= 'Z'.charCodeAt())) {
                            if (fen[index] == 'K') kingSquare[RED] = square;
                            else if (fen[index] == 'k') kingSquare[BLACK] = square;

                            board[square] = charPieces[fen[index]];
                            index++;
                    }

                    // parse empty squares
                    if (fen[index].charCodeAt() >= '0'.charCodeAt() && fen[index].charCodeAt() <= '9'.charCodeAt()) {
                        let offset = fen[index] - '0';

                        if (board[square] == EMPTY) file--;
                        file += offset;
                        index++;
                    }

                    if (fen[index] == '/') index++;
                }
            }
        }

        // parse side to move
        index++;
        side = (fen[index] == 'r') ? RED : BLACK;
    }

    // print board to console
    function printBoard() {
        let boardString = '';

        // print board position
        for (let rank = 0; rank < 14; rank++) {
            for (let file = 0; file < 11; file++) {
                let square = rank * 11 + file;

                if (COORDINATES[square] != 'xx') {
                    if (file == 1) boardString += 11 - rank + '  ';
                    boardString += asciiPieces[board[square]] + ' ';
                };
            }

            if (rank < 13) boardString +=  '\n';
        }
        boardString += '   a b c d e f g h i\n\n';
        boardString += '                   side: ' + (side == RED ? 'r' : 'b') + '\n';
        boardString += '                   king squares: [' + COORDINATES[kingSquare[RED]] + ', ' + COORDINATES[kingSquare[BLACK]] + ']';
        console.log(boardString);
    }

    // init Game
    (function initAll() {
        console.log("Init all");
    }());


    // debug
    function debug() {
        setBoard(START_FEN);

        printBoard();
    }

    return {
        debug: function() {
            debug();
        }
    }
}