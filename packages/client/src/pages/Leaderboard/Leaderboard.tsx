import React, { FC, useState } from 'react'
import { useGetLeaderboardQuery } from '../../api/leaderboard'
import {
  Box,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Spinner,
  Button,
} from '@chakra-ui/react'
import { TriangleDownIcon } from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'

const Leaderboard: FC = () => {
  const [cursor, setCursor] = useState(0)
  const [ ratingFieldName, setRatingFieldName ] = useState('scope')

  const { data, isLoading } = useGetLeaderboardQuery({
    cursor,
    ratingFieldName,
    limit: 10,
  })
  const getHeaderButton = (text: string, field: string) => (
    <Button
      variant="ghost"
      colorScheme={ratingFieldName === field ? 'blue' : 'whiteAlpha'}
      pl={0}
      onClick={() => setRatingFieldName(field)}
    >
      {text}
      {ratingFieldName === field && (
        <TriangleDownIcon color='blue' />
      )}
    </Button>
  )
  return (
    <Box
      display="grid"
      border="12px"
      width={700}
      background="blackAlpha.400"
      gap={30}
      position="absolute"
      top="50%"
      left="50%"
      marginRight="-50%"
      transform="translate(-50%, -50%)"
      borderRadius="4px"
      justifyContent="center"
      padding="20px"
    >
      <TableContainer>
        <Table
          size='sm'
          colorScheme='whiteAlpha'
          color="white"
          fontFamily='Rubic'
        >
          <TableCaption placement="top">
            <Heading
              color="white"
            >Таблица лидеров</Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th color="white"></Th>
              <Th>
                {getHeaderButton('Имя пользователя', 'username')}
              </Th>
              <Th>
                {getHeaderButton('Сложность', 'difficulty')}
              </Th>
              <Th>
                {getHeaderButton('Счет', 'scope')}
              </Th>
            </Tr>
          </Thead>
          {isLoading && (
            <TableCaption>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                alignItems="center"
              />
            </TableCaption>
          )}
          {data && (
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.data.username}</Td>
                  <Td>{item.data.difficulty}</Td>
                  <Td>{item.data.scope}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
          <TableCaption placement="bottom">
            <ReactPaginate
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
              containerClassName="pagination justify-content-center"
              pageCount={10} // Мы не знаем сколько записей, а лишний раз дергать сервис лень
              nextLabel=">"
              previousLabel="<"
              onPageChange={event => setCursor(event.selected)}
            />
          </TableCaption>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Leaderboard
