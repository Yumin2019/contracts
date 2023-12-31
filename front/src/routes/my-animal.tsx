import React, { FC, useEffect, useState } from "react";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
} from "../contracts";
import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { MyAnimalCard, IMyAnimalCard } from "../components/MyAnimalCard";

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = Number(
        await (mintAnimalTokenContract.methods.balanceOf as any)(account).call()
      );

      if (balanceLength === 0) return;

      const tempAnimalCardArray: IMyAnimalCard[] = [];
      const response = await (
        mintAnimalTokenContract.methods.getAnimalTokens as any
      )(account).call();

      response.map((v: any) => {
        tempAnimalCardArray.push({
          animalTokenId: v.animalTokenId,
          animalType: v.animalType,
          animalPrice: v.animalPrice,
        });
      });

      setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await (
        mintAnimalTokenContract.methods.isApprovedForAll as any
      )(account, saleAnimalTokenAddress).call();
      console.log(response);

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickApproved = async () => {
    try {
      if (!account) return;
      const response = await (
        mintAnimalTokenContract.methods.setApprovalForAll as any
      )(saleAnimalTokenAddress, !saleStatus).send({ from: account });

      if (Number(response.status) == 1) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getAnimalTokens();
  }, [account]);

  useEffect(() => {
    console.log(animalCardArray);
  }, [animalCardArray]);

  return (
    <>
      <Flex alignItems="center">
        <Text display="inline-block">
          Sale Status: {saleStatus ? "True" : "False"}
        </Text>
        <Button
          size="xs"
          ml={2}
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproved}
        >
          {saleStatus ? "Cancel" : "Approve"}
        </Button>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap="8" mt={4}>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <MyAnimalCard
                key={i}
                animalTokenId={v.animalTokenId}
                animalType={v.animalType}
                animalPrice={v.animalPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyAnimal;
