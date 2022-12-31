import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  ScaleFade,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { goToDetailsPage } from "../../routes/coordinator";

const RecipeCard = (props) => {
  const navigate = useNavigate();
  const { recipe } = props;
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Center py={12}>
        <Box
          onClick={() => goToDetailsPage(navigate, recipe.id)}
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          cursor={"pointer"}
          _hover={{
            transform: "scale(1.1)",
            transition: "all .3s ease",
          }}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${recipe.imageUrl})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={recipe.imageUrl}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {recipe.title}
            </Heading>
          </Stack>
        </Box>
      </Center>
    </ScaleFade>
  );
};

export default RecipeCard;
