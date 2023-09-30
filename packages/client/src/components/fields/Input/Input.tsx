import React from 'react'
import { Input } from '@chakra-ui/react'
import { CustomInputProps } from './types'
import he from 'he'


const CustomInput: React.FC<CustomInputProps> = ({ className, register, value = '', ...props }) => {

  // React автоматически экранирует специальные символы HTML, такие как <, >, &,
  // чтобы они были отображены как обычный текст, а не интерпретировались как часть HTML-разметки.
  // Например, если пользователь вводит <script>alert("XSS")</script> в поле ввода,
  // React преобразует его в &lt;script&gt;alert("XSS")&lt;/script&gt;
  //
  // Однако, в рамках задачи YAN-61 добавил явное экранирование вводимых данных.

  const sanitizedValue = value ? he.encode(String(value)) : ''

  return <Input bg={props.backgroundColor || 'white'} {...props} {...register} value={sanitizedValue} className={className} />
}

export default CustomInput
