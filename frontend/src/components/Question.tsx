import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { type Question as QuestionType } from "../data/questions";

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

export function Question({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelect,
}: QuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <VStack gap={6} w="100%" align="stretch">
      {/* Progress bar */}
      <VStack gap={2} align="stretch">
        <HStack justify="space-between">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="gray.400"
            fontFamily="'DM Mono', monospace"
          >
            Question {questionNumber} of {totalQuestions}
          </Text>
          {/* <Text
            fontSize="xs"
            fontWeight="700"
            color="gray.400"
            fontFamily="'DM Mono', monospace"
          >
            {Math.round(progress)}%
          </Text> */}
        </HStack>
        <Box
          h="4px"
          bg="gray.100"
          borderRadius="full"
          overflow="hidden"
        >
          <Box
            h="100%"
            bg="gray.800"
            borderRadius="full"
            w={`${progress}%`}
            transition="width 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          />
        </Box>
      </VStack>

      {/* Emoji + Question */}
      <VStack gap={3} align="center" pt={2}>
        <Text fontSize="4xl" lineHeight="1">{question.emoji}</Text>
        <Text
          fontSize={{ base: "l", md: "2xl" }}
          fontWeight="800"
          textAlign="center"
          lineHeight="1.1"
          fontFamily="'Fraunces', serif"
          color="gray.900"
          px={2}
        >
          {question.text}
        </Text>
      </VStack>

      {/* Options */}
      <VStack gap={3} align="stretch" pt={2}>
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === option.id;
          const labels = ["A", "B", "C", "D"];

          return (
            <Box
              key={option.id}
              as="button"
              onClick={() => onSelect(option.id)}
              display="flex"
              alignItems="center"
              gap={4}
              p={4}
              borderRadius="16px"
              border="2px solid"
              borderColor={isSelected ? "gray.900" : "gray.150"}
              bg={isSelected ? "gray.900" : "white"}
              color={isSelected ? "white" : "gray.800"}
              cursor="pointer"
              textAlign="left"
              w="100%"
              transition="all 0.18s ease"
              transform={isSelected ? "scale(1.01)" : "scale(1)"}
              boxShadow={isSelected ? "0 4px 24px rgba(0,0,0,0.18)" : "0 1px 4px rgba(0,0,0,0.05)"}
              _hover={{
                borderColor: isSelected ? "gray.900" : "gray.300",
                bg: isSelected ? "gray.900" : "gray.50",
                transform: "scale(1.01)",
              }}
              _active={{ transform: "scale(0.99)" }}
            >
              <Box
                flexShrink={0}
                w="32px"
                h="32px"
                borderRadius="10px"
                bg={isSelected ? "white" : "gray.100"}
                color={isSelected ? "gray.900" : "gray.500"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontFamily="'DM Mono', monospace"
                fontSize="xs"
                fontWeight="700"
                transition="all 0.18s ease"
              >
                {labels[idx]}
              </Box>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                lineHeight="1.5"
                flex="1"
                fontFamily="'DM Sans', sans-serif"
              >
                {option.label}
              </Text>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
}