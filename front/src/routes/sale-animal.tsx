import { Grid } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { IMyAnimalCard } from "../components/MyAnimalCard";
import { mintAnimalTokenContract, saleAnimalTokenContract } from "../contracts";
import SaleAnimalCard from "../components/SaleAnimalCard";

interface SaleAnimalProps {
  account: string;
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  const [saleAnimalCardArray, setSaleAnimalCardArray] =
    useState<IMyAnimalCard[]>();

  const getOnSaleAnimalTokens = async () => {
    try {
      const onSaleAnimalTokenArrayLegnth = Number(
        await (
          saleAnimalTokenContract.methods.getOnSaleAnimalTokenArrayLength as any
        )().call()
      );

      const tempOnSaleArray: IMyAnimalCard[] = [];
      for (let i = 0; i < onSaleAnimalTokenArrayLegnth; ++i) {
        const animalTokenId = Number(
          await (saleAnimalTokenContract.methods.onSaleAnimalTokenArray as any)(
            i
          ).call()
        );
        const animalType = await (
          mintAnimalTokenContract.methods.animalTypes as any
        )(animalTokenId).call();

        const animalPrice = await (
          saleAnimalTokenContract.methods.animalTokenPrices as any
        )(animalTokenId).call();

        tempOnSaleArray.push({
          animalTokenId: `${animalTokenId}`,
          animalType,
          animalPrice,
        });
      }

      setSaleAnimalCardArray(tempOnSaleArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  return (
    <Grid mt={4} templateColumns="repeat(4, 1tr)" gap={8}>
      {saleAnimalCardArray &&
        saleAnimalCardArray.map((v, i) => {
          return (
            <SaleAnimalCard
              key={i}
              animalType={v.animalType}
              animalPrice={v.animalPrice}
              animalTokenId={v.animalTokenId}
              account={account}
              getOnSaleAnimalTokens={getOnSaleAnimalTokens}
            />
          );
        })}
    </Grid>
  );
};

export default SaleAnimal;
