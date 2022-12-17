import Head from 'next/head'
import { Box, Avatar, useMediaQuery, Card, CardBody, Container, Heading, Stack, Text, Grid, GridItem, Flex } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import Image from 'next/image'


export async function getServerSideProps(context) {

  const { id } = context.query;
  // Fetch data from external API
  const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
  const data = await res.json();

  if (data.name == "Not Found") {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}


export default function Home({ data }) {

  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Container maxW="100vw" maxH="100vh" p="0" bg="#EBEBEB" height="100vh">
      <Head>
        <title> {`${data.name} | TV Bland`} </title>
        <meta name="description" content="TV Show and web series database." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" background={{ base: "#EBEBEB" }} pb={{ base: "20px", md: "0" }} h={{ base: "fit-content", md: "435px" }} pl={{ base: "5", md: "20" }} pr={{ base: "5", md: "20" }} pt="16">
        <Text
          color="black"
          fontSize="20"
          fontWeight="extrabold"
        >
          TV Bland
        </Text>

        <Flex align="center" display={{ base: "inline-block", md: "flex" }}>
          <Flex align="center">
            <Card variant="unstyled" h={{ base: "100%", md: "inherit" }} w={{ base: "100%", md: "200px" }} mr={{ base: "0px", md: "35px" }} mt={{ base: "15px", md: "70px" }} mb={{ base: "5", md: "0" }}>
              <CardBody>
                <Image
                  src={data.image?.original}
                  alt={data.name}
                  width={500}
                  height={500}
                />
              </CardBody>
            </Card>
          </Flex>
          <Flex align="center">
            <Stack spacing='3'>
              <Heading size='sm'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < data.rating.average ? 'gray.500' : 'gray.300'}
                    />
                  ))}
                <Box display="inline-block" mt="4px" ml="15px" verticalAlign="middle">{data.rating.average ? data.rating.average : 'N/A'}/10</Box>
              </Heading>

              <Text fontSize='2xl' lineHeight="normal">
                {data.name}
              </Text>

              <Box fontSize='14' dangerouslySetInnerHTML={{ __html: data.summary }} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box w="100%" minHeight={{ base: "unset", md: "600px" }} pb={{ base: "25px" }} bg="white" pl={{ base: "5", md: "20" }} pr={{ base: "5", md: "20" }}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} pt={{ base: "15px", md: "5" }} position="relative" top={{ md: "80px" }} gap={1} bg="transparent" fontSize='sm'>
          <GridItem w={{ base: "85", md: "80%" }} mr={{ base: "5", md: "0 " }} h="80%">
            <Box><Text fontSize='2xl'>Show Info</Text></Box>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}>
              <Grid display={{ base: "block", md: "grid" }} borderBottom={{ base: 'none', md: "2px solid #000000" }} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} alignItems="center" paddingTop={{ base: "15px" }} paddingBottom={{ base: "15px" }} minHeight={{ base: "unset", md: "70px" }}>
                <GridItem fontWeight="bold">Streamed On</GridItem>
                <GridItem color="grey"> {data.network?.name}</GridItem>
              </Grid>
              <Grid display={{ base: "block", md: "grid" }} borderBottom={{ base: 'none', md: "2px solid #000000" }} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} alignItems="center" paddingTop={{ base: "15px" }} paddingBottom={{ base: "15px" }} minHeight={{ base: "unset", md: "70px" }}>
                <GridItem fontWeight="bold">Schedule</GridItem>
                <GridItem color="grey"> {data.schedule.days.join(", ")}</GridItem>
              </Grid>
              <Grid display={{ base: "block", md: "grid" }} borderBottom={{ base: 'none', md: "2px solid #000000" }} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} alignItems="center" paddingTop={{ base: "15px" }} paddingBottom={{ base: "15px" }} minHeight={{ base: "unset", md: "70px" }}>
                <GridItem fontWeight="bold">Status</GridItem>
                <GridItem color="grey"> {data.status} </GridItem>
              </Grid>
              <Grid display={{ base: "block", md: "grid" }} borderBottom={{ base: 'none', md: "2px solid #000000" }} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} alignItems="center" paddingTop={{ base: "15px" }} paddingBottom={{ base: "15px" }} minHeight={{ base: "unset", md: "70px" }}>
                <GridItem fontWeight="bold">Genres </GridItem>
                <GridItem color="grey"> {data.genres.length == 0 ? 'Not Available' : data.genres.join(", ")}</GridItem>
              </Grid>
            </Grid>
          </GridItem>
          <GridItem pt={{ base: "30px", md: "0px" }} w={{ base: "85", md: "80%" }} mr={{ base: "5", md: "0 " }} h="80%">
            <Box pb={{ base: "15px", md: "0px" }}><Text fontSize='2xl'>Starring</Text></Box>
            <Box maxHeight={{ base: "auto", md: "300px" }} overflowY="auto">
              {data && data._embedded && data._embedded.cast && data._embedded.cast.map((item, index) => {
                return (
                  <Grid borderBottom={{ base: 'none', md: "2px solid #000000" }} key={index} templateColumns={{ base: 'auto 1fr', md: 'repeat(3, 1fr)' }} alignItems="center" pt={{ base: "20px", md: "0px" }} minHeight={{ base: "inherit", md: "70px" }}>
                    {
                      isMobile
                        ?
                        <GridItem rowSpan={2} mr="15px"><Avatar verticalAlign="middle" name={item.person.name} src={item.person.image?.medium} /></GridItem>
                        :
                        <GridItem><Avatar verticalAlign="middle" name={item.person.name} src={item.person.image?.medium} /></GridItem>}

                    <GridItem>{item.person.name}</GridItem>
                    <GridItem color="gray">{item.character.name}</GridItem>
                  </Grid>
                )
              })}
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box w="100%" h="10%" bg="#EBEBEB" />
    </Container>
  )
}
