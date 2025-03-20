import React, { useEffect, useState } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';
import { companyRegistrationFormFields } from '../../utils';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';
import { useSaveOnboardingMutation } from '../../services/authApi';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { JaCheckbox } from '@/shadcn/atoms/ja-checkbox';
import { useNavigate } from 'react-router-dom';

interface ISecondForm {
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

const SecondForm = ({
  setSelectCompanyForm,
  companyRegistrationFormFieldsState,
  setCompanyRegistrationFormFieldsState,
}: ISecondForm) => {
  const { toast } = useToast();
  const t = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAddProjectButton, setShowAddProjectButton] = useState(false);
  const [saveOnboarding, { isSuccess, isError, error }] =
    useSaveOnboardingMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const submitForm = () => {
    saveOnboarding({
      profession: companyRegistrationFormFieldsState[0].profession
        .filter((item) => item.marked)
        .map((item) => item.value),
      interests: companyRegistrationFormFieldsState[0].interests
        .filter((item) => item.marked)
        .map((item) => item.value),
      userId: user?.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: t('onboarding.onboarding_success'),
      });
      navigate('/project/create');
    }
      if (isError) {
        
        
        const errorMessage = error as {
          error: string, data: {
            error: string;
        } };
       

        toast({
          title: 'Error',
          description: errorMessage.error || error.data.error,
          variant: 'destructive',
        });
      
    }
  }, [isSuccess, error, isError]);

  

  /**
   * Handles the change event of a checkbox. Toggles the 'marked' property of the interest object at the specified index.
   *
   * @param {number} index - The index of the interest object in the interests array.
   * @return {void} This function does not return anything.
   */
  const handleCheckboxChange = (index: number) => {
    const currentMarkState =
      companyRegistrationFormFieldsState[0].interests[index].marked;
    const markedCount = companyRegistrationFormFieldsState[0].interests.filter(
      (item) => item.marked
    ).length;

    if (!currentMarkState && markedCount >= 3) {
      toast({
        title: 'You can select up to three professions',
        variant: 'destructive',
      });
      return;
    }
    setCompanyRegistrationFormFieldsState((prevState) => {
      const newState = [...prevState];
      newState[0].interests[index].marked =
        !newState[0].interests[index].marked;
      return newState;
    });
  };

  return (
    <div className='flex justify-center items-center h-[80vh] px-4'>
      <div>
        <h1 className='sm:text-lg lg:text-xl text-2xl  font-bold text-center'>
          What interests you most?
        </h1>
        <div className='flex  sm:gap-5 lg:gap-5 gap-4 mt-4 flex-wrap justify-center items-center px-3'>
          {companyRegistrationFormFields[0].interests.map((item, index) => {
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
          })}
        </div>
        <div className='flex item-center  sm:gap-[7rem] lg:gap-[10rem] gap-[5rem] mt-10 justify-center'>
          <Button
            variant={'outline'}
            className='text-md p-3 sm:w-[20%] lg:w-[8%] w-[30%]'
            disabled={isSuccess}
            onClick={() => {
              setSelectCompanyForm(1);
            }}
          >
            <ChevronLeft />
            Prev
          </Button>
          {showAddProjectButton ? (
            <div
              className='flex justify-center items-center'
              onClick={() => {
                setSelectCompanyForm(3);
              }}
            >
              <Button className='text-sm '>
                <Plus className='mr-2' />
                Add Project
              </Button>
            </div>
          ) : (
            <Button
              type='submit'
              onClick={() => {
                submitForm();
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondForm;
