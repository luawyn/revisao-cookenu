import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import { GlobalContext } from "../../contexts/GlobalContext";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (context.isAuth) {
      goToHomePage(navigate);
    }
  });

  const signup = async () => {
    try {
      setIsLoading(true);
      const body = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      const response = await axios.post(`${BASE_URL}/user/signup`, body);
      window.localStorage.setItem("cookenu-token", response.data.token);
      setIsLoading(false);
      context.setIsAuth(true);
      goToHomePage(navigate);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool recipes ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={form.name}
                onChange={onChangeForm}
                name="name"
                autoComplete="off"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={form.email}
                onChange={onChangeForm}
                name="email"
                autoComplete="off"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={form.password}
                onChange={onChangeForm}
                name="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={signup}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {isLoading ? <Spinner /> : "Create an Account"}
              </Button>
            </Stack>
            <Stack paddingTop={5} paddingBottom={5}>
              <Text textAlign={"center"}>
                Already have an account?
                <Link color="blue.400" onClick={() => goToLoginPage(navigate)}>
                  {" "}
                  Sign In
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupPage;
