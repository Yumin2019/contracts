import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { mintAnimalTokenContract } from "../contracts";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });
      console.log(response);
      if (Number(response.status) === 1) {
        const balanceLength = Number(
          await (mintAnimalTokenContract.methods.balanceOf as any)(
            account
          ).call()
        );

        const animalTokenId = await (
          mintAnimalTokenContract.methods.tokenOfOwnerByIndex as any
        )(account, balanceLength - 1).call();

        const animalType = await (
          mintAnimalTokenContract.methods.animalTypes as any
        )(animalTokenId).call();

        console.log(`${animalType}`);
        setNewAnimalType(`${animalType}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex
        w="full"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Box>
          {newAnimalType ? (
            <AnimalCard animalType={newAnimalType}></AnimalCard>
          ) : (
            <Text>let's mint animal card</Text>
          )}
        </Box>
        <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
          Mint
        </Button>
      </Flex>
    </>
  );
};

export default Main;
