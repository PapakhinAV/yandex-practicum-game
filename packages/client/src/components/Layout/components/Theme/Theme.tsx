import { ChangeEvent, FC } from 'react'
import { useGetAllThemesQuery, useUpdateUserThemeMutation } from '../../../../api/theme'
import { Box, Select } from '@chakra-ui/react'
import { IThemeProps } from './types'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/types'
import { getThemeColors } from '../../../../App/constants'

const Theme: FC<IThemeProps> = ()=>{
  const { data: allThemes } = useGetAllThemesQuery()
  const [updateUserTheme] = useUpdateUserThemeMutation()
  const userId = useSelector((state: IRootState) => state.app.user)?.id
  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  if(!allThemes) return null

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

    const theme = event.target.value
    if (userId && theme && theme !== currentTheme) {
      updateUserTheme({userId, theme})
    }
  }

  return (
    <Box position={'absolute'} right='10px' top='10px' zIndex={1}>
      <Select
        value={currentTheme}
        size='sm'
        height='40px'
        background={`${themeColors.BACKGROUND}`}
        backdropFilter='auto'
        backdropBlur='10px'
        onChange={onChange}
        borderRadius='6px'
        borderColor={`${themeColors.CONTRAST_BACKGROUND}`}
      >
        {allThemes.map(el=><option key={el.description} value={el.theme}>{el.description}</option>)}
      </Select>
    </Box>
  )
}

export default Theme
