import DOMPurify from 'dompurify'

export const sanitize = (value = '') => {
  return  DOMPurify.sanitize(value)
}
