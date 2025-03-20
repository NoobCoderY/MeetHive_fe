import './index.css'


export const LoadingSpinner = (
) => {

  return (
    <div
      className='loader'
      role='status'
      aria-label='Loading'
    >
      <div className='cube'>
        <div className='face middle front'>
          <div className='cube cube-front'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
        <div className='face middle back'>
          <div className='cube cube-back'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
        <div className='face middle left'>
          <div className='cube cube-left'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
        <div className='face middle right'>
          <div className='cube cube-right'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
        <div className='face middle top'>
          <div className='cube cube-top'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
        <div className='face middle bottom'>
          <div className='cube cube-bottom'>
            <div className='face front'></div>
            <div className='face back'></div>
            <div className='face left'></div>
            <div className='face right'></div>
            <div className='face top'></div>
            <div className='face bottom'></div>
          </div>
        </div>
      </div>
      <div className='loading-content w-[30vw]'>
        <h2
          className='loading-text'
          aria-live='polite'
        >
          Loading your content...
        </h2>
      </div>
    
    </div>
  );
};
