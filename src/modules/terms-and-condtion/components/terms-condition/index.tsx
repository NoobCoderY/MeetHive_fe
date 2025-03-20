import { useTranslations } from 'use-intl';
import './index.css';

const TermsAndCondition = () => {
  const t = useTranslations();

  return (
    <div className='px-6'>
      <h1 className='lg:text-2xl md:text-xl sm:lg text-center font-bold leading-7'>
        {t('agbs.general_terms.title')}
      </h1>
      <div className='rounded-[12px] terms_and_conditon_background px-4 pt-6 pb-14 mt-4'>
        <p className='font-semibold text-[1.15rem]'>
          {t('agbs.general_terms.description')}
        </p>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            1 . {t('agbs.general_terms.line_1')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>1.1 {t('agbs.general_terms.line_2')}</p>
            <p>1.2 {t('agbs.general_terms.line_3')}</p>
            <p>1.3 {t('agbs.general_terms.line_4')}</p>
            <p>1.4 {t('agbs.general_terms.line_5')}</p>
            <p>1.5 {t('agbs.general_terms.line_6')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            2 . {t('agbs.Restrictions_use.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>2.1 {t('agbs.Restrictions_use.line_1.title')}</p>
            <div className='pl-4 mt-2 flex flex-col gap-3'>
              <p>2.1.1 {t('agbs.Restrictions_use.line_1.line_1')}</p>
              <p>2.1.2 {t('agbs.Restrictions_use.line_1.line_2')}</p>
              <p>2.1.3 {t('agbs.Restrictions_use.line_1.line_3')}</p>
              <p>2.1.4 {t('agbs.Restrictions_use.line_1.line_4')}</p>
              <p>2.1.5 {t('agbs.Restrictions_use.line_1.line_5')}</p>
              <p>2.1.6 {t('agbs.Restrictions_use.line_1.line_6')}</p>
            </div>
            <p>2.2 {t('agbs.Restrictions_use.line_2')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            3 . {t('agbs.fees_billing.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>3.1 {t('agbs.fees_billing.line_1')}</p>
            <p>3.2 {t('agbs.fees_billing.line_2')}</p>
            <p>3.3 {t('agbs.fees_billing.line_3')}</p>
            <p>3.4 {t('agbs.fees_billing.line_4')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            4 . {t('agbs.intellectual_property.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>4.1 {t('agbs.intellectual_property.line_1')}</p>
            <p>4.2 {t('agbs.intellectual_property.line_2')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            5 . {t('agbs.data_protection.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>
              5.1. <span>{t('agbs.data_protection.line_1.section_1')}</span>{' '}
              <a
                href={'https://www.just-agile.com/datenschutz'}
                className='text-xl mx-1 font-bold'
              >
                {t('agbs.data_protection.line_1.link_1')}
              </a>
              <span>{t('agbs.data_protection.line_1.section_2')}</span>
              <a
                href={'https://www.just-agile.com/datenschutz'}
                className='text-xl mx-1 font-bold'
              >
                {t('agbs.data_protection.line_1.link_1')}
              </a>
            </p>
            <p>
              5.2.
              <span>
                {t('agbs.data_protection.line_2')}{' '}
                <a
                  href={'https://www.just-agile.com/datenschutz'}
                  className='text-xl mx-1 font-bold'
                >
                  {t('agbs.data_protection.line_1.link_1')}
                </a>
              </span>
            </p>
            <p>{t('agbs.data_protection.line_3')} </p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>6 . {t('agbs.changes.title')}</p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>6.1 {t('agbs.changes.line_1')}</p>
            <p>6.2 {t('agbs.changes.line_2')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            7 . {t('agbs.limitation.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>7.1 {t('agbs.limitation.line_1')}</p>

            <p>7.2 {t('agbs.limitation.line_2')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            8 . {t('agbs.changes_terms.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>8.1 {t('agbs.changes_terms.line_1')}</p>
            <p>8.2 {t('agbs.changes_terms.line_2')}</p>
            <p>8.3 {t('agbs.changes_terms.line_3')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            9 . {t('agbs.changes_terms.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>
              9.1{' '}
              <span>
                {t('agbs.termination.line_1.section_1')}{' '}
                <a
                  href={'mailto:info@just-agile.com'}
                  className='font-semibold text-lg'
                >
                  info@just-agile.com
                </a>
                <span> {t('agbs.termination.line_1.section_2')}</span>
              </span>
            </p>
            <p>9.2 {t('agbs.termination.line_2')}</p>
            <p>9.3 {t('agbs.termination.line_3')}</p>
            <p>9.4 {t('agbs.termination.line_4')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            10 . {t('agbs.applicable_law.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>10.1 {t('agbs.applicable_law.line_1')}</p>
            <p>10.2 {t('agbs.applicable_law.line_1')}</p>
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-md font-semibold'>
            11 . {t('agbs.Severability_clause.title')}
          </p>

          <div className='pl-4 mt-2 flex flex-col gap-3'>
            <p>{t('agbs.Severability_clause.description')}</p>
          </div>
        </div>
      </div>
      <div className='mt-8 font-bold text-center text-2xl mb-4'>
        <h1>© Copyright info@justagile. All rights reserved.</h1>
      </div>
    </div>
  );
};

export default TermsAndCondition;
