import { Box, Text, VStack } from "@chakra-ui/react";
import { Bird, RotateCcw, Share2 } from "lucide-react";
import { type PigeonResult } from "../data/questions";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ResultProps {
  result: PigeonResult;
  onRestart: () => void;
  onTypes: () => void;
}

export function Result({ result, onRestart, onTypes }: ResultProps) {
  const userVector = [2, 3, 1, 4, 2];

  const chartData = result.traits.map((trait, i) => ({
    trait,
    value: result.vector[i],
    user: userVector[i],
  }));

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
        bg={result.color}
        px={{ base: 4, md: 6 }}
        pt={{ base: 6, md: 10 }}
        pb={{ base: 3, md: 6 }}
        position="relative"
        overflow="hidden"
        flexShrink={0}
      >
        {/* decorative blobs */}
        <Box
          position="absolute"
          top="-50px"
          right="-30px"
          w="160px"
          h="160px"
          borderRadius="full"
          bg="whiteAlpha.300"
        />
        <Box
          position="absolute"
          bottom="-40px"
          left="-20px"
          w="100px"
          h="100px"
          borderRadius="full"
          bg="whiteAlpha.200"
        />

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
                width: "clamp(160px, 28vw, 260px)",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>

          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="900"
            textAlign="center"
            color="blackAlpha.700"
            fontFamily="'Fraunces', serif"
            lineHeight="1.05"
          >
            {result.name}
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            color="blackAlpha.700"
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
            fontSize="m"
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
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" />
                <PolarRadiusAxis domain={[0, 5]} />

                <Radar
                  name="You"
                  dataKey="user"
                  stroke="#666"
                  fill="#999"
                  fillOpacity={0.2}
                />

                <Radar
                  name={result.name}
                  dataKey="value"
                  stroke={result.color}
                  fill={result.color}
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
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