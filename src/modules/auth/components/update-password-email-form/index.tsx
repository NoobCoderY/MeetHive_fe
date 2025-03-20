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
    <div className='w-full'>
      <div>
        <h1 className='text-4xl mb-2 font-light'>
          {t('signup.update_password_title')}
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.email_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('signup.email_label')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='!mt-[1.5rem]'>
            <JAButton
              type='submit'
              variant='outline'
              className='!w-full'
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('forgot_password.send_reset_mail')}
            </JAButton>
          </div>
        </form>
      </Form>
      <p>
        {t('login.no_account')} &nbsp;
        <Button
          variant='link'
          onClick={goToSignupPage}
        >
          {t('login.signup_label')}
        </Button>
      </p>
    </div>
  );
};

export default UpdatePasswordEmailForm;
