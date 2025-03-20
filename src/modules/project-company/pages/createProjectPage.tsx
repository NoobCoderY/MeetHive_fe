import ProjectForm from '../components/project-form';
import BgImg from '../../../assets/background.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCompanyQuery } from '../services/companyApi';
import { useEffect } from 'react';
import { setCompanies, selectCompany } from '../slice/companySlice';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );

  const { data, refetch, isError } = useGetAllCompanyQuery('');

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setCompanies(data?.data));
      if (data.data.length == 1) {
        dispatch(selectCompany(data?.data[0]));
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (selectedCompany === null && isError) {
      navigate('/company');
    }
  }, [selectedCompany]);

  return (
    <div
      className=''
      style={{
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='h-[100vh]'>
        <ProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
