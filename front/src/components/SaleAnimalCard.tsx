import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
  web3,
} from "../contracts";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
  animalTokenId: string;
  account: string;
  getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalType,
  animalPrice,
  animalTokenId,
  account,
  getOnSaleAnimalTokens,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokenOwner = async () => {
    try {
      const response = await (mintAnimalTokenContract.methods.ownerOf as any)(
        Number(animalTokenId)
      ).call();

      setIsBuyable(
        response.toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;
      const response = await (
        saleAnimalTokenContract.methods.purchaseAnimalToken as any
      )(Number(animalTokenId)).send({
        from: account,
        value: animalPrice,
      });

      if (Number(response.status) === 1) {
        getOnSaleAnimalTokens();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnimalTokenOwner();
  }, []);

  return (
    <Box>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text display="inline-block">
          {web3.utils.fromWei(animalPrice, "ether")} Matic
        </Text>
        {isBuyable && (
          <Button size="sm" colorScheme="green" m={2} onClick={onClickBuy}>
            Buy
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
