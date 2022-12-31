import { Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { BASE_URL } from "../../constants/url";
import { GlobalContext } from "../../contexts/GlobalContext";
import { goToCreateRecipePage, goToLoginPage } from "../../routes/coordinator";
import RecipeCard from "./RecipeCard";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const context = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.isAuth) {
      goToLoginPage(navigate);
    }
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("cookenu-token"),
        },
      };
      const response = await axios.get(`${BASE_URL}/recipe/all`, config);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Flex flexDir={"column"} paddingTop={5}>
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          marginX={20}
          marginTop={10}
        >
          <Heading>Recipes</Heading>
          <Button
            colorScheme="blue"
            onClick={() => goToCreateRecipePage(navigate)}
          >
            Create new recipe
          </Button>
        </Flex>
        <Flex flexWrap={"wrap"} gap={10} justifyContent={"center"} margin={20}>
          {recipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
