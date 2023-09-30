import React from 'react'
import { Textarea } from '@chakra-ui/react'
import { CustomTextareaProps } from './types'
import he from 'he'

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  className,
  register,
  value,
  ...props
}) => {

  // React автоматически экранирует специальные символы HTML, такие как <, >, &,
  // чтобы они были отображены как обычный текст, а не интерпретировались как часть HTML-разметки.
  // Например, если пользователь вводит <script>alert("XSS")</script> в поле ввода,
  // React преобразует его в &lt;script&gt;alert("XSS")&lt;/script&gt;
  //
  // Однако, в рамках задачи YAN-61 добавил явное экранирование вводимых данных.

  const sanitizedValue = value ? he.encode(String(value)) : ''

  return <Textarea {...props} value={sanitizedValue} {...register} className={className} />
}

export default CustomTextarea
