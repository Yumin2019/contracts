import React, { FC } from "react";
import { Flex, Stack, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Stack h="100vh">
      <Flex
        bg="purple.200"
        p={4}
        justifyContent="space-around"
        alignItems="center"
      >
        <Box>
          <Text fontWeight="bold">H662-Animals</Text>
        </Box>
        <Link to="/">
          <Button size="sm" colorScheme="blue">
            Main
          </Button>
        </Link>
        <Link to="my-animal">
          <Button size="sm" colorScheme="blue">
            My Animal
          </Button>
        </Link>
      </Flex>
      <Flex
        direction="column"
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Stack>
  );
};

export default Layout;
