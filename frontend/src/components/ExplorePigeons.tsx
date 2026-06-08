import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { pigeonResults, traitOrder } from "../data/questions";
import { useState } from "react";
import { TraitRadarChart } from "./RadarChart";
import ResultLayout from "./ResultLayout";

interface Props {
  onClose: () => void;
  userResult: Record<string, number>;
}

export function ExplorePigeons({ userResult, onClose }: Props) {
  const list = Object.values(pigeonResults);
  const [index, setIndex] = useState(0);

  return (
<VStack w="100%" minH="100dvh" gap={0} align="stretch" bg="gray.50">
  {/* ================= CAROUSEL AREA ================= */}
  <HStack
    flex="1"
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
    {list.map((p, i) => {
      const chartData = traitOrder.map((trait) => ({
        trait,
        value: p.traits[trait] ?? 0,
        user: userResult[trait] ?? 0,
      }));

      return (
        <Box
  key={p.name ?? i}
  flex="0 0 100%"
  width="100%"
  maxW="100%"
  minW={0}
  h="100%"
  scrollSnapAlign="start"
  overflow="hidden"
>
  <ResultLayout
    result={p}
    chartData={chartData}
  />
</Box>
      );
    })}
  </HStack>

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
    </VStack>
  </Box>
</VStack>
  );
}