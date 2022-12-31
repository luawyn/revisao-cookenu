import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  const logout = () => {
    window.localStorage.removeItem("cookenu-token");
    context.setIsAuth(false);
    goToLoginPage(navigate);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={20}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={700}>Cookenu</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={3}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => logout()}
                    _hover={{
                      bg: "red.400",
                      color: "white",
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
