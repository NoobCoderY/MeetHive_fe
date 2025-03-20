import { createBrowserRouter } from 'react-router-dom';
import Login from '@/modules/auth/pages/login';
import Signup from '@/modules/auth/pages/signup';
import Home from '@/modules/dashboard/pages/Home';
import AuthLayout from '@/layouts/auth-layout';
import UserLayout from '@/layouts/user-layout';
import UpdatePassword from '@/modules/auth/pages/updatePassword';
import NotFoundPage from './not-found-page';
import PrivacyPage from '@/modules/terms-and-condtion/pages/PrivacyPage';
import TermsConditionPage from '@/modules/terms-and-condtion/pages/TermsConditionPage';
import TranscriptionListPage from '@/modules/transcription/pages/transcriptionList';
import ProtectedRoute from './protected-route';
import ConfirmationForm from '@/modules/auth/pages/confirmationForm';
import ResetPasswordPage from '@/modules/auth/pages/resetPassord';
import VerifyEmailPage from '@/modules/auth/pages/verifyEmail';
import CompanyRegistrationPage from '@/modules/auth/pages/CompanyRegistration';
import UpdatePasswordEmailPage from '@/modules/auth/pages/updatePasswordEmail';
import ForgotPasswordEmailPage from '@/modules/auth/pages/forgotPasswordEmail';
import ListCompanyPage from '@/modules/project-company/pages/listCompanyPage';
import ListProjectPage from '@/modules/project-company/pages/listProjectPage';
import CreateProject from '@/modules/project-company/pages/createProjectPage';
import SelectProjectPage from '@/modules/project-company/pages/selectProjectPage';
import LiveTranscriptionPage from '@/modules/transcription/pages/liveTranscriptionPage';
import TranscriptionDetailPage from '@/modules/transcription/pages/transcriptionDetailPage';
import RecordingPermissionRoute from './recording-permission-route';
import SummaryPage from '@/modules/summary/pages/summaryPage';
import SummaryListPage from '@/modules/summary/pages/summaryListPage';
import SupportPage from '@/modules/support/pages/supportPage';
import EditProfilePage from '@/modules/auth/pages/editProfilePage';



export const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/dashboard',
            element: <Home />,
          },
          {
            path: '/transcription',
            element: <TranscriptionListPage />,
          },
          {
            path: '/project',
            element: <ListProjectPage />,
          },
          {
            path: '/transcription/detail/:transcriptionId',
            element: <TranscriptionDetailPage />,
          },
          {
            path: '/transcription/live',
            element: (
              <RecordingPermissionRoute>
                <LiveTranscriptionPage />
              </RecordingPermissionRoute>
            ),
          },
          {
            path: '/summary/detail/:summaryId',
            element: <SummaryPage />,
          },
          {
            path: '/summary/list',
            element: <SummaryListPage />,
          },
          {
            path: '/edit-profile',
            element: <EditProfilePage />,
          }
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,

    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'list-company',
        element: <ListCompanyPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordEmailPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'termsandcondition',
        element: <TermsConditionPage />,
      },
      {
        path: 'confirmation',
        element: <ConfirmationForm />,
      },
      {
        path: 'reset-password/:company_user_token',
        element: <ResetPasswordPage />,
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'update-password/:company_user_token',
            element: <UpdatePassword />,
          },
        ],
      },
      {
        path: '/account/verify/:company_user_token',
        element: <VerifyEmailPage />,
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'companyregistration',
            element: <CompanyRegistrationPage />,
          },
          {
            path: 'update-password-email',
            element: <UpdatePasswordEmailPage />,
          },

          {
            path: '/company',
            element: <ListCompanyPage />,
          },
          {
            path: '/project/create',
            element: <CreateProject />,
          },
          {
            path: '/project/select',
            element: <SelectProjectPage />,
          },
          {
            path: '/support',
            element: <SupportPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
