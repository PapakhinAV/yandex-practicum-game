import { FC, useState } from 'react'
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
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { getThemeColors } from '../../App/constants'

const Leaderboard: FC = () => {
  const [cursor, setCursor] = useState(0)
  const [ ratingFieldName, setRatingFieldName ] = useState('score')
  const user = useSelector((state: IRootState) => state.app.user!)
  const { data, isLoading } = useGetLeaderboardQuery({
    cursor,
    ratingFieldName,
    limit: 10,
  })
  const getHeaderButton = (text: string, field: string) => (
    <Button
      variant='unstyled'
      background={'none'}
      color={ratingFieldName === field ? `${themeColors.INVERTED_TEXT}` : `${themeColors.INVERTED_TEXT}`}
      pl={0}
      onClick={() => setRatingFieldName(field)}
    >
      {text}
      {ratingFieldName === field 
        ? <TriangleDownIcon color={`${themeColors.INVERTED_TEXT}`} />
        : <TriangleDownIcon color={`${themeColors.INVERTED_BACKGROUND}`} />
      }
    </Button>
  )

  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  return (
    <>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
      <Box
        display="grid"
        borderTop='2px solid #ffffff85'
        borderBottom='2px solid #00000085'
        background={`${themeColors.BACKGROUND}`}
        backdropFilter="auto"
        backdropBlur='15px'
        width={700}
        gap={30}
        position="absolute"
        top="50%"
        left="50%"
        marginRight="-50%"
        transform="translate(-50%, -50%)"
        borderRadius="12px"
        justifyContent="center"
        padding='60px 70px'
      >
        <TableContainer>
          <Table
            size='sm'
            color={`${themeColors.TEXT}`}
            fontFamily='Rubik'
          >
            <TableCaption placement="top">
              <Heading
                color={`${themeColors.TEXT}`}
              >Таблица лидеров</Heading>
            </TableCaption>
            <Thead background={`${themeColors.INVERTED_BACKGROUND}`}>
              <Tr>
                <Th borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}></Th>
                <Th borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}>
                  {getHeaderButton('Имя пользователя', 'username')}
                </Th>
                <Th borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}>
                  {getHeaderButton('Счет', 'score')}
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
                  <Tr
                    key={index}
                    backgroundColor={user.id === item.data.id ? 'blue.100' : undefined}
                    color={user.id === item.data.id ? 'black' : undefined}
                  >
                    <Td borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}>{index + 1}</Td>
                    <Td borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}>{item.data.username}</Td>
                    <Td borderBottomColor={`${themeColors.INVERTED_BACKGROUND}`}>{item.data.score}</Td>
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
    </>
  )
}

export default Leaderboard
