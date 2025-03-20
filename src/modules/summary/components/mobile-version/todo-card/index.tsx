import React, { useState } from 'react';
import './index.css'
import { useTranslations } from 'use-intl';
import { Card } from '@/shadcn/components/ui/card';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

const MTodoCard = () => {
    const [toggleTodoAccordian, setToggleTodoAccordian] = useState<boolean>(true);
    const t=useTranslations()
  return (
    <div className='p-2'>
      {toggleTodoAccordian ? (
        <Card
          className='flex justify-between p-2'
          onClick={() => setToggleTodoAccordian(!toggleTodoAccordian)}
        >
          <h1 className='text-md'>Todos</h1>
          <span>
            <ChevronsDown
              color='#89d289'
              size={28}
            />
          </span>
        </Card>
      ) : (
        <div className='relative'>
          <div className='absolute left-2 text-xl'>
            {' '}
            {t('transcription.todos')}
          </div>
          <div
            className='  absolute right-[5px] top-1 z-10 w-[21.3%] flex justify-center items-center'
            onClick={() => setToggleTodoAccordian(!toggleTodoAccordian)}
          >
            <div className='card_close_button_outer w-[100%] h-[100%] '>
              <div className='card_close_button_inner w-[100%] h-[100%]  flex justify-center items-center py-[0.13rem] pl-[3px] '>
                <ChevronsUp
                  size={27}
                  color='#97ec97'
                />
              </div>
            </div>
          </div>

          <div className='todos_summary_outer_card w-[100%] h-[100%]'>
            <div className='todos_summary_inner_card w-[100%] h-[100%]'>
              <div className='  px-3 pt-20 pb-6 h-[22rem]'>
                <div className='overflow-auto h-[16rem] flex justify-center items-center'>
                  <div className=' w-[80%] text-xl font-semibold'>
                    {t('transcription.todo_restriction')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MTodoCard;
