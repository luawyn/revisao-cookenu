import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import { GlobalContext } from "../../contexts/GlobalContext";

const CreateRecipePage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(GlobalContext);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (!context.isAuth) {
      goToLoginPage(navigate);
    }
  });

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createRecipe = async () => {
    try {
      setIsLoading(true);

      const token = window.localStorage.getItem("cookenu-token");

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = {
        title: form.title,
        imageUrl: form.imageUrl,
        description: form.description,
      };

      await axios.post(BASE_URL + "/recipe", body, config);

      setIsLoading(false);
      setForm({
        title: "",
        imageUrl: "",
        description: "",
      });
      goToHomePage(navigate);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.response?.data?.message); // só funciona porque a API devolve uma resposta nos erros
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"800px"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create your recipe</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={form.title}
                onChange={onChangeForm}
                name="title"
                autoComplete="off"
              />
            </FormControl>
            <FormControl id="imageUrl">
              <FormLabel>Link Image</FormLabel>
              <Input
                type="link"
                value={form.imageUrl}
                onChange={onChangeForm}
                name="imageUrl"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                minH="300px"
                type="text"
                value={form.description}
                onChange={onChangeForm}
                name="description"
                autoComplete="off"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={createRecipe}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {isLoading ? <Spinner /> : "Create"}
              </Button>
              <Button onClick={() => goToHomePage(navigate)}>Voltar</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateRecipePage;
