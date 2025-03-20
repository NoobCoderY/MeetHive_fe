import { Button } from '@/shadcn/components/ui/button';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { JaCheckbox } from '@/shadcn/atoms/ja-checkbox';

interface IFirstForm {
  setSelectCompanyForm: React.Dispatch<React.SetStateAction<number>>;
  setCompanyRegistrationFormFieldsState: React.Dispatch<
    React.SetStateAction<
      {
        profession: {
          value: string;
          marked: boolean;
        }[];
        interests: {
          value: string;
          marked: boolean;
        }[];
      }[]
    >
  >;
  companyRegistrationFormFieldsState: {
    profession: {
      value: string;
      marked: boolean;
    }[];
    interests: {
      value: string;
      marked: boolean;
    }[];
  }[];
}

const FirstForm = ({
  setSelectCompanyForm,
  setCompanyRegistrationFormFieldsState,
  companyRegistrationFormFieldsState,
}: IFirstForm) => {
  const t = useTranslations();
  /**
   * Updates the state of the companyRegistrationFormFieldsState array by toggling the 'marked' property of the profession object at the specified index.
   *
   * @param {number} index - The index of the profession object in the profession array.
   * @return {void} This function does not return anything.
   */

  const handleCheckboxChange = (index: number) => {
    const currentMarkState =
      companyRegistrationFormFieldsState[0].profession[index].marked;

    setCompanyRegistrationFormFieldsState((prevState) => {
      const newState = [...prevState];

      newState[0].profession.forEach((item, idx) => {
        if (idx !== index) {
          item.marked = false;
        }
      });

      newState[0].profession[index].marked = !currentMarkState;

      return newState;
    });
  };

  return (
    <div className='flex justify-center items-center h-[80vh] px-4'>
      <div>
        <h1 className='sm:text-lg lg:text-xl text-md font-bold text-center'>
          {t('onboarding.first_form_title')}
        </h1>
        <div className='flex sm:gap-5 lg:gap-5 gap-3 mt-4 flex-wrap justify-center  items-center'>
          {companyRegistrationFormFieldsState[0].profession.map(
            (item, index) => {
              return (
                <div
                  key={`${item} + ${index}`}
                  className='rounded-[20px] flex gap-3 border-[1px] border-[#fff] items-center justify-center sm:px-4 sm:py-2 lg:px-4 lg:py-2 px-3 py-2'
                >
                  <JaCheckbox
                    className='!border-[#fff] sm:!h-6 sm:!w-6 lg:!w-6 lg:!h-6 !w-4 !h-4'
                    checked={item.marked}
                    onClick={() => handleCheckboxChange(index)}
                  />
                  <p className='sm:text-[14px] lg:text-[16px] text-[12px] font-semibold '>
                    {item.value}
                  </p>
                </div>
              );
            }
          )}
        </div>
        <div className='flex item-center sm:gap-[7rem] lg:gap-[10rem] gap-[5rem] mt-10 justify-center'>
          <Button
            variant={'outline'}
            className='text-lg p-3 sm:w-[20%] lg:w-[10%] w-[30%]'
            disabled
          >
            <ChevronLeft />
            Prev
          </Button>
          <Button
            variant={'outline'}
            className='text-lg p-3 sm:w-[20%] lg:w-[10%] w-[30%] bg-transparent border-[1px] border-[#9c9b9b]'
            onClick={() => {
              setSelectCompanyForm(2);
            }}
          >
            <ChevronRight />
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstForm;
