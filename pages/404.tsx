// 404.js
import { Box, Button, Center } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
    return <>
        <Center fontSize="24px" bg="tomato" h='200px' w="100%" color='white'>
            404 - Page Not Found
        </Center>

        <Box textAlign="center">
            <Link href="/shows">
                <Button mt="20px" textAlign={"center"} colorScheme='teal' variant='outline'>
                    Back to Home
                </Button>
            </Link>
        </Box>
    </>
}