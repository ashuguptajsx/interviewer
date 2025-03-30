import React from 'react'
import { Controller } from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FieldValues, Control, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  control : Control<T>;
  name : Path<T>;
  label : string;
  placeholder : string;
  type? : "text" | "email" | "password" | "file"
} 




const FormField =({ name, control, label, placeholder, type = "text" }: FormFieldProps<T>)=> {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
              <Input className='input' placeholder={placeholder} {...field} type={type} />
            </FormControl>
        
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default FormField
