import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";

import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract, web3 } from "../contracts";

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
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;
      const response = await (
        saleAnimalTokenContract.methods.setForSaleAnimalToken as any
      )(
        Number(animalTokenId),
        web3.utils.toWei(Number(sellPrice), "ether") // ehter to wei
      ).send({
        from: account,
      });

      // 성공하면 데이터 가격 변경하기
      if (Number(response.status) === 1) {
        setMyAnimalPrice(web3.utils.toWei(Number(sellPrice), "ether"));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {Number(myAnimalPrice) === 0 ? (
          <>
            <InputGroup>
              <Input
                type="number"
                value={sellPrice}
                onChange={onChangeSellPrice}
              />
              <InputRightAddon children="Matic" />
            </InputGroup>
            <Button size="sm" colorScheme="green" mt={2} onClick={onClickSell}>
              Sell
            </Button>
          </>
        ) : (
          <Text display="inline-block">
            {/* wei to ether */}
            {web3.utils.fromWei(Number(myAnimalPrice), "ether")} Matic
          </Text>
        )}
      </Box>
    </Box>
  );
};
