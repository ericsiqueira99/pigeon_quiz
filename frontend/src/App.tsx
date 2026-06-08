import { useState, useEffect } from "react";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { questions, pigeonResults, type PigeonResult } from "./data/questions";
import { Question } from "./components/Question";
import { Result } from "./components/Result";
import { ExplorePigeons } from "./components/ExplorePigeons";

type Screen = "start" | "quiz" | "loading" | "result" | "types";

const LOADING_MESSAGES = [
  { emoji: "🔍", text: "Analysing your responses…" },
  { emoji: "🐦", text: "Consulting the pigeon council…" },
  { emoji: "📊", text: "Cross-referencing bread preferences…" },
  { emoji: "✨", text: "Revealing your true pigeon self…" },
];

function getUserResult(answers: Record<string, string>): Record<string, number>  {
  // Initialize all traits to 0
  const traits: Record<string, number> = {
    aggressive: 0,
    social: 0,
    greed: 0,
    urbanism: 0,
    mysticism: 0,
    romanticism: 0,
    adaptability: 0,
  };

  // Sum/subtract based on answers
  questions.forEach((q) => {
    const selectedId = answers[q.id];
    if (!selectedId) return;
    const option = q.options.find((o) => o.id === selectedId);
    if (!option) return;
    Object.entries(option.scores).forEach(([key, val]) => {
      traits[key] = (traits[key] ?? 0) + val;
    });
  });

  // Cap all traits between 0 and 10
  Object.keys(traits).forEach((key) => {
    traits[key] = Math.min(10, Math.max(0, traits[key]));
  });

  return traits
}

