import { ChangeEvent, FC } from 'react'
import { useGetAllThemesQuery, useUpdateUserThemeMutation } from '../../../../api/theme'
import { Box, Select } from '@chakra-ui/react'
import { IThemeProps } from './types'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/types'

const Theme: FC<IThemeProps> = ()=>{
  const { data: allThemes } = useGetAllThemesQuery()
  const [updateUserTheme] = useUpdateUserThemeMutation()
  const userId = useSelector((state: IRootState) => state.app.user)?.id
  const currentTheme = useSelector((state: IRootState) => state.app.theme)

  if(!allThemes) return null

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

    const theme = event.target.value
    if (userId && theme && theme !== currentTheme) {
      updateUserTheme({userId, theme})
    }
  }

  return (
    <Box position={'absolute'} right={4} top={4} >
      <Select value={currentTheme} size="sm" onChange={onChange}>
        {allThemes.map(el=><option key={el.description} value={el.theme}>{el.description}</option>)}
      </Select>
    </Box>
  )
}

export default Theme
