import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import * as m from 'motion/react-client';
import { AuthInput } from './AuthInput';
import { UseFormRegister } from 'react-hook-form';
import { LoginFormInputs } from './Login';

interface TogglePasswordProps {
  name?: keyof LoginFormInputs;
  title?: string;
  password?: string;
  setPassword?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  register?: UseFormRegister<LoginFormInputs>;
  error?: string;
}

export const TogglePassword = ({
  name,
  title,
  password,
  setPassword,
  register,
  error,
}: TogglePasswordProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = isVisible ? FaEye : FaEyeSlash;
  return (
    <>
      <div className='relative'>
        <AuthInput InputTitle={title} name={name}>
          <input
            autoComplete={name}
            id={name}
            type={`${isVisible ? 'password' : 'text'}`}
            {...(register && name
              ? register(name, {
                  required: { value: true, message: 'Password is required' },
                })
              : { value: password, onChange: setPassword })}
            className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white `}
          />
          {error && <span className='text-red-500 text-sm'>{error}</span>}
        </AuthInput>

        <m.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='absolute right-4 top-3/4 transform -translate-y-1/2'
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon className='text-gray-500 text-xl cursor-pointer' />
        </m.div>
      </div>
    </>
  );
};
