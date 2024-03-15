import React, { useState } from "react";
import { Avatar, Box, Button, Card, Center, Checkbox, Flex, Heading, IconButton, Image, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { FaClock, FaLock, FaUnlock } from "react-icons/fa";

const machines = [
  { id: 1, name: "Machine 1", status: "operational" },
  { id: 2, name: "Machine 2", status: "second_factor_needed" },
  { id: 3, name: "Machine 3", status: "non_operational" },
];

const MachineCard = ({ machine, onClick, firstFactorPerson, secondFactorPerson }) => {
  const statusIcons = {
    operational: { icon: FaUnlock, color: "green.500" },
    second_factor_needed: { icon: FaClock, color: "yellow.500" },
    non_operational: { icon: FaLock, color: "red.500" },
  };

  const { icon: StatusIcon, color: statusColor } = statusIcons[machine.status] || {};

  return (
    <Card p={4} cursor="pointer" onClick={() => onClick(firstFactorPerson, secondFactorPerson)}>
      <Flex align="center">
        <Text fontWeight="bold" mr={2}>
          {machine.name}
        </Text>
        <Spacer />
        <IconButton icon={<StatusIcon />} aria-label={`${machine.name} status`} color={statusColor} variant="ghost" />
      </Flex>
    </Card>
  );
};

const MachinePage = ({ machine, onBack, firstFactorPerson, secondFactorPerson }) => {
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

  const handleOpenMachine = (firstFactorPerson, secondFactorPerson) => {
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
          <Stack spacing={4}>
            <Text>Please complete the checklist to open the machine:</Text>
            <Checkbox onChange={handleChecklistChange}>Checklist completed</Checkbox>
            <Button onClick={handleOpenMachine} disabled={!checklistCompleted} colorScheme="blue">
              Open Machine
            </Button>
          </Stack>
        )}
        {machine.status === "second_factor_needed" && (
          <Stack spacing={4}>
            <Text>Second factor authentication required:</Text>
            <Checkbox onChange={handleSecondFactorChange}>Second factor completed</Checkbox>
            <Button onClick={handleOpenMachine} disabled={!secondFactorCompleted} colorScheme="blue">
              Open Machine
            </Button>
          </Stack>
        )}
        {machine.status === "operational" && timerStarted && (
          <>
            <Text>Machine is operational</Text>
            <Text>Time remaining: {formatTime(timeRemaining)}</Text>
            <Flex align="center">
              <Avatar src={firstFactorPerson.avatarUrl} name={firstFactorPerson.name} mr={4} />
              <Text>First factor: {firstFactorPerson.name}</Text>
            </Flex>
            <Flex align="center">
              <Avatar src={secondFactorPerson.avatarUrl} name={secondFactorPerson.name} mr={4} />
              <Text>Second factor: {secondFactorPerson.name}</Text>
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

  const handleMachineClick = (machine, firstFactorPerson, secondFactorPerson) => {
    setSelectedMachine({ ...machine, firstFactorPerson, secondFactorPerson });
  };

  const handleBack = () => {
    setSelectedMachine(null);
  };

  return (
    <Center h="100vh">
      {selectedMachine ? (
        <MachinePage machine={selectedMachine} onBack={handleBack} firstFactorPerson={selectedMachine.firstFactorPerson} secondFactorPerson={selectedMachine.secondFactorPerson} />
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
