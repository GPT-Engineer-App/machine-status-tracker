import React, { useState } from "react";
import { Box, Button, Center, Checkbox, Flex, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaClock, FaLock, FaUnlock } from "react-icons/fa";

const machines = [
  { id: 1, name: "Machine 1", status: "operational" },
  { id: 2, name: "Machine 2", status: "second_factor_needed" },
  { id: 3, name: "Machine 3", status: "non_operational" },
];

const MachineCard = ({ machine, onClick }) => {
  let statusIcon;
  let statusColor;

  switch (machine.status) {
    case "operational":
      statusIcon = <FaUnlock />;
      statusColor = "green.500";
      break;
    case "second_factor_needed":
      statusIcon = <FaClock />;
      statusColor = "yellow.500";
      break;
    case "non_operational":
      statusIcon = <FaLock />;
      statusColor = "red.500";
      break;
    default:
      break;
  }

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} cursor="pointer" onClick={onClick}>
      <Flex align="center">
        <Text fontWeight="bold" mr={2}>
          {machine.name}
        </Text>
        <Box color={statusColor}>{statusIcon}</Box>
      </Flex>
    </Box>
  );
};

const MachinePage = ({ machine, onBack }) => {
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const [secondFactorCompleted, setSecondFactorCompleted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(28800); // 8 hours in seconds

  const handleChecklistChange = (e) => {
    setChecklistCompleted(e.target.checked);
  };

  const handleSecondFactorChange = (e) => {
    setSecondFactorCompleted(e.target.checked);
  };

  const handleOpenMachine = () => {
    setTimerStarted(true);
    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when it reaches 0
    setTimeout(() => {
      clearInterval(timer);
    }, 28800000); // 8 hours in milliseconds
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Center>
      <VStack spacing={4} align="stretch">
        <Heading>{machine.name}</Heading>
        {machine.status === "non_operational" && (
          <>
            <Text>Please complete the checklist to open the machine:</Text>
            <Checkbox onChange={handleChecklistChange}>Checklist completed</Checkbox>
            <Button onClick={handleOpenMachine} disabled={!checklistCompleted} colorScheme="blue">
              Open Machine
            </Button>
          </>
        )}
        {machine.status === "second_factor_needed" && (
          <>
            <Text>Second factor authentication required:</Text>
            <Checkbox onChange={handleSecondFactorChange}>Second factor completed</Checkbox>
            <Button onClick={handleOpenMachine} disabled={!secondFactorCompleted} colorScheme="blue">
              Open Machine
            </Button>
          </>
        )}
        {machine.status === "operational" && timerStarted && (
          <>
            <Text>Machine is operational</Text>
            <Text>Time remaining: {formatTime(timeRemaining)}</Text>
            <Flex align="center">
              <Image src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMDQ1MjQ4MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Operator" borderRadius="full" boxSize="50px" mr={4} />
              <Text>Opened by: John Doe</Text>
            </Flex>
          </>
        )}
        <Button onClick={onBack}>Back to Machine List</Button>
      </VStack>
    </Center>
  );
};

const Index = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
  };

  const handleBack = () => {
    setSelectedMachine(null);
  };

  return (
    <Center h="100vh">
      {selectedMachine ? (
        <MachinePage machine={selectedMachine} onBack={handleBack} />
      ) : (
        <Stack spacing={4}>
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} onClick={() => handleMachineClick(machine)} />
          ))}
        </Stack>
      )}
    </Center>
  );
};

export default Index;
