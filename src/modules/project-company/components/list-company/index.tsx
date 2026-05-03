import { Building2, Check } from 'lucide-react';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { cn } from '@/shadcn/lib/utils';

const ListCompany = () => {
  const t = useTranslations();
  return (
    <div className='flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center px-4 py-12'>
      <Card className='glass-panel w-full max-w-3xl border-primary/20 shadow-glow-sm'>
        <CardHeader className='space-y-2 text-center'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10'>
            <Building2 className='h-6 w-6 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('company.company_listing_page_title')}
          </CardTitle>
          <CardDescription>Select a company workspace to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap justify-center gap-3'>
            {Array.from({ length: 3 }, (_, index) => index + 1).map((item, index) => (
              <button
                key={`company-${index}`}
                type='button'
                className={cn(
                  'flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200',
                  'border-border/80 bg-background/40 hover:border-primary/40 hover:bg-primary/5'
                )}
              >
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-muted-foreground/35 bg-background/50' />
                <span className='text-sm font-semibold text-foreground'>Company {item}</span>
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center border-t border-border/40 pt-6'>
          <Button className='rounded-xl px-8 shadow-glow-sm'>
            <Check className='mr-2 h-4 w-4' />
            {t('company.company_enter_btn')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListCompany;
