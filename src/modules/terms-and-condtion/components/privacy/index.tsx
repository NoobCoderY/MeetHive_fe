import { useTranslations } from "use-intl";
import '../terms-condition/index.css'

const Privacy = () => {
  const t=useTranslations()
  return (
    <div className='px-6'>
      <h1 className='font-bold text-[2rem] text-center'>
        {t('datenschutz.title')}
      </h1>
      <div className='rounded-[12px] terms_and_conditon_background px-4 pt-6 pb-14 mt-4'>
        <p className='font-semibold text-[1rem]'>{t('datenschutz.line_1')}</p>
        <div className='mt-3'>
          <p className='my-2 font-semibold'>{t('datenschutz.line_2')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_3')}</p>
          </div>

          <p className='my-2 font-semibold'>{t('datenschutz.line_4')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_5')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_6')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_7')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_8')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_9')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_10')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_11')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_12')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_13')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_14')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_15')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_16')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_17')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_18')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_19')}</p>
          </div>
          <p className='my-2 font-semibold'>{t('datenschutz.line_20')}</p>
          <div className='pl-4'>
            <p>{t('datenschutz.line_21')}</p>
          </div>
          <p className='text-center mt-6 font-semibold text-xl'>
            {t('datenschutz.line_22')}
          </p>
        </div>
      </div>
      <div className='mt-8 font-bold text-center text-2xl mb-4'>
        <h1>© Copyright info@justagile. All rights reserved.</h1>
      </div>
    </div>
  );
}

export default Privacy;
