/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import auth from '../assets/auth.svg'
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid  gap-3 mb-8">
          
            <img
              src={auth}
              
              className={`aspect-square rounded-2xl  
              `}
            />
          
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
