import React, {useState} from 'react';
import { Button } from "antd";
import TheatreFomModal from './TheatreFomModal';

function TheatreList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className='d-flex justify-content-end'>
        <Button onClick={() => setIsModalOpen(true)} type="primary">Add Theatre</Button>
        {
          isModalOpen && <TheatreFomModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}/>
        }
      </div>
    </>
  )
}

export default TheatreList