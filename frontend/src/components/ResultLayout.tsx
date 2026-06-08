import { Box, VStack, Text } from "@chakra-ui/react";
import type { PigeonResult } from "../data/questions";
import { TraitRadarChart } from "./RadarChart";

type Props = {
  result: PigeonResult;
  chartData: any;
};

export default function ResultLayout({
  result,
  chartData,
}: Props) {
  return (
    <VStack w="100%" minH="100dvh" gap={0} align="stretch" bg="gray.50">
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
        <VStack gap={1} align="center">
          <Text
            fontSize="10px"
            fontWeight="700"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="blackAlpha.600"
          >
            You are…
          </Text>

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
      <Box flex="1" overflowY="auto" px={{ base: 4, md: 6 }} pt={4} pb={4}>
        <VStack gap={5} align="stretch">
          <Text fontSize={{ base: "sm", md: "md" }} lineHeight="1.5" color="gray.600">
            {result.description}
          </Text>

          <Box w="100%" h={{ base: "280px", md: "340px" }}>
            <TraitRadarChart
              chartData={chartData}
              resultName={result.name}
              resultColor={result.color}
            />
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}