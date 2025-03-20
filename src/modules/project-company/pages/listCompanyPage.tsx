import ListCompany from '../components/list-company';
import BgImg from '../../../assets/background.svg';

const ListCompanyPage = () => {
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
        <ListCompany />
      </div>
    </div>
  );
};

export default ListCompanyPage;
