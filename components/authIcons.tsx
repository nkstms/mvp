import { Facebook, Mail, Phone } from 'lucide-react';
import { GoogleAuthButton } from './buttons/GoogleAuthButton';
import { FacebookAuthButton } from './buttons/FacebookAuthButton';

const AuthIcons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <FacebookAuthButton>
        <Facebook className="w-4 h-4" />
      </FacebookAuthButton>

      <GoogleAuthButton>
        <Mail className="w-4 h-4" />
      </GoogleAuthButton>

      <button
        type="button"
        className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 active:text-white active:bg-sky-600 active:border-sky-600"
      >
        <Phone className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AuthIcons;
