import JAButton from '@/shadcn/atoms/ja-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { Checkbox } from '@/shadcn/components/ui/checkbox';
import { Button } from '@/shadcn/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useTranslations } from 'use-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from '../../services/authApi';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

const SignupForm = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { toast } = useToast();

  const signupFormSchema = z
    .object({
      first_name: z.string().min(1, { message: t('signup.name_required') }),
      last_name: z.string().min(1, { message: t('signup.name_required') }),
      email: z
        .string()
        .email({ message: t('signup.email_validation') })
        .min(1, { message: t('signup.email_required') }),
      password: z.string().min(6, { message: t('signup.password_length') }),
      accept_terms: z.literal(true, {
        errorMap: () => ({ message: t('signup.terms_validation') }),
      }),
    })
    .required();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      accept_terms: undefined,
    },
  });
  /**
   * Handles the form submission.
   *
   * @param {z.infer<typeof signupFormSchema>} values - The values of the form.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      await registerUser({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
      }).unwrap();

      toast({
        title: t('signup.confirm_email_sent'),
        variant: 'default',
      });
      navigate('/confirmation');
    } catch (error: any) {
      return toast({
        title: t(`${error?.data.error_code}`),
        variant: 'destructive',
      });
    }
  };

  const goToLoginPage = () => navigate(`/login`);
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-4xl mb-2 font-light'>{t('signup.title')}</h1>
        <h3 className='text-xl mb-4 font-extralight'>{t('signup.subtitle')}</h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=''
        >
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.first_name_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('signup.first_name_label')}
                    {...field}
                    className='!bg-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.last_name_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('signup.last_name_label')}
                    {...field}
                    className='!bg-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className='!bg-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className='!bg=none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-2'>
            <FormField
              control={form.control}
              name='accept_terms'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='terms'
                        name='accept_terms'
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          return checked;
                        }}
                      />
                      <label
                        htmlFor='terms'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {t('signup.accept')}{' '}
                        <Link to='/agb'>
                          {t('signup.terms_and_conditions')}
                        </Link>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              {t('signup.join_now')}
            </JAButton>
          </div>
        </form>
      </Form>
      <p>
        {t('signup.already_account')} &nbsp;&nbsp;{' '}
        <Button
          variant='link'
          onClick={goToLoginPage}
        >
          {t('signup.login')}
        </Button>
      </p>
    </div>
  );
};

export default SignupForm;
