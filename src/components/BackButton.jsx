import { ArrowDownLeftIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ customAction }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (customAction) {
      customAction();
    } else {
      navigate(-1); // Navigate back one page in history
    }
  };

  return (
    <button onClick={handleClick} className="back-button flex items-center bg-[#dcdcdc] p-1 pl-2 rounded-sm">
      <ArrowLeftIcon className='w-6 h-4' /> <span className="mb-1 ml-2"></span>
    </button>
  );
};

export default BackButton;