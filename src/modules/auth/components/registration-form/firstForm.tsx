import { Button } from '@/shadcn/components/ui/button';
import React from 'react';
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/shadcn/components/ui/card';
import { cn } from '@/shadcn/lib/utils';

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
    <div className='flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-10'>
      <Card className='glass-panel w-full max-w-3xl border-primary/20 shadow-glow-sm'>
        <CardHeader className='space-y-3 text-center'>
          <div className='mx-auto flex items-center justify-center gap-2'>
            <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
              Step 1 / 2
            </span>
            <Sparkles className='h-4 w-4 text-primary' />
          </div>
          <CardDescription className='text-xs font-medium uppercase tracking-wide text-primary'>
            Onboarding
          </CardDescription>
          <h1 className='text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
            {t('onboarding.first_form_title')}
          </h1>
          <p className='text-sm text-muted-foreground'>
            Choose the role that fits you best — you can refine this later.
          </p>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap justify-center gap-3'>
            {companyRegistrationFormFieldsState[0].profession.map(
              (item, index) => (
                <button
                  key={`prof-${index}-${item.value}`}
                  type='button'
                  onClick={() => handleCheckboxChange(index)}
                  className={cn(
                    'flex max-w-[min(100%,280px)] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200',
                    item.marked
                      ? 'border-primary/60 bg-primary/15 shadow-glow-sm ring-1 ring-primary/30'
                      : 'border-border/80 bg-background/40 hover:border-primary/40 hover:bg-primary/5'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-colors',
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
            disabled
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Prev
          </Button>
          <Button
            className='w-full rounded-xl shadow-glow-sm sm:w-auto'
            onClick={() => setSelectCompanyForm(2)}
          >
            Next
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FirstForm;
