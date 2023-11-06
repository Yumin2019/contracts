import React, { FC } from "react";
import { AspectRatio, Image } from "@chakra-ui/react";

interface AnimalCardProps {
  animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
  return (
    <Image w={200} h={200} src={`images/${animalType}.png`} alt="AnimalCard" />
  );
};

export default AnimalCard;
