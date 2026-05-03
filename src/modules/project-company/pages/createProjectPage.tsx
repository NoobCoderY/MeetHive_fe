import ProjectForm from '../components/project-form';
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
    <div className='min-h-[calc(100dvh-4rem)] app-mesh-bg'>
      <ProjectForm />
    </div>
  );
};

export default CreateProject;
