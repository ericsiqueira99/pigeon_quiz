import { Box, Text, VStack } from "@chakra-ui/react";
import { Bird, RotateCcw, Share2 } from "lucide-react";
import { traitOrder, type PigeonResult } from "../data/questions";
import { TraitRadarChart } from "./RadarChart";
import ResultLayout from "./ResultLayout";

interface ResultProps {
  result: PigeonResult;
  userResult:  Record<string, number>;
  onRestart: () => void;
  onTypes: () => void;
}

export function Result({ result, userResult, onRestart, onTypes }: ResultProps) {
  const chartData = traitOrder.map((trait) => ({
    trait,
    value: result.traits[trait] ?? 0,
    user: userResult[trait] ?? 0,
  }));
  
  function shareResults() {
    const shareText = `I got *${result.name}* on the Pigeon Quiz!\n${result.emoji} _${result.tagline}_\n\nFind out which pigeon you are ${String.fromCodePoint(0x1F447)}\n${window.location.href}`;

    // encode the entire text at once
    const encoded = encodeURIComponent(shareText);
    
    window.open(`https://wa.me/?text=${encoded}`);
  }

  return (
    <VStack
      w="100%"
      minH="100dvh"
      gap={0}
      align="stretch"
      bg="gray.50"
    >
      <ResultLayout result={result} chartData={chartData}/>

      {/* =============== FIXED ACTION BAR =============== */}
      <Box
        position="sticky"
        bottom={0}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        <VStack gap={2} align="stretch">
          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            h="46px"
            borderRadius="12px"
            bg="gray.900"
            color="white"
            fontWeight="700"
            fontSize="sm"
            onClick={shareResults}
          >
            <Share2 size={18} />
            Share my pigeon type
          </Box>

          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            h="46px"
            borderRadius="12px"
            bg="gray.600"
            color="white"
            fontWeight="700"
            fontSize="sm"
            onClick={onTypes}
          >
            <Bird size={18} />
            Check all pigeon types
          </Box>

          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            h="44px"
            borderRadius="12px"
            bg="transparent"
            border="1px solid"
            borderColor="gray.300"
            color="gray.600"
            fontWeight="600"
            fontSize="sm"
            onClick={onRestart}
          >
            <RotateCcw size={16} />
            Take the quiz again
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}