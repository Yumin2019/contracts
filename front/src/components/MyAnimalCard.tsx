import { Box, Divider, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import AnimalCard from "./AnimalCard";
import { web3 } from "../contracts";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

export const MyAnimalCard: FC<MyAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  saleStatus,
  account,
}) => {
  return (
    <Box>
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {Number(animalPrice) === 0 ? (
          <div>판매 버튼</div>
        ) : (
          <Text display="inline-block">
            {web3.utils.fromWei(Number(animalPrice), "wei")} Matic
          </Text>
        )}
      </Box>
    </Box>
  );
};
