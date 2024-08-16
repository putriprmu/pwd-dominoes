import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  Input,
  Flex,
} from "@chakra-ui/react";

const initialDominoes = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

const App = () => {
  const [dominoes, setDominoes] = useState(initialDominoes);
  const [sortOrder, setSortOrder] = useState("");
  const [removeTotal, setRemoveTotal] = useState("");
  const [flip, setFlip] = useState(false);

  const countDoubles = () => {
    return dominoes.filter(([a, b]) => a === b).length;
  };

  const sortDominoes = (order) => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      if (sumA === sumB) {
        return order === "asc" ? a[0] - b[0] : b[0] - a[0];
      }
      return order === "asc" ? sumA - sumB : sumB - sumA;
    });
    setDominoes(sorted);
  };

  const removeDuplicates = () => {
    const unique = dominoes.filter((item, index) => {
      return (
        dominoes.findIndex(
          (d) =>
            (d[0] === item[0] && d[1] === item[1]) ||
            (d[0] === item[1] && d[1] === item[0])
        ) === index
      );
    });
    setDominoes(unique);
  };

  const flipCards = () => {
    const flipped = dominoes.map(([a, b]) => [b, a]);
    setDominoes(flipped);
  };

  const removeCardsWithTotal = (total) => {
    const filtered = dominoes.filter(([a, b]) => a + b !== total);
    setDominoes(filtered);
  };

  const resetData = () => {
    setDominoes(initialDominoes);
    setSortOrder("");
    setRemoveTotal("");
    setFlip(false);
  };

  const handleRemoveTotalChange = (e) => {
    const total = parseInt(e.target.value, 10);
    setRemoveTotal(total);
  };

  const handleFlipChange = () => {
    setFlip(!flip);
    flipCards();
  };

  const handleRemoveClick = () => {
    const total = parseInt(removeTotal, 10);
    if (!isNaN(total)) {
      removeCardsWithTotal(total);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Dominoes
      </Heading>
      <VStack spacing={4} align="left">
        <Box
          borderWidth="1px"
          p={4}
          borderRadius="5"
          bgColor="rgba(128, 128, 128, 0.09)"
          width="100%"
        >
          <Text fontWeight="bold">Source</Text>
          <Text>{JSON.stringify(dominoes)}</Text>
        </Box>
        <Box
          borderWidth="1px"
          p={4}
          borderRadius="5"
          bgColor="rgba(128, 128, 128, 0.09)"
          width="100%"
        >
          <Text fontWeight="bold">Double Numbers</Text>
          <Text>{countDoubles()}</Text>
        </Box>
        <Flex wrap="wrap" spacing={2}>
          {dominoes.map(([a, b], index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderColor="black"
              borderRadius="0"
              padding={2}
              margin={1}
              textAlign="center"
              width="25px"
              height="110px"
            >
              <Stack spacing={1} align="center">
                <Text fontSize="lg">{a}</Text>
                <Text fontSize="lg">-</Text>
                <Text fontSize="lg">{b}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Stack spacing={4} direction="row">
          <Button colorScheme="blue" onClick={() => sortDominoes("asc")}>
            Sort (ASC)
          </Button>
          <Button colorScheme="blue" onClick={() => sortDominoes("desc")}>
            Sort (DESC)
          </Button>
          <Button colorScheme="blue" onClick={handleFlipChange}>
            Flip
          </Button>
          <Button colorScheme="blue" onClick={removeDuplicates}>
            Remove Dup
          </Button>
          <Button colorScheme="blue" onClick={resetData}>
            Reset
          </Button>
        </Stack>
        <Input
          placeholder="Input Number"
          value={removeTotal}
          onChange={handleRemoveTotalChange}
          type="number"
          borderRadius="0"
          sx={{
            "::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            appearance: "none",
          }}
        />
        <Button
          colorScheme="blue"
          onClick={handleRemoveClick}
          width="fit-content"
        >
          Remove
        </Button>
      </VStack>
    </Box>
  );
};

export default App;
