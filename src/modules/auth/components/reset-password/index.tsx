import { useTranslations } from 'use-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/shadcn/components/ui/input';
import JAButton from '@/shadcn/atoms/ja-button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useUpdatePasswordMutation } from '../../services/authApi';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const t = useTranslations();
  const params = useParams();
  const navigate = useNavigate();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const updateFormSchema = z
    .object({
      password: z.string().min(6, { message: t('signup.password_length') }),
      confirmPassword: z
        .string()
        .min(6, { message: t('signup.password_length') }),
    })
    .required()
    .refine((data) => data.password === data.password, {
      message: t('signup.password_not_match'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /**
   * Asynchronously handles form submission.
   *
   * @param {z.infer<typeof updateFormSchema>} values - The form values to submit.
   */
  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    await updatePassword({
      token: params.company_user_token,
      newPassword: values.password,
    })
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-4xl mb-2 font-light'>
          {t('forgot_password.update_password')}
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.password_label')}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder={t('signup.password_label')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.confirm_password')}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder={t('signup.confirm_password')}
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
              {t('forgot_password.update_password')}
            </JAButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
