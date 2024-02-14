import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="mt-4 w-full flex items-center justify-center gap-2 uppercase text-sm font-medium text-gray-400 hover:text-gray-600"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faClose} />
      Cancel edit
    </button>
  );
};

export default CancelButton;
