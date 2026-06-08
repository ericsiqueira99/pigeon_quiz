import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { pigeonResults, traitOrder } from "../data/questions";
import { useState } from "react";
import { TraitRadarChart } from "./RadarChart";

interface Props {
  onClose: () => void;
  userResult: Record<string, number>;
}

export function ExplorePigeons({ userResult, onClose }: Props) {
  const list = Object.values(pigeonResults);
  const [index, setIndex] = useState(0);

  return (
    <Box
      w="100%"
      minH="100dvh"
      display="flex"
      flexDir="column"
      css={{ touchAction: "none" }}
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
            touchAction: "pan-x",
            overscrollBehaviorX: "contain",
          }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            setIndex(i);
          }}
        >
          {list.map((p) => {
            const chartData = traitOrder.map((trait) => ({
              trait,
              value: p.traits[trait] ?? 0,
              user: userResult[trait] ?? 0,
            }));

            return (
              <Box
                key={p.name}
                flex="0 0 100%"
                minW="100%"
                h="100%"
                scrollSnapAlign="start"
                display="flex"
                flexDir="column"
                overflow="hidden"
              >

                {/* ================= HERO ================= */}
                <VStack
                  flexShrink={0}
                  flex="0 0 42%"
                  bg={p.color + "99"}
                  justify="center"
                  gap={3}
                  px={6}
                  overflow="hidden"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "80%",
                      height: "160px",
                      objectFit: "fill",
                    }}
                  />
                  <Text fontSize="xl" fontWeight="900" color="black" textAlign="center">
                    {p.name}
                  </Text>
                  <Text fontSize="md" fontStyle="italic" color="black" textAlign="center">
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
                  minW={0}
                >

                  {/* DESCRIPTION */}
                  <Box flexShrink={0} bg="gray.50" p={4} borderRadius="12px">
                    <Text fontSize="sm" color="gray.600">
                      {p.description}
                    </Text>
                  </Box>

                  {/* RADAR */}
                  <Box 
                    w="100%"
                    h={{ base: "280px", md: "340px" }}
                  >
                    <TraitRadarChart
                      chartData={chartData}
                      resultName={p.name}
                      resultColor={p.color}
                    />
                  </Box>

                </VStack>
              </Box>
            );
          })}
        </HStack>
      </Box>

      {/* ================= DOTS ================= */}
      <HStack flexShrink={0} justify="center" py={2} gap={2}>
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
      <Box flexShrink={0} px={6} pb="max(16px, env(safe-area-inset-bottom))">
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
  );
}