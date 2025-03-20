import { Button } from '@/shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { Textarea } from '@/shadcn/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslations } from 'use-intl';
import { useSendSupportEmailMutation } from '../../services/support';
import { useToast } from '@/shadcn/components/ui/use-toast';

const SupportForm = () => {
  const t = useTranslations();
  const { toast } = useToast();

  const [sendSupportEmail, { isLoading }] = useSendSupportEmailMutation();

  const supportFormSchema = z
    .object({
      subject: z.string().min(1, { message: t('support.subject_required') }),
      message: z.string().min(1, { message: t('support.message_required') }),
    })
    .required();

  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const onSubmit = async () => {
    try {
      await sendSupportEmail({
        subject: form.getValues('subject'),
        body: form.getValues('message'),
      }).unwrap();

      toast({
        title: 'Success',
        description: t('support.support_successful'),
      });
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-[85vh] '>
      <div className=' py-5 sm:px-5 px-4 sm:w-[80vw] md:w-[60vw] lg:w-[40vw] w-[100vw]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-2'
          >
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem className='flex items-center sm:gap-6 md:gap-4 lg:gap-6 gap-3'>
                  <FormLabel className='w-[20%] sm:text-md lg:text-md lg:text-md text-sm'>
                    {t('support.subject')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('support.subject')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex items-center sm:gap-6 md:gap-4 lg:gap-6 gap-2'>
                  <FormLabel className='w-[20%] sm:text-md lg:text-md lg:text-md text-sm'>
                    {t('support.message')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder={t('support.message')}
                      {...field}
                      className='no-scrollbar'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center !mt-3'>
              <Button
                type='submit'
                className='w-[30%] !ml-10'
              >
                {isLoading && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                {t('support.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SupportForm;
