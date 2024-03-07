import React, { useState } from "react";
import { Box, Grid, Button, VStack, useToast, Center, Text, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { FaTimes, FaCircle } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});

const Index = () => {
  const toast = useToast();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = checkWinner(newBoard);
    if (winner) {
      toast({
        title: "Game Over",
        description: `Player ${winner} won!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setGameOver(true);
    } else if (!newBoard.includes(null)) {
      toast({
        title: "Game Over",
        description: "It's a draw!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      setGameOver(true);
    } else {
      if (!isXNext) {
        aiMove(newBoard);
      }
    }
  };

  const aiMove = (squares) => {
    let availableMoves = squares.map((square, index) => (square === null ? index : null)).filter((val) => val !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    setTimeout(() => handleClick(randomMove), 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const renderSquare = (i) => {
    return (
      <Button h="20" w="20" onClick={() => handleClick(i)} disabled={!!board[i]}>
        {board[i] === "X" && <FaTimes color="red" />}
        {board[i] === "O" && <FaCircle color="blue" />}
      </Button>
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Center h="100vh" flexDirection="column">
        <Text fontSize="5xl" marginBottom="8">
          Tic Tac Toe
        </Text>
        <VStack spacing={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Box key={i}>{renderSquare(i)}</Box>
            ))}
          </Grid>
          <Button colorScheme="blue" onClick={resetGame}>
            Reset Game
          </Button>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default Index;
