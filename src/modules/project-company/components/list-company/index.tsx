import { JaCheckbox } from '@/shadcn/atoms/ja-checkbox';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';

const ListCompany = () => {
  const t = useTranslations();
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div>
        <h1 className='text-xl font-bold text-center'>
          {t('company.company_listing_page_title')}
        </h1>
        <div className='flex gap-5 mt-4 flex-wrap justify-center items-center'>
          {Array.from({ length: 3 }, (_, index) => index + 1).map((item: any, index: any) => {
            return (
              <div
                key={`${item} + ${index}`}
                className='rounded-[20px] flex gap-3 border-[1px] border-[#fff] items-center justify-center px-4 py-2'
              >
                <JaCheckbox
                  className='!border-[#fff] !h-6 !w-6'
                  checked={item.marked}
                />
                <p className='text-[16px] font-semibold '>Company 1</p>
              </div>
            );
          })}
        </div>
        <div className='flex item-center gap-[10rem] mt-10 justify-center'>
          <Button className='text-lg p-3 w-[20%]  border-[1px] border-[#9c9b9b]'>
            {t('company.company_enter_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListCompany;
