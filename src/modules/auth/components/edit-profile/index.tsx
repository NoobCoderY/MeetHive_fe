import { useEffect, useState } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { User, Trash2 } from 'lucide-react'; // Import Trash2 icon for delete
import { useTranslations } from 'use-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion';
import './index.css';
import DeleteAccount from '../delete-acc-dialog';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useEditProfileMutation } from '../../services/authApi';
import { useSelector } from 'react-redux';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../auth-slice';
import { useDeleteProfileMutation } from '../../services/authApi';
import { logout } from '../../auth-slice';


const getCurrentLocale = () => {
  return localStorage.getItem('locale') || 'en';
};

export default function EditProfile() {
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: File | null;
  }>({
    first_name: '',
    last_name: '',
    email: '',
    profile_picture: null,
  });
  const [showProfileImage, setShowProfileImage] = useState('');

  const dispatch = useDispatch();

  const { user, token } = useSelector((state: any) => state.auth);

  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { toast } = useToast();

  const t = useTranslations();

  const [editProfile, { isLoading }] = useEditProfileMutation();
  const [deleteProfile,{isLoading:isDeleteLoading}]=useDeleteProfileMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
      setShowProfileImage(user.profile_picture);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      profile_picture: file as File,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShowProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const setUserData = (userData) => {
    if (userData) {
      const payload = {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        profile_picture: userData?.profile_picture,
      };
      dispatch(
        setUser({
          token: token,
          user: {
            ...payload,
            ...user?.user,
          },
        })
      );
    }
  };
  const handleSubmit = async () => {
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      profile_picture: formData.profile_picture,
    };
    try {
      const response = await editProfile(payload).unwrap();
      setUserData(response?.data);
      toast({
        title: 'Success',
        description: t('header.profile.profile_updated_successfully'),
      });
    } catch (error) {
      return toast({
        title: 'Error',
        variant: 'destructive',
        description: error.data.error[0],
      });
    }
  };

  const handleDeleteAccount = async () => {
    const expectedValues = {
      en: 'DELETE ACCOUNT',
      de: 'KONTO LÖSCHEN',
    };
    const expectedValue = expectedValues[getCurrentLocale()];
    if (inputValue !== expectedValue) {
      toast({
        variant: 'destructive',
        description: t('header.profile.profile_delete_text_filled_warning'),
      });
      return;
    }
    try {
        await deleteProfile('').unwrap();
     
      toast({
        title: 'Success',
        description: t('header.profile.profile_deleted_successfully'),
      });
      dispatch(logout());
    } catch (error) {
      return toast({
        title: 'Error',
        variant: 'destructive',
        description: error.data.error[0],
      });
    }
  }

  return (
    <div className='w-full'>
      <div className='flex justify-center  w-[100%] h-[100%]'>
        <div className='sm:min-w-[400px] min-w-[350px] rounded-lg  border-[1px] border-gray-700 edit-profile_container'>
          <div className='border-t-[1px]  rounded-t-lg  px-3 pt-6 pb-12  edit_profile_header'>
            <div className='flex  mb-3'>
              <div className='text-xl font-semibold '>
                {t('header.edit_profile')}
              </div>
            </div>

            <div className='mt-5 flex gap-4 items-center'>
              <label
                htmlFor='profilePictureUpload'
                className='cursor-pointer'
              >
                <div>
                  <img
                    src={
                      showProfileImage ||
                      'https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg'
                    }
                    className='w-[4.5rem] h-[4.5rem] rounded-full object-cover border-2 border-green-500 shadow-lg'
                    crossOrigin='anonymous'
                    alt='Profile'
                  />
                </div>
              </label>
              <input
                id='profilePictureUpload'
                type='file'
                accept='image/*'
                onChange={handleProfilePictureChange}
                className='hidden'
              />

              <div className='flex flex-col '>
                <p className='font-semibold text-[1rem]'>{`${user?.first_name} ${user?.last_name}`}</p>
                <p className='text-[0.8rem] text-gray-500'>{user?.email}</p>
              </div>
            </div>
          </div>
          <div className=' mt-[-20px] rounded-t-2xl rounded-b-lg edit_profile_card  border-t-[1px] border-gray-700 '>
            <p className='mt-4 px-3 text-md font-semibold'>
              {t('header.account_setting')}
            </p>
            <Accordion
              type='single'
              collapsible
              className='w-full p-3'
              defaultValue='item-1'
            >
              <AccordionItem
                value='item-1'
                className='border-b-0'
              >
                <AccordionTrigger className='hover:no-underline  edit_profile_accordion_trigger rounded-lg px-2 py-2'>
                  <span className='flex gap-2'>
                    <User size={20} />
                    {t(`header.profile.personal_details.title`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className='px-2 mt-2'>
                  <div className='flex flex-col items-center space-y-4 mb-2'>
                    <div className='space-y-2 w-full'>
                      <Label
                        htmlFor='first_name'
                        className='text-gray-700 dark:text-gray-300'
                      >
                        {t('signup.first_name_label')}
                      </Label>
                      <Input
                        id='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder={t('signup.first_name_label')}
                        className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400'
                      />
                    </div>
                    <div className='space-y-2 w-full'>
                      <Label
                        htmlFor='last_name'
                        className='text-gray-700 dark:text-gray-300'
                      >
                        {t('signup.last_name_label')}
                      </Label>
                      <Input
                        id='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder={t('signup.last_name_label')}
                        className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400'
                      />
                    </div>
                    <div className='space-y-2 w-full '>
                      <Label
                        htmlFor='email'
                        className='text-gray-700 dark:text-gray-300'
                      >
                        {t('header.profile.personal_details.fields.email')}
                      </Label>
                      <Input
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                        type='email'
                        placeholder={t(
                          'header.profile.personal_details.fields.email_placeholder'
                        )}
                        className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400'
                      />
                    </div>
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      className='w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105'
                    >
                      {isLoading && (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      {t('header.profile.save_changes')}
                    </Button>
                  </div>

                  <Button
                    onClick={() => setIsDeleteConfirm(true)}
                    className='mt-2 w-full bg-red-500 hover:bg-red-600 text-white  rounded-md transition-all duration-300 transform hover:scale-105'
                  >
                    <Trash2 className='mr-2 h-4 w-4' />
                    {t('header.delete_profile')}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <DeleteAccount
        isDeleteConfirm={isDeleteConfirm}
        setIsDeleteConfirm={setIsDeleteConfirm}
        handleDeleteAccount={handleDeleteAccount}
        setInputValue={setInputValue}
        inputValue={inputValue}
        isDeleteLoading={isDeleteLoading}
      />
    </div>
  );
}
