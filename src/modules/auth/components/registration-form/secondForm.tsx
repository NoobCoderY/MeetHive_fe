import React, { useEffect } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { Check, ChevronLeft, Layers } from 'lucide-react';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';
import { useSaveOnboardingMutation } from '../../services/authApi';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/shadcn/components/ui/card';
import { cn } from '@/shadcn/lib/utils';

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
        error: string;
        data: { error: string };
      };

      toast({
        title: 'Error',
        description: errorMessage?.error || errorMessage?.data?.error || 'Something went wrong',
        variant: 'destructive',
      });
    }
  }, [isSuccess, error, isError, navigate, t, toast]);

  const handleCheckboxChange = (index: number) => {
    const currentMarkState =
      companyRegistrationFormFieldsState[0].interests[index].marked;
    const markedCount = companyRegistrationFormFieldsState[0].interests.filter(
      (item) => item.marked
    ).length;

    if (!currentMarkState && markedCount >= 3) {
      toast({
        title: 'You can select up to three interests',
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
    <div className='flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-10'>
      <Card className='glass-panel w-full max-w-3xl border-primary/20 shadow-glow-sm'>
        <CardHeader className='space-y-3 text-center'>
          <div className='mx-auto flex items-center justify-center gap-2'>
            <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
              Step 2 / 2
            </span>
            <Layers className='h-4 w-4 text-primary' />
          </div>
          <CardDescription className='text-xs font-medium uppercase tracking-wide text-primary'>
            Interests
          </CardDescription>
          <h1 className='text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
            What interests you most?
          </h1>
          <p className='text-sm text-muted-foreground'>
            Pick up to three focus areas — we use this to tailor your workspace.
          </p>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap justify-center gap-3'>
            {companyRegistrationFormFieldsState[0].interests.map(
              (item, index) => (
                <button
                  key={`int-${index}-${item.value}`}
                  type='button'
                  onClick={() => handleCheckboxChange(index)}
                  className={cn(
                    'flex max-w-[min(100%,320px)] items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200',
                    item.marked
                      ? 'border-primary/60 bg-primary/15 shadow-glow-sm ring-1 ring-primary/30'
                      : 'border-border/80 bg-background/40 hover:border-primary/40 hover:bg-primary/5'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-colors',
                      item.marked
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/35 bg-background/50'
                    )}
                  >
                    {item.marked && <Check className='h-4 w-4' strokeWidth={3} />}
                  </span>
                  <span className='text-sm font-semibold leading-snug text-foreground'>
                    {item.value}
                  </span>
                </button>
              )
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-3 border-t border-border/40 pt-6 sm:flex-row sm:justify-between'>
          <Button
            variant='outline'
            className='w-full rounded-xl border-border/70 sm:w-auto'
            disabled={isSuccess}
            onClick={() => setSelectCompanyForm(1)}
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Prev
          </Button>
          <Button
            className='w-full rounded-xl shadow-glow-sm sm:w-auto'
            disabled={isSuccess}
            onClick={submitForm}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecondForm;
