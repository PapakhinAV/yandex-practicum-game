import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text, 
} from '@chakra-ui/react'
import { FC } from 'react'
import { getThemeColors } from '../../../../App/constants'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../../../core/Router/ERoutes'
import type { Topic } from '../../types'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/types'

interface ForumTableComponentProps {
  topicsData: Topic[];
}

const ForumTable: FC<ForumTableComponentProps> = ({ topicsData }) => {

  const navigate = useNavigate()

  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)
  
  return (
    <Table w='full'>
      <Thead 
        position="sticky" 
        top={0} 
        bgColor={themeColors.INVERTED_BACKGROUND}
      >
        <Tr>
          <Th 
            minW='90%' 
            color={themeColors.INVERTED_TEXT}
            borderBottomColor={themeColors.INVERTED_BACKGROUND}
          > Тема</Th>
          <Th 
            isNumeric
            color={themeColors.INVERTED_TEXT}
            borderBottomColor={themeColors.INVERTED_BACKGROUND}
          > Дата</Th>
        </Tr>
      </Thead>
      <Tbody>
        {topicsData.map(topic => {
          const { id, name, createdAt } = topic
          return (
            <Tr 
              key={`topic-${id}`} 
              onClick={() => navigate(`${ERoutes.FORUM}/${id}`)}>
              <Td borderBottomColor={themeColors.INVERTED_BACKGROUND}>
                <Text 
                  maxW="lg" 
                  noOfLines={1}
                  m={0}
                >
                  {name}
                </Text>
              </Td>
              <Td isNumeric borderBottomColor={themeColors.INVERTED_BACKGROUND}>{createdAt.slice(0,10)}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default ForumTable
