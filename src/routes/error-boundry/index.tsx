
import {  FallbackProps } from 'react-error-boundary';
import NotFoundImg from '../../assets/writer.svg'

function ErrorFallback({  resetErrorBoundary }:FallbackProps) {
  return (
    <div className='error-page'>
      <img
        src={NotFoundImg}
        alt='Page not found'
      />
      <p className='error-msg'>
        Something went wrong. Try clicking the refresh page button to reload the
        application.{' '}
        <button
          className='btn'
          onClick={resetErrorBoundary}
        >
          Refresh page
        </button>
      </p>
    </div>
  );
}

export default ErrorFallback


