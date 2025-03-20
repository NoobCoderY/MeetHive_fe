import GlobalSearchPage from '@/modules/global-search/pages/globalSearchPage';

const GlobalSearchFloatingButton = () => {
  return (
    <div
      className='
             fixed  inset-x-[98%]  bottom-[20%]  z-20  text-[#89d289] flex gap-3 transform rotate-90  h-[6vh]
             '
    >
      <GlobalSearchPage />
    </div>
  );
};

export default GlobalSearchFloatingButton;
