import { useTranslations } from 'use-intl';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='text-center p-8 error_card_background shadow-lg rounded-lg'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='mt-4 text-xl text-gray-600'>{t('error_page.title')}</p>
        <p className='mt-2 text-gray-500'>{t('error_page.description')}</p>
        <Link
          to='/'
          className='mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500'
        >
          {t('error_page.back_to_home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 
