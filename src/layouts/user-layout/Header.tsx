import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shadcn/components/ui/avatar';
import { ModeToggle } from '@/modules/core/components/mode-switch';
import { LanguageToggle } from '@/modules/core/components/language-switch';
import { useTranslations } from 'use-intl';
import AudioRecorder from '@/modules/audio-recorder/pages/AudioRecorder';
import { useNavigate } from 'react-router-dom';
import useResponsive from '@/hooks/useResponsive';
import Logo from '../../assets/logo.svg';
import Hamburger from './Hamburger';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/modules/auth/auth-slice';
import { RootState } from '@/store/store';
import FeedbackDialogPage from '@/modules/feedback/pages/feedbackDialogPage';
import GlobalSearchPage from '@/modules/global-search/pages/globalSearchPage';
const Header = () => {
  const breakPoints = useResponsive([600, 900, 1400]);
  

  const t = useTranslations();
  const navigate = useNavigate();
  const goToProfilePage = () => {
    navigate('/edit-profile');
  };
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state: RootState) => state.project?.selectedProject
  );

  const logoutUser = () => {
    dispatch(logout());
  };

  const updatePassword = () => {
    navigate('/update-password-email');
  };

  const goToProjectPage = () => {
    navigate('/project');
  };

  return (
    <>
      {breakPoints === 0 ? (
        <div className='flex justify-between items-center gap-2 px-2 py-2 mb-4 relative'>
          <div className='w-[30px] h-[30px]'>
            <img
              src={Logo}
              alt='logo'
              className='w-[100%] h-[100%]'
            />
          </div>
          <h1 className='animate-text bg-gradient-to-r from-white via-green-500 to-green-900 bg-clip-text text-transparent text-[1rem] font-black'>
            {selectedProject?.name.length > 10
              ? `${selectedProject?.name.substring(0, 10)}..`
              : selectedProject?.name}
          </h1>
          <div className='flex  items-center gap-2'>
            &nbsp;
            <ModeToggle />
            &nbsp;
            <LanguageToggle />
            &nbsp;
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage
                    src='profile.png'
                    alt='profile'
                  />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={goToProfilePage}>
                  {t('header.edit_profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                  {t('header.logout')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={updatePassword}>
                  {t('header.update_password')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToProjectPage}>
                  {t('header.change_project')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            &nbsp;
            <Hamburger />
          </div>
        </div>
      ) : (
        <div className='flex justify-between  items-center gap-2 mb-4 p-3'>
          <h1 className='animate-text bg-gradient-to-r from-white via-green-500 to-green-900 bg-clip-text text-transparent text-[1.5rem] font-black'>
            {selectedProject?.name.length > 20
              ? `${selectedProject?.name.substring(0, 20)}...`
              : selectedProject?.name}
          </h1>

          <div
            className={`flex justify-start items-center gap-2 flex-wrap
            `}
          >
            &nbsp;
            <FeedbackDialogPage />
            &nbsp;
            <AudioRecorder />
            &nbsp;          
                <GlobalSearchPage />
              &nbsp;
            <ModeToggle />
            &nbsp;
            <LanguageToggle />
            &nbsp;
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage
                    src='profile.png'
                    alt='profile'
                  />
                  <AvatarFallback>{'Yash'.substring(0, 1)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={goToProfilePage}>
                  {t('header.edit_profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                  {t('header.logout')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={updatePassword}>
                  {t('header.update_password')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToProjectPage}>
                  {t('header.change_project')}
                </DropdownMenuItem>
              
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
