import Head from 'next/head'
import { Box, useMediaQuery, Card, CardBody, Container, Heading, Stack, Text, Grid, GridItem } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import Link from 'next/link';
import Image from 'next/image'



export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.tvmaze.com/schedule`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}


export default function Home({ data }: any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Container maxW="100vw" maxH="100vh" p="0" bg="#EBEBEB" height="100vh">
      <Head>
        <title> TV Bland - Your personal TV guide </title>
        <meta name="description" content="TV Show and web series database." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box w="100%" pb={{ base: "240px", md: "0" }} h={{ base: "0", md: "45%" }} pl={{ base: "5", md: "20" }} pr={{ base: "5", md: "20" }} pt="16">
        <Text
          color="black"
          fontSize="20"
          fontWeight="extrabold"
        >
          TV Bland
        </Text>

        <Text
          mt="18"
          color="#B7B7B7"
          fontSize="20"
          fontWeight="extrabold"
        >
          TV Show and web series database.
        </Text>
        <Text
          color="#B7B7B7"
          fontSize="20"
          fontWeight="extrabold"
        >
          Create personalized schedules. Episode guide, cast, crew and
        </Text>
        <Text
          color="#B7B7B7"
          fontSize="20"
          fontWeight="extrabold"
        >
          character information.
        </Text>
      </Box>
      <Box w="100%" bg="white">
        <Box w="100%" pl={{ base: "5", md: "20" }} pt={{ base: "5", md: "0" }} pr={{ base: "0", md: "16" }} h="100%" pos="relative" bottom={{ base: "0", md: "150px" }}>
          <Text
            color="black"
            fontSize="20"
            fontWeight="extrabold"
          >
            Last Added Shows
          </Text>

          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }} pt="5" gap={1} bg="transparent" fontSize='sm'>
            {data && data.map((item: any) => {
              return (
                <GridItem key={item.id} w={{ base: "85", md: "80%" }} mr={{ base: "5", md: "0 " }} h="80%">
                  <Link href={'/shows/' + item.show.id + ''}>
                    <Card variant="unstyled" mt={{ base: "0", md: "20px" }} mb={{ base: "5", md: "0" }}>
                      <CardBody>
                        <Image
                          src={item.show.image.medium}
                          alt={item.show.name}
                          width={500}
                          height={500}
                        />
                        <Stack mt={{ base: '3', md: '6' }} spacing='3'>
                          {!isMobile ?
                            <Heading size='sm'>
                              {Array(5)
                                .fill('')
                                .map((_, i) => (
                                  <StarIcon
                                    mr="5px"
                                    key={i}
                                    color={i < item.show.rating.average ? 'gray.500' : 'gray.300'}
                                  />
                                ))}
                            </Heading>
                            : ''}
                          <Text>
                            {item.show.name}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                </GridItem>)
            })}

          </Grid>
        </Box>
      </Box>
      <Box w="100%" h="10%" bg="#EBEBEB" />
    </Container>
  )
}
