import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form';
import JAButton from '@/shadcn/atoms/ja-button';
import { Input } from '@/shadcn/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordVerifyMutation } from '../../services/authApi';
import { toast } from '@/shadcn/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';

interface IUpdatePasswordForm {
  email: string;
}

const UpdatePasswordEmailForm = () => {
  const t = useTranslations();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgetPasswordVerifyMutation();
  const updateFormSchema = z
    .object({
      email: z
        .string()
        .email({ message: t('signup.email_validation') })
        .min(1, { message: t('signup.email_required') }),
    })
    .required();

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: IUpdatePasswordForm) => {
      const data = await forgotPassword(values);
      if (data.error?.data.error) {
        toast({
          title: data.error.data.error,
          variant: 'destructive',
        });
      } else {
        navigate('/confirmation');
      }
   
  };
  const goToSignupPage = () => navigate(`/signup`);
  return (
    <Card className='glass-panel border-primary/20 shadow-glow-sm'>
      <CardHeader className='space-y-1 pb-2'>
        <CardTitle className='text-2xl font-bold tracking-tight md:text-3xl'>
          {t('signup.update_password_title')}
        </CardTitle>
        <CardDescription>
          We&apos;ll email you a link to update your password.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 pt-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground/90'>{t('signup.email_label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('signup.email_label')}
                      className='h-11 rounded-xl border-border/80 bg-background/50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <JAButton
              type='submit'
              variant='default'
              className='!w-full'
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('forgot_password.send_reset_mail')}
            </JAButton>
          </form>
        </Form>
        <p className='text-center text-sm text-muted-foreground'>
          {t('login.no_account')}{' '}
          <Button
            variant='link'
            className='h-auto p-0 font-semibold text-primary'
            onClick={goToSignupPage}
          >
            {t('login.signup_label')}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordEmailForm;
