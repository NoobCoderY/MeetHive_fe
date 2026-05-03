import { useTranslations } from 'use-intl';
import { Mail } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';

const ConfirmationTempalte = () => {
  const t = useTranslations();
  return (
    <Card className='glass-panel border-primary/20 shadow-glow-sm'>
      <CardHeader className='space-y-4 text-center'>
        <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10'>
          <Mail className='h-7 w-7 text-primary' />
        </div>
        <CardTitle className='text-balance text-2xl font-bold tracking-tight md:text-3xl'>
          {t('signup.Confirmation_template_title')}
        </CardTitle>
        <CardDescription className='text-base font-medium text-primary'>
          {t('signup.Confirmation_template_subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-center text-sm leading-relaxed text-muted-foreground'>
          If you don&apos;t see the message, check spam or try resending from the sign-in page.
        </p>
      </CardContent>
    </Card>
  );
};

export default ConfirmationTempalte;
