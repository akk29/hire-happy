import { toast } from 'react-toastify';

const errorToast = (
  message,
  config = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  return toast.error(message, config);
};

const successToast = (
  message,
  config = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  return toast.success(message, config);
};

const infoToast = (
  message,
  config = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  return toast.info(message, config);
};

export { errorToast, successToast, infoToast };
