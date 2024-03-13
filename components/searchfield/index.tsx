import { forwardRef } from 'react'
import Image from 'next/image'

import styles from '../textfield/Textfield.module.css'

interface SearchfieldProps {
  size?: 'medium' | 'small'
  name?: string
  defaultValue?: string | number
  value?: string | number
  placeholder: string
  isAutoFocus?: boolean
  isInvalid?: boolean
  helperText?: string

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// const Searchfield = forwardRef(
//   (
//     { size, name, placeholder, defaultValue, value, isAutoFocus, onChange }: SearchfieldProps,
//   ) => {
//     return (
//       <div className={styles.textfield} data-size={size || 'medium'}>
//         {/* <label htmlFor={name} hidden>{label}</label> */}
//         <figure className={styles.prefix}>
//           <Image src="/search.svg" alt="" width={20} height={20} />
//         </figure>
//         <input
//           type="search"
//           id={name}
//           name={name}
//           value={value}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           onChange={onChange}
//           autoFocus={isAutoFocus}
//           autoComplete="off"
//         />
//       </div>
//     )
//   },
// )

// export default Searchfield
