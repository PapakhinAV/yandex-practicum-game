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
import { EColors } from '../../../../App/constants'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../../../core/Router/ERoutes'
import type { Topic } from '../../types'

interface ForumTableComponentProps {
  topicsData: Topic[];
}

const ForumTable: FC<ForumTableComponentProps> = ({ topicsData }) => {

  const navigate = useNavigate()
  
  return (
    <Table w='full'>
      <Thead 
        position="sticky" 
        top={0} 
        bgColor={EColors.WHITE}
      >
        <Tr>
          <Th minW='90%'>Тема</Th>
          <Th isNumeric>Ответы</Th>
        </Tr>
      </Thead>
      <Tbody>
        {topicsData.map(topic => {
          const { id, title, replies } = topic
          return (
            <Tr 
              key={`topic-${id}`} 
              onClick={() => navigate(`${ERoutes.FORUM}/${id}`)}>
              <Td>
                <Text 
                  maxW="lg" 
                  noOfLines={1}
                >
                  {title}
                </Text>
              </Td>
              <Td isNumeric>{replies}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default ForumTable