function getResult(userTraits: Record<string, number>): PigeonResult  {
  // Vector distance to find best matching result
  const winner = Object.entries(pigeonResults)
    .map(([id, result]) => {
      const distance = Object.keys(userTraits).reduce((sum, key) => {
        const diff = (userTraits[key] ?? 0) - (result.traits[key] ?? 0);
        return sum + diff * diff;
      }, 0);
      return { id, distance };
    })
    .sort((a, b) => a.distance - b.distance)[0].id;
  return pigeonResults[winner];
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PigeonResult | null>(null);
  const [userResult, setUserResult] = useState<Record<string, number>>({});
  const [loadingStep, setLoadingStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Loading screen logic
  useEffect(() => {
    if (screen !== "loading") return;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < LOADING_MESSAGES.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => setScreen("result"), 600);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [screen]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers({});
  };

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: optionId }));
  };

  const handleNext = () => {
    if (animating) return;
    if (currentQ < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
        setAnimating(false);
      }, 200);
    } else {
      // Last question — compute and go to loading
      const tmp_userResult  = getUserResult(answers); 
      setUserResult(tmp_userResult)
      setResult(getResult(tmp_userResult));
      // setLoadingStep(0);
      // setScreen("loading");
      setScreen("result")
    }
  };

  const handleBack = () => {
    if (currentQ === 0) {
      setScreen("start");
    } else {
      setCurrentQ((q) => q - 1);
    }
  };

  const handleRestart = () => {
    setScreen("start");
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  };

  const hasAnswer = !!answers[questions[currentQ]?.id];
  const isLastQuestion = currentQ === questions.length - 1;

  // ── RESULT ────────────────────────────────────────────────────
  if (screen === "result" && result) {
    return (
      <Box maxW="430px" mx="auto" minH="100dvh" bg="white">
        <Result result={result} userResult={userResult} onRestart={handleRestart} onTypes={() => {setScreen("types");}}/>
      </Box>
    );
  }

  // ── TYPES ────────────────────────────────────────────────────
  if (screen === "types" && result) {
    return (
      <Box maxW="430px" mx="auto" minH="100dvh" bg="white">
        <ExplorePigeons userResult={userResult} onClose={() => setScreen("result")} />
      </Box>
    );
  }

  // ── LOADING ───────────────────────────────────────────────────
  if (screen === "loading") {
    const msg = LOADING_MESSAGES[loadingStep];
    return (
      <Box
        maxW="430px"
        mx="auto"
        minH="100dvh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <VStack gap={6} align="center">
          <Text
            fontSize="6xl"
            style={{ animation: "spin 1.2s linear infinite" }}
          >
            {msg.emoji}
          </Text>
          <Text
            fontSize="lg"
            fontWeight="700"
            textAlign="center"
            fontFamily="'Fraunces', serif"
            color="gray.800"
            transition="all 0.4s"
          >
            {msg.text}
          </Text>
          <HStack gap={2} pt={2}>
            {LOADING_MESSAGES.map((_, i) => (
              <Box
                key={i}
                w={i <= loadingStep ? "20px" : "6px"}
                h="6px"
                borderRadius="full"
                bg={i <= loadingStep ? "gray.800" : "gray.200"}
                transition="all 0.4s ease"
              />
            ))}
          </HStack>
        </VStack>
        <style>{`
          @keyframes spin {
            0%, 100% { transform: rotate(-10deg) scale(1); }
            25% { transform: rotate(10deg) scale(1.1); }
            50% { transform: rotate(-10deg) scale(1); }
            75% { transform: rotate(10deg) scale(1.05); }
          }
        `}</style>
      </Box>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────
  if (screen === "quiz") {
    return (
      <Box maxW="430px" mx="auto" minH="100dvh" bg="gray.50" display="flex" flexDir="column">
        {/* Header */}
        <HStack
          px={4}
          pt={6}
          pb={2}
          justify="space-between"
          align="center"
        >
          <Box
            as="button"
            onClick={handleBack}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="36px"
            h="36px"
            borderRadius="10px"
            bg="white"
            border="1.5px solid"
            borderColor="gray.150"
            cursor="pointer"
            color="gray.600"
            transition="all 0.15s"
            _hover={{ bg: "gray.100" }}
          >
            <ChevronLeft size={18} />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="700"
            color="gray.700"
            fontFamily="'DM Sans', sans-serif"
          >
            Pigeon Quiz
          </Text>
          <Box w="36px" />
        </HStack>

        {/* Question area */}
        <Box
          flex="1"
          px={5}
          pt={4}
          pb={6}
          opacity={animating ? 0 : 1}
          transform={animating ? "translateX(20px)" : "translateX(0)"}
          transition="all 0.2s ease"
        >
          <Question
            question={questions[currentQ]}
            questionNumber={currentQ + 1}
            totalQuestions={questions.length}
            selectedOption={answers[questions[currentQ].id] ?? null}
            onSelect={handleSelect}
          />
        </Box>

        {/* Next button */}
        <Box px={5} pb={8}>
          <Box
            as="button"
            onClick={handleNext}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            h="56px"
            w="100%"
            borderRadius="16px"
            pointerEvents={hasAnswer ? "auto" : "none"}
            bg={hasAnswer ? "gray.900" : "gray.200"}
            color={hasAnswer ? "white" : "gray.400"}
            fontFamily="'DM Sans', sans-serif"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="0.02em"
            cursor={hasAnswer ? "pointer" : "not-allowed"}
            transition="all 0.2s"
            transform={hasAnswer ? "scale(1)" : "scale(0.98)"}
            _hover={hasAnswer ? { bg: "gray.700", transform: "scale(1.01)" } : {}}
            _active={hasAnswer ? { transform: "scale(0.99)" } : {}}
          >
            {isLastQuestion ? "See my result 🐦" : "Next"}
            {!isLastQuestion && <ChevronRight size={16} />}
          </Box>
        </Box>
      </Box>
    );
  }

  // ── START ─────────────────────────────────────────────────────
  return (
    <Box
      maxW="430px"
      mx="auto"
      minH="100dvh"
      bg="white"
      display="flex"
      flexDir="column"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-80px"
        right="-60px"
        w="280px"
        h="280px"
        borderRadius="full"
        bg="gray.50"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="120px"
        left="-50px"
        w="160px"
        h="160px"
        borderRadius="full"
        bg="gray.50"
        zIndex={0}
      />

      <VStack
        flex="1"
        px={6}
        pt={16}
        pb={10}
        justify="space-between"
        align="stretch"
        position="relative"
        zIndex={1}
      >
        <VStack gap={6} align="center" flex="1" justify="center">
          {/* Hero emoji */}
          <Box
            fontSize="8xl"
            lineHeight="1"
            style={{ animation: "bobble 2.5s ease-in-out infinite" }}
          >
            <img
              src="/pigeon2.svg"
              alt="Pigeon"
              style={{ width: "8rem", height: "8rem" }}
            />
          </Box>

          <VStack gap={3} align="center">
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="gray.400"
              fontFamily="'DM Mono', monospace"
            >
              Personality Quiz
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="900"
              textAlign="center"
              fontFamily="'Fraunces', serif"
              color="gray.900"
              lineHeight="1.15"
            >
              Which Pigeon
              <br />
              Are You?
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="gray.500"
              lineHeight="1.7"
              maxW="280px"
              fontFamily="'DM Sans', sans-serif"
            >
              {questions.length} questions stand between you and your true pigeon identity. Are you ready to find out?
            </Text>
          </VStack>

          {/* Stats row */}
          <HStack gap={6} pt={2}>
            {[
              { label: "Questions", value: `${questions.length}` },
              { label: "Results", value: `${Object.keys(pigeonResults).length}` },
              { label: "Minutes", value: `~10` },
            ].map(({ label, value }) => (
              <VStack key={label} gap={0} align="center">
                <Text
                  fontSize="xl"
                  fontWeight="800"
                  color="gray.900"
                  fontFamily="'Fraunces', serif"
                >
                  {value}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.400"
                  fontFamily="'DM Mono', monospace"
                  letterSpacing="0.05em"
                >
                  {label}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>

        {/* CTA */}
        <Box
          as="button"
          onClick={handleStart}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          h="60px"
          w="100%"
          borderRadius="18px"
          bg="gray.900"
          color="white"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="800"
          fontSize="base"
          letterSpacing="0.01em"
          cursor="pointer"
          transition="all 0.2s"
          boxShadow="0 8px 32px rgba(0,0,0,0.18)"
          _hover={{ bg: "gray.700", transform: "scale(1.02)", boxShadow: "0 12px 40px rgba(0,0,0,0.22)" }}
          _active={{ transform: "scale(0.98)" }}
        >
          Start the quiz
          <ChevronRight size={18} />
        </Box>
      </VStack>

      <style>{`
        @keyframes bobble {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-14px) rotate(5deg); }
        }
      `}</style>
    </Box>
  );
}