import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState({
      email: '',
      password: ''
   })
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const location = useLocation();
   const navigate = useNavigate();
   const { signInUser, user, setUser, setLoading, logInWithGoogle } = useContext(AuthContext);

   const PassRegEX = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%*?&#]{6,}$/

   // change the title:
   document.title = "Login | Marathon Hub";

   function handleSubmit(e) {

      e.preventDefault();

      // const form = new FormData(e.target);
      // const formEmail = form.get('email');
      // const formPassword = form.get('password');

      if (!PassRegEX.test(password)) {
         setErrorMessage({ ...errorMessage, password: "Invalid Password: Password must be at least 6 character log and must include at least one lowercase and one uppercase latter" })
         return;
      }

      console.log("Login User", { email, password });

      // TODO: check if the user exists in the database:

      signInUser(email, password)
         .then((result) => {
            setUser(result.user);
            toast.success("User logged in successfully")
            { location.state ? navigate(location.state) : navigate('/'); }
         })
         .catch((err) => {
            toast.error(err.message);
         })

      e.target.reset();
   }

   function handlLogInWithGoogle() {
      logInWithGoogle()
         .then((result) => {
            setUser(result.user);
            toast.success("Logged in successfully")
            { location.state ? navigate(location.state) : navigate('/'); }
         })
         .catch((err) => {
            toast.error(err.message);
         })
   }

   // if(user) {
   //    return <Navigate to={location.state ? location.state : '/'}></Navigate>
   // }


   return (
      <div className='flex items-center justify-center min-h-screen w-full p-3'>
         <section className='w-full place-items-center space-y-1 card shadow-2xl max-w-xl py-3 border rounded-sm'>
            <div className=''>
               <img className='mx-auto w-[130px] ' src={logo} alt="" />
            </div>
            <h1 className="text-3xl font-semibold">Login your account</h1>
            <div className="card bg-base-100 w-full max-w-md  shrink-0 ">
               <form onSubmit={handleSubmit} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="email" className="input input-bordered rounded-sm" required />
                  </div>
                  <div className="form-control relative">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input onChange={(e) => setPassword(e.target.value)} name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered rounded-sm" required />
                     <div onClick={() => setShowPassword(!showPassword)} className=' absolute right-3 top-[52px] cursor-pointer'>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                     {
                        errorMessage.password ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.password}</p>
                           </label>
                        ) : ''
                     }
                     <label className="label">
                        <Link to={'/forget-password'} state={{ email }} className="label-text-alt link link-hover">Forgot password?</Link>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white rounded-sm">Login</button>
                  </div>
                  <div className='w-full text-center'>
                     <p className=''>Don't have account? <span className="text-red-600 font-semibold"><Link to={'/auth/register'} state={location.state} >Register</Link></span></p>
                  </div>
               </form>
               <div className="divider">OR</div>
               <div className='card'>
                  <div className='card-body'>
                     <button onClick={handlLogInWithGoogle} className="btn btn-block btn-primary bg-white text-blue-700 border-blue-700 hover:text-white rounded-sm"><FaGoogle></FaGoogle> Login with Google</button>
                  </div>
               </div>
            </div>
         </section>


         {/* <ToastContainer
            containerId={"logInID"}
            position="top-right"
            autoClose={5000}
            closeOnClick={true}
            pauseOnHover={true}
            transition={"Bounce"}
         /><ToastContainer /> */}
      </div>
   )
}

export default Login
