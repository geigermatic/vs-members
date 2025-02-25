import { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-50 text-red-700 p-4 rounded-md">
    {message}
  </div>
); 