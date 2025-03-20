interface IStepperProps {
  selectDialogComponent: number;
}

const Stepper = ({ selectDialogComponent }: IStepperProps) => {
  const numberOfSteps = 3;

  const activeColor = (index: number) =>
    selectDialogComponent >= index + 2 ? 'bg-blue-500' : 'bg-gray-300';

  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div className='flex items-center mt-6 w-[100%] sm:ml-14 ml-10'>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <div
          key={index}
          className='basis-[35%] flex items-center'
        >
          <div className={`w-8 h-8 rounded-full ${activeColor(index)}`}></div>
          {isFinalStep(index) ? null : (
            <div className={`w-[80%] h-1 ${activeColor(index)}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
