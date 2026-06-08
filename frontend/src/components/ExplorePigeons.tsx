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
                <Box
                  bg={p.color + "99"}
                  px={{ base: 4, md: 6 }}
                  pt={{ base: 6, md: 10 }}
                  pb={{ base: 3, md: 6 }}
                  position="relative"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <VStack gap={1} align="center" justify="flex-start">
                    {/* TIGHTER HEADER */}
                    {/* BIGGER IMAGE */}
                    <Box   w="260px"
                      h="260px"
                      mx="auto">
                      <img
                        src={p.image}
                        alt={p.name}
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
                      {p.name}
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
                      {p.emoji} {p.tagline}
                    </Text>
                  </VStack>
                </Box>

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