import { FaRegLightbulb } from 'react-icons/fa'; // Import the React Icon (you can use any icon you like)
import { Link } from 'react-router-dom';

const EmptyApplicationList = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] text-center bg-gray-50 dark:bg-gray-800  p-6">
      <FaRegLightbulb className="text-5xl text-gray-500 dark:text-gray-400 mb-6" />
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        No Application Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Looks like you haven't applied to any marathons yet. Start by applying your first application!
      </p>
      <Link
        to='/marathons'
        className="btn btn-primary bg-blue-900 text-white rounded-md"
      >
        Apply Nows
      </Link>
    </div>
  );
};

export default EmptyApplicationList;
