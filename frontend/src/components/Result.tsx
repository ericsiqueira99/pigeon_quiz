import { Box, Text, VStack } from "@chakra-ui/react";
import { Bird, RotateCcw, Share2 } from "lucide-react";
import { traitOrder, type PigeonResult } from "../data/questions";
import { TraitRadarChart } from "./RadarChart";

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
      {/* ================= HERO ================= */}
      <Box
        bg={result.color + "99"}
        px={{ base: 4, md: 6 }}
        pt={{ base: 6, md: 10 }}
        pb={{ base: 3, md: 6 }}
        position="relative"
        overflow="hidden"
        flexShrink={0}
      >
        {/* decorative blobs */}
        <VStack gap={1} align="center">
          {/* TIGHTER HEADER */}
          <Text
            fontSize="10px"
            fontWeight="700"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="blackAlpha.600"
          >
            You are…
          </Text>

          {/* BIGGER IMAGE */}
          <Box>
            <img
              src={result.image}
              alt={result.name}
              style={{
                width: "clamp(220px, 36vw, 280px)",
                height: "auto",
                objectFit: "fill",
              }}
            />
          </Box>

          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="900"
            textAlign="center"
            color="black"
            fontFamily="'Fraunces', serif"
            lineHeight="1.05"
          >
            {result.name}
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            color="black"
            fontFamily="'Fraunces', serif"
            fontStyle="italic"
            lineHeight="1.2"
            px={2}
          >
            {result.emoji} {result.tagline}
          </Text>
        </VStack>
      </Box>

      {/* =============== SCROLLABLE CONTENT =============== */}
      <Box
        flex="1"
        overflowY="auto"
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={4}
      >
        <VStack gap={5} align="stretch">
          {/* DESCRIPTION */}
          <Text
            fontSize={{ base: "sm", md: "m" }}
            lineHeight="1.5"
            color="gray.600"
          >
            {result.description}
          </Text>

          {/* BIGGER RADAR */}
          <Box
            w="100%"
            h={{ base: "280px", md: "340px" }}
          >
            <TraitRadarChart
              chartData={chartData}
              resultName={result.name}
              resultColor={result.color}
            />
          </Box>
        </VStack>
      </Box>

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