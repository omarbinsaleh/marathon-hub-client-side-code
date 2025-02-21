import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';


const Register = () => {
   const location = useLocation();
   const { createNewUser, user, setUser, logInWithGoogle, updateUserInfo } = useContext(AuthContext)
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState({
      name: '',
      photoURL: '',
      email: '',
      password: ''
   })

   // change the title:
   document.title = "Sign-Up | Marathon Hub";

   function handleSubmit(e) {
      e.preventDefault();

      const PassRegEX = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%*?&#]{6,}$/

      const form = new FormData(e.target);
      const name = form.get('name');
      const photoURL = form.get('photoURL');
      const email = form.get("email");
      const password = form.get("password");
      const newUser = { name, email, photoURL };

      // validate password:
      if (!PassRegEX.test(password)) {
         setErrorMessage({ ...errorMessage, password: "Invalid Password: Password must be at least 6 character log and must include at least one lowercase and one uppercase latter" })
         return;
      }
      console.log("Creating New User", { name, photoURL, email, password })

      // create new user:
      createNewUser(email, password)
         .then((result) => {
            setUser(result.user)

            // update profile:
            updateUserInfo({
               displayName: name,
               photoURL: photoURL,
            }).then(() => {
               console.log("A new user has been created successfully");
               toast.success("A new user has been created successfully");
               
            }).catch((err) => {
               toast.error(err.message)
            })
            
            // TODO: save user information to the database:



            { location.state ? navigate(location.state) : navigate('/') }

         }).catch((err) => {
            toast.error(err.message);
         })

      e.target.reset();
      setErrorMessage({
         name: "",
         photoURL: "",
         email: "",
         password: ""
      })
   }

   function handlLogInWithGoogle() {
      logInWithGoogle()
         .then((result) => {
            setUser(result.user);
            { location.state ? navigate(location.state) : navigate('/'); }
         })
         .catch((err) => {
            toast.error(err.message);
         })
   }

   console.log(location);

   return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center p-3'>
         <section className='w-full place-items-center space-y-1 card shadow-2xl max-w-xl py-3 border rounded-sm'>
            <div>
               <img className='w-[130px] mx-auto' src={logo} alt="" />
            </div>
            <h1 className="text-3xl font-semibold">Create your account</h1>
            <div className="card bg-base-100 w-full max-w-md  shrink-0 ">
               <form onSubmit={handleSubmit} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input name='name' type="text" placeholder="Full Name" className="input input-bordered rounded-sm" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Photo URL</span>
                     </label>
                     <input name='photoURL' type="text" placeholder="Photo URL" className="input input-bordered rounded-sm" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input name='email' type="email" placeholder="email" className="input input-bordered rounded-sm" required />
                  </div>
                  <div className="form-control relative">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input name='password' type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered rounded-sm" required />
                     <div onClick={() => setShowPassword(!showPassword)} className=' absolute right-3 top-[52px] cursor-pointer'>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                     {
                        errorMessage.password ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.password}</p>
                           </label>
                        ) : ''
                     }
                     <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white rounded-sm">Create Account</button>
                  </div>
                  <div className='w-full text-center'>
                     <p className=''>Already have account? <span className="text-red-600 font-semibold"><Link to={'/auth/login'}>Sign In</Link></span></p>
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
            containerId={"registerId"}
            position="top-right"
            autoClose={5000}
            closeOnClick={true}
            pauseOnHover={true}
            transition={"Bounce"}
         /><ToastContainer /> */}
      </div>
   )
}

export default Register
