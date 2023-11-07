import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import AnimalCard from "./AnimalCard";
import { web3 } from "../contracts";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalType,
  animalPrice,
}) => {
  return (
    <Box>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text display="inline-block">
          {web3.utils.fromWei(animalPrice, "ether")} Matic
        </Text>
        <Button size="sm" colorScheme="green" m={2}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
