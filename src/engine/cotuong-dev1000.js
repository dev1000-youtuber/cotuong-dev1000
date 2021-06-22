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
    const NO_COLOR = 2;

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

    // piece types
    const PAWN = 16;
    const ADVISOR = 17;
    const ELEPHANT = 18;
    const HORSE = 19;
    const CANNON = 20;
    const ROOK = 21;
    const KING = 22;

    // map types to piece
    const PIECE_TYPE = [
        0,
        PAWN, ADVISOR, ELEPHANT, HORSE, CANNON, ROOK, KING,
        PAWN, ADVISOR, ELEPHANT, HORSE, CANNON, ROOK, KING
    ]

    // map color to piece
    const PIECE_COLOR = [
        NO_COLOR,
        RED, RED, RED, RED, RED, RED, RED,
        BLACK, BLACK, BLACK, BLACK, BLACK, BLACK, BLACK
    ]


    // square encoding
    const A9 = 23, B9 = 24, C9 = 25, D9 = 26, E9 = 27, F9 = 28, G9 = 29, H9 = 30, I9 = 31;
    const A8 = 34, B8 = 35, C8 = 36, D8 = 37, E8 = 38, F8 = 39, G8 = 40, H8 = 41, I8 = 42;
    const A7 = 45, B7 = 46, C7 = 47, D7 = 48, E7 = 49, F7 = 50, G7 = 51, H7 = 52, I7 = 53;
    const A6 = 56, B6 = 57, C6 = 58, D6 = 59, E6 = 60, F6 = 61, G6 = 62, H6 = 63, I6 = 64;
    const A5 = 67, B5 = 68, C5 = 69, D5 = 70, E5 = 71, F5 = 72, G5 = 73, H5 = 74, I5 = 75;
    const A4 = 78, B4 = 79, C4 = 80, D4 = 81, E4 = 82, F4 = 83, G4 = 84, H4 = 85, I4 = 86;
    const A3 = 89, B3 = 90, C3 = 91, D3 = 92, E3 = 93, F3 = 94, G3 = 95, H3 = 96, I3 = 97;
    const A2 = 100, B2 = 101, C2 = 102, D2 = 103, E2 = 104, F2 = 105, G2 = 106, H2 = 107, I2 = 108;
    const A1 = 111, B1 = 112, C1 = 113, D1 = 114, E1 = 115, F1 = 116, G1 = 117, H1 = 118, I1 = 119;
    const A0 = 122, B0 = 123, C0 = 124, D0 = 125, E0 = 126, F0 = 127, G0 = 128, H0 = 129, I0 = 130;

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
        x . c . . . . . c . x
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

    // move stack - store moves for entire game
    var moveStack = [];

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
        moveStack = [];
    }

    // encode string to pieces
    const CHAR_TO_PIECE = {
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
    const PIECE_TO_CHAR = ['.', 'P', 'A', 'E', 'H', 'C', 'R', 'K', 'p', 'a', 'e', 'h', 'c', 'r', 'k'];

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

                            board[square] = CHAR_TO_PIECE[fen[index]];
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
                    boardString += PIECE_TO_CHAR[board[square]] + ' ';
                }
            }

            if (rank < 13) boardString +=  '\n';
        }
        boardString += '   a b c d e f g h i\n\n';
        boardString += '                   side: ' + (side == RED ? 'r' : 'b') + '\n';
        boardString += '                   king squares: [' + COORDINATES[kingSquare[RED]] + ', ' + COORDINATES[kingSquare[BLACK]] + ']';
        console.log(boardString);
    }

    // print moves
    function printMoveList(moveList) {
        let listMoves = '   Move  Piece  Captured  Flag  Score\n\n';

        for (let index = 0; index < moveList.length; index++) {
            let move = moveList[index].move;

            listMoves += '   ' + COORDINATES[getSourceSquare(move)] + COORDINATES[getTargetSquare(move)] +
                         '     ' + PIECE_TO_CHAR[getSourcePiece(move)] +
                         '       ' + PIECE_TO_CHAR[getTargetPiece(move)] +
                         '      ' + getCaptureFlag(move) +
                         '      ' + moveList[index].score + '\n';
        }

        listMoves += '\n   Total moves: ' + moveList.length;
        console.log(listMoves);
    }

    /*******************************************************\
     *                                                     *
     *                     ATTACKS SECTION                 *
     *                                                     *
    \*******************************************************/

    // directions
    const UP = -11;
    const DOWN = +11;
    const LEFT = -1;
    const RIGHT = +1;

    // piece move offsets
    const ORTHOGONALS = [LEFT, RIGHT, UP, DOWN];
    const DIAGONALS = [UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT];

    // offsets to get attacks by pawns
    const PAWN_ATTACK_OFFSETS = [
        [DOWN, LEFT, RIGHT],
        [UP, LEFT, RIGHT]
    ]

    // offsets to get attacks by horses
    const HORSE_ATTACK_OFFSETS = [
        [UP + UP + LEFT, LEFT + LEFT + UP],
        [UP + UP + RIGHT, RIGHT + RIGHT + UP],
        [DOWN + DOWN + LEFT, LEFT + LEFT + DOWN],
        [DOWN + DOWN + RIGHT, RIGHT + RIGHT + DOWN]
    ]

    // offsets to get target squares for pawns
    const PAWN_MOVE_OFFSETS = [
        [UP, LEFT, RIGHT],
        [DOWN, LEFT, RIGHT]
    ]

    // offsets to get target squares for horses
    const HORSE_MOVE_OFFSETS = [
        [LEFT + LEFT + UP, LEFT + LEFT + DOWN],
        [RIGHT + RIGHT + UP, RIGHT + RIGHT + DOWN],
        [UP + UP + LEFT, UP + UP + RIGHT],
        [DOWN + DOWN + LEFT, DOWN + DOWN + RIGHT]
    ]

    // offsets to get target squares for elephants
    const ELEPHANT_MOVE_OFFSETS = [(UP + LEFT) * 2, (UP + RIGHT) * 2, (DOWN + LEFT) * 2, (DOWN + RIGHT) * 2];

    // is square attacked by a given side
    function isSquareAttacked(square, color) {
        //by pawns
        for (let direction = 0; direction < PAWN_ATTACK_OFFSETS[color].length; direction++) {
            let directionTarget = square + PAWN_ATTACK_OFFSETS[color][direction];

            if (board[directionTarget] == ((color == RED) ? RED_PAWN : BLACK_PAWN)) return true;
        }

        // by horses
        for (let direction = 0; direction < DIAGONALS.length; direction++) {
            let directionTarget= square + DIAGONALS[direction];

            if (board[directionTarget] == EMPTY) {
                for (let offset = 0; offset < 2; offset++) {
                    let horseTarget = square + HORSE_ATTACK_OFFSETS[direction][offset];

                    if (board[horseTarget] == ((color == RED) ? RED_HORSE : BLACK_HORSE)) return true;
                }
            }
        }

        // by king, rooks and cannons
        for (let direction = 0; direction < ORTHOGONALS.length; direction++) {
            let directionTarget = square + ORTHOGONALS[direction];
            let jumpOver = 0;

            while (board[directionTarget] != OFFBOARD) {
                if (jumpOver == 0) {
                    if (board[directionTarget] == ((color == RED) ? RED_ROOK : BLACK_ROOK) ||
                        board[directionTarget] == ((color == RED) ? RED_KING : BLACK_KING))
                        return true;
                }

                if (board[directionTarget] != EMPTY) jumpOver++;
                if (jumpOver == 2 && board[directionTarget] == ((color == RED) ? RED_CANNON : BLACK_CANNON)) return true;

                directionTarget += ORTHOGONALS[direction];
            }
        }

        return false;
    }

    // print attacks to console
    function printAttacks(color) {
        let boardString = '';

        // print board position
        for (let rank = 0; rank < 14; rank++) {
            for (let file = 0; file < 11; file++) {
                let square = rank * 11 + file;

                if (COORDINATES[square] != 'xx') {
                    if (file == 1) boardString += 11 - rank + '  ';
                    boardString += isSquareAttacked(square, color) ? 'x ' : '. ';
                }
            }

            if (rank < 13) boardString +=  '\n';
        }
        boardString += '   a b c d e f g h i\n\n';
        console.log(boardString);
    }

    /*******************************************************\
     *                                                     *
     *                     MOVE GENERATOR SECTION          *
     *                                                     *
    \*******************************************************/

    // zone of board
    const BOARD_ZONES = [
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
    ]

    /*
                            MOVE ENCODING
        0000 0000 0000 0000 0000 1111 1111   sourceSquare    0xFF
        0000 0000 0000 1111 1111 0000 0000   targetSquare    0xFF00
        0000 0000 1111 0000 0000 0000 0000   sourcePiece     0xFF0000
        0000 1111 0000 0000 0000 0000 0000   targetPiece     0xFF00000
        0001 0000 0000 0000 0000 0000 0000   captureFlag     0x1000000

        EX: 0001 1111 1111 1111 1111 1000 0010
        &
            0000 0000 0000 0000 0000 1111 1111
        =>  0000 0000 0000 0000 0000 1000 0010

        0001 1111 1111 1111 1111 1000 0010 >> 8
        = 0001 1111 1111 1000 0000
        & 0000 0000 0000 1111 1111
        =>0000 0000 0000 1000 0000
    */

    // store squares & pieces into a single number
    function encodeMove(sourceSquare, targetSquare, sourcePiece, targetPiece, captureFlag) {
        return (sourceSquare) |
                (targetSquare << 8) |
                (sourcePiece << 16) |
                (targetPiece << 20) |
                (captureFlag << 24);
    }

    function getSourceSquare(move) { return move & 0xFF }
    function getTargetSquare(move) { return (move >> 8) & 0xFF }
    function getSourcePiece(move) { return (move >> 16) & 0xF }
    function getTargetPiece(move) { return (move >> 20) & 0xF }
    function getCaptureFlag(move) { return (move >> 24) & 0x1 }


    // push move into move list
    function pushMove(moveList, sourceSquare, targetSquare, sourcePiece, targetPiece) {
        if (targetPiece == EMPTY || PIECE_COLOR[targetPiece] == side ^ 1) {
            let move = 0;

            if (targetPiece) move = encodeMove(sourceSquare, targetSquare, sourcePiece, targetPiece, 1);
            else move = encodeMove(sourceSquare, targetSquare, sourcePiece, targetPiece, 0);

            let moveScore = 0;

            moveList.push({
                move: move,
                score: moveScore
            });
        }
    }

    // generate legal moves
    function generateMoves() {
        let moveList = [];

        for (let sourceSquare = 0; sourceSquare < board.length; sourceSquare++) {
            if (board[sourceSquare] != OFFBOARD) {
                let piece = board[sourceSquare];
                let pieceType = PIECE_TYPE[piece];
                let pieceColor = PIECE_COLOR[piece];

                if (pieceColor == side) {
                    // pawns
                    if (pieceType == PAWN) {
                        for (let direction = 0; direction < PAWN_MOVE_OFFSETS[side].length; direction++) {
                            let targetSquare = sourceSquare + PAWN_MOVE_OFFSETS[side][direction];
                            let targetPiece = board[targetSquare];

                            if (targetPiece != OFFBOARD) pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);
                            if (BOARD_ZONES[side][sourceSquare]) break;
                        }
                    }

                    // king & advisors
                    if (pieceType == KING || pieceType == ADVISOR) {
                        for (let direction = 0; direction < ORTHOGONALS.length; direction++) {
                            let offsets = (pieceType == KING) ? ORTHOGONALS : DIAGONALS;
                            let targetSquare = sourceSquare + offsets[direction];
                            let targetPiece = board[targetSquare];

                            if (BOARD_ZONES[side][targetSquare] == 2) pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);
                        }
                    }

                    // elephants
                    if (pieceType == ELEPHANT) {
                        for (let direction = 0; direction < ELEPHANT_MOVE_OFFSETS.length; direction++) {
                            let targetSquare = sourceSquare + ELEPHANT_MOVE_OFFSETS[direction];
                            let jumpOver = sourceSquare + DIAGONALS[direction];
                            let targetPiece = board[targetSquare];

                            if (BOARD_ZONES[side][targetSquare] && board[jumpOver] == EMPTY) pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);
                        }
                    }

                    // horses
                    if (pieceType == HORSE) {
                        for (let direction = 0; direction < ORTHOGONALS.length; direction++) {
                            let targetDirection = sourceSquare + ORTHOGONALS[direction];

                            if (board[targetDirection] == EMPTY) {
                                for (let offset = 0; offset < 2; offset++) {
                                    let targetSquare = sourceSquare + HORSE_MOVE_OFFSETS[direction][offset];
                                    let targetPiece = board[targetSquare];

                                    if (targetPiece != OFFBOARD) pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);
                                }
                            }
                        }
                    }

                    // rooks & cannons
                    if (pieceType == ROOK || pieceType == CANNON) {
                        for (let direction = 0; direction < ORTHOGONALS.length; direction++) {
                            let targetSquare = sourceSquare + ORTHOGONALS[direction];
                            let jumpOver = 0;

                            while (board[targetSquare] != OFFBOARD) {
                                let targetPiece = board[targetSquare];

                                if (jumpOver == 0) {
                                    // all rook moves
                                    if (pieceType == ROOK && PIECE_COLOR[targetPiece] == side ^ 1)
                                        pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);

                                    // cannon normal moves
                                    else if (pieceType == CANNON && targetPiece == EMPTY)
                                        pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);

                                }

                                if (targetPiece) jumpOver++;
                                if (targetPiece && pieceType == CANNON && PIECE_COLOR[targetPiece] == side ^ 1 && jumpOver == 2) {
                                    // capture cannon moves
                                    pushMove(moveList, sourceSquare, targetSquare, board[sourceSquare], targetPiece);
                                    break;
                                }

                                targetSquare += ORTHOGONALS[direction];
                            }
                        }
                    }
                }
            }
        }

        return moveList;
    }

    /*******************************************************\
     *                                                     *
     *                     MAKE MOVE / TACK BACK           *
     *                                                     *
    \*******************************************************/

    // Make move on the board
    function makeMove(move) {
        // store board state into moveStack
        moveStack.push({
            move: move,
            side: side,
            sixty: sixty
        });

        let sourceSquare = getSourceSquare(move);
        let targetSquare = getTargetSquare(move);
        let sourcePiece = getSourcePiece(move);
        let targetPiece = getTargetPiece(move);
        let captureFlag = getCaptureFlag(move);

        // move piece
        board[targetSquare] = sourcePiece;
        board[sourceSquare] = EMPTY;

        if (captureFlag) sixty = 0;
        else sixty++;

        // update king square
        if (board[targetSquare] == RED_KING || board[targetSquare] == BLACK_KING)
            kingSquare[side] = targetSquare;

        // switch side to move
        side ^= 1;

        // return illegal move if king is left in check
        if (isSquareAttacked(kingSquare[side ^ 1], side)) {
            takeBack();
            return false;
        } else return true;
    }

    // take back
    function takeBack() {
        // decode move
        let moveIndex = moveStack.length - 1; // get latest move index
        let move = moveStack[moveIndex].move;

        let sourceSquare = getSourceSquare(move);
        let targetSquare = getTargetSquare(move);
        let sourcePiece = getSourcePiece(move);
        let targetPiece = getTargetPiece(move);
        let captureFlag = getCaptureFlag(move);

        // move piece back
        board[sourceSquare] = sourcePiece;
        board[targetSquare] = EMPTY;

        // restore captured piece
        if (captureFlag) {
            board[targetSquare] = targetPiece;
        }

        // update king square
        if (board[sourceSquare] == RED_KING || board[sourceSquare] == BLACK_KING)
            kingSquare[side ^ 1] = sourceSquare;

        side = moveStack[moveIndex].side;
        sixty = moveStack[moveIndex].sixty;

        // remove move from moveStack
        moveStack.pop();
    }

    /*
                        Perft Results
        rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR r - - 0 1
        depth           nodes          checks           captures
            1              44               0                  2
            2           1,920               6                 72
            3          79,666             384              3,159
            4       3,290,240          19,380            115,365
            5     133,312,995         953,251          4,917,734
    */

    // perft driver
    function perftDriver(depth) {
        if (depth == 0) { nodes++; return; }

        let moveList = generateMoves();

        for (let count = 0; count < moveList.length; count++) {
            if (!makeMove(moveList[count].move)) continue;

            perftDriver(depth - 1);
            takeBack();
        }
    }

    // perft test
    function perftTest(depth) {
        nodes = 0;
        console.log('   Performance Test:\n');
        let resultString = '';
        let startTime = Date.now();

        let moveList = generateMoves();

        for (let count = 0; count < moveList.length; count++) {
            if (!makeMove(moveList[count].move)) continue;

            let cumNodes = nodes;
            perftDriver(depth - 1);
            takeBack();
            let oldNodes = nodes - cumNodes;
            console.log('   move' +
                        ' ' + (count + 1) + ((count < 9) ? ':    ' : ':   ') +
                        COORDINATES[getSourceSquare(moveList[count].move)] +
                        COORDINATES[getTargetSquare(moveList[count].move)] +
                        '    nodes: ' + oldNodes);

        }

        resultString += '\n   Depth: ' + depth;
        resultString += '\n   Nodes: ' + nodes;
        resultString += '\n    Time: ' + (Date.now() - startTime) + 'ms\n';
        console.log(resultString);
    }

    // visited nodes count
    var nodes = 0;


    // init Game
    (function initAll() {
        console.log("Init all");
    }());


    // debug
    function debug() {
        // setBoard(START_FEN);
        setBoard('CRH1k1e2/3ca4/4ea3/9/2hr5/9/9/4E4/4A4/4KA3 r - - 0 1')
        printBoard();

        // let moves = generateMoves();
        // makeMove(moves[0].move);
        // printBoard();

        // takeBack();
        // printBoard();
        perftTest(5);
    }

    return {
        debug: function() {
            debug();
        }
    }
}