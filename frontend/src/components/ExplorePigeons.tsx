import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { pigeonResults, type PigeonResult } from "../data/questions";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";

interface Props {
  onClose: () => void;
}

export function ExplorePigeons({ onClose }: Props) {
  const pigeons: Record<string, PigeonResult> = pigeonResults;
  const list = Object.values(pigeons);

  const [index, setIndex] = useState(0);
  const userVector = useMemo(() => [2, 3, 1, 4, 2], []);

  return (
    <VStack
      w="100%"
      minH="100dvh"
      gap={0}
      align="stretch"
      bg="gray.50"
    >
    <Box
      maxW="430px"
      mx="auto"
      h="100dvh"
      bg="white"
      display="flex"
      flexDir="column"
      overflow="hidden"   // ✅ kills all page-level overflow
    >

      {/* ================= CAROUSEL AREA ================= */}
      <Box flex="1" overflow="hidden" minW={0}>
        <HStack
          h="100%"
          gap={0}
          overflowX="auto"
          overflowY="hidden"
          minW={0}
          css={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            setIndex(i);
          }}
        >

          {list.map((p) => {
            const chartData = p.traits.map((trait, i) => ({
              trait,
              value: p.vector[i],
              user: userVector[i],
            }));

            return (
              <Box
                key={p.name}
                flex="0 0 100%"
                minW="100%"          // ✅ CRITICAL: fixes sideways scroll bug
                h="100%"
                scrollSnapAlign="start"
                display="flex"
                flexDir="column"
                overflow="hidden"
              >

                {/* ================= HERO ================= */}
                <VStack
                  flex="0 0 42%"
                  bg={p.color}
                  justify="center"
                  gap={3}
                  px={6}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "contain",
                    }}
                  />

                  <Text fontSize="xl" fontWeight="900" textAlign="center">
                    {p.name}
                  </Text>

                  <Text fontSize="sm" fontStyle="italic" textAlign="center">
                    {p.emoji} {p.tagline}
                  </Text>
                </VStack>

                {/* ================= BODY ================= */}
                <VStack
                  flex="1"
                  px={6}
                  py={4}
                  gap={5}
                  align="stretch"
                  overflow="hidden"
                  minW={0}   // ✅ prevents recharts overflow
                >

                  {/* DESCRIPTION */}
                  <Box bg="gray.50" p={4} borderRadius="12px">
                    <Text fontSize="sm" color="gray.600">
                      {p.description}
                    </Text>
                  </Box>

                  {/* RADAR */}
                  <Box flex="1" minW={0} overflow="hidden">
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
                          name={p.name}
                          dataKey="value"
                          stroke={p.color}
                          fill={p.color}
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Box>

                </VStack>
              </Box>
            );
          })}

        </HStack>
      </Box>

      {/* ================= DOTS ================= */}
      <HStack justify="center" py={2} gap={2}>
        {list.map((_, i) => (
          <Box
            key={i}
            w="6px"
            h="6px"
            borderRadius="full"
            bg={i === index ? "gray.800" : "gray.300"}
          />
        ))}
      </HStack>

      {/* ================= CLOSE BUTTON ================= */}
      <Box px={6} pb="max(16px, env(safe-area-inset-bottom))">
        <Box
          as="button"
          onClick={onClose}
          w="100%"
          h="56px"
          borderRadius="16px"
          bg="gray.900"
          color="white"
          fontWeight="800"
        >
          Close
        </Box>
      </Box>

    </Box>
    </VStack>
  );
}