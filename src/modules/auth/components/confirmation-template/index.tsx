import { useTranslations } from 'use-intl';

const ConfirmationTempalte = () => {
  const t = useTranslations();
  return (
    <div className='flex justify-center items-center h-[90%]  flex-col gap-1'>
      <p className='text-2xl text-center font-semibold'>
        {' '}
        {t('signup.Confirmation_template_title')}
      </p>
      <p className='text-lg font-semibold underline'>
        {t('signup.Confirmation_template_subtitle')}
      </p>
    </div>
  );
};

export default ConfirmationTempalte;
