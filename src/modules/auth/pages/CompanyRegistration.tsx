import { useState, useEffect } from 'react';
import BgImg from '../../../assets/background.svg';
import SwitchCompanyForm from '../components/registration-form/switchCompanyForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOnboardingInfoQuery } from '../services/authApi';
import { RootState } from '@/store/store';
import { companyRegistrationFormFields } from '../utils';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { useGetAllCompanyQuery } from '@/modules/project-company/services/companyApi';
import { selectCompany } from '@/modules/project-company/slice/companySlice';
import { useDispatch } from 'react-redux';
import { toast } from '@/shadcn/components/ui/use-toast';

const CompanyRegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectCompanyForm, setSelectCompanyForm] = useState(1);
  const [
    companyRegistrationFormFieldsState,
    setCompanyRegistrationFormFieldsState,
  ] = useState(companyRegistrationFormFields);
  const user = useSelector((state: RootState) => state.auth.user);

  const {data: onboardingData,isLoading: onboardingLoading,refetch: refetchOnboarding,} = useGetOnboardingInfoQuery({ userId: user?.id });
  const {data: companyData,isLoading: companyLoading,refetch: reloadCompanies,isError: companyError,} = useGetAllCompanyQuery('');

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
    } else {
      refetchOnboarding();
    }
  }, [user?.id, refetchOnboarding, navigate]);

  useEffect(() => {
    if (onboardingData?.data && companyData?.data) {
      dispatch(selectCompany(companyData.data[0]));
      navigate('/project/select');
    }
  }, [onboardingData, companyData, navigate, dispatch]);

  useEffect(() => {
    reloadCompanies();
  }, [reloadCompanies]);

  useEffect(() => {
    if (companyError) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
     })
    }
  }, [companyError]);

  const isLoading = onboardingLoading || companyLoading;

 
  if (onboardingData?.data) {
    return null; 
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='h-[100vh]'
    >
      {isLoading ? (
        <div className='flex justify-center items-center h-[60vh]'>
          <LoadingSpinner
          />
        </div>
      ) : (
        <SwitchCompanyForm
          selectCompanyForm={selectCompanyForm}
          setSelectCompanyForm={setSelectCompanyForm}
          setCompanyRegistrationFormFieldsState={
            setCompanyRegistrationFormFieldsState
          }
          companyRegistrationFormFieldsState={
            companyRegistrationFormFieldsState
          }
        />
      )}
    </div>
  );
};

export default CompanyRegistrationPage;

