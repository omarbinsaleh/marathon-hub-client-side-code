import { useContext, useState } from 'react'
import { HiMiniBars3 } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { FaBriefcase, FaDatabase, FaHome, FaListAlt, } from 'react-icons/fa';
import { IoIosContact, IoIosSearch } from 'react-icons/io';
import { MdDesignServices } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';
import { RiMessage2Fill } from 'react-icons/ri';
import logo from '../assets/newLogo2.png';
import newLogo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import profileImg from '../assets/profile.png';
import { AuthContext } from '../providers/AuthProvider';
import { Tooltip } from 'react-tooltip';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
   const navigate = useNavigate();
   const { darkMood, setDarkMood } = useContext(AuthContext);

   const { user, signOutUser } = useContext(AuthContext);
   const [showLink, setShowLink] = useState(false);


   function handleBarClick() {
      setShowLink(!showLink);
   }

   function hideLink() {
      setShowLink(false)
   }

   function handleLogout() {
      // logout the user:
      // logOut();
      signOutUser()

      navigate('/')
      alert('User has logged out')
   }

   return (
      <nav id='navbar' className='bg-white/60 dark:bg-slate-800/60 shadow-md text-black p-3 py-2 sticky top-0 left-0 backdrop-blur-xl'>
         <div className='flex items-center justify-between h-[80px'>
            {/* nav start */}
            <div className='flex items-center gap-2'>
               <a href='#home' className='w-[110px] h-[48px] btn btn-ghost p-0 py-0 hover:bg-white'><img className='w-full h-full mix-blend-multiply dark:mix-blend-normal' src={newLogo} alt="" /></a> 
            </div>


            {/* nav center | links */}
            <div className='hidden lg:block'>
               <ul className='flex items-center gap-7 justify-center dark:text-white'>
                  {/* <li><NavLink to='/' onClick={hideLink} className='' > Home</NavLink></li> */}
                  {/* <li><NavLink to='/about' onClick={hideLink} >About</NavLink></li> */}
                  <li><NavLink to='/marathons' onClick={hideLink} >Marathons</NavLink></li>
                  <li><NavLink to='/dashboard' onClick={hideLink} >Dashboard</NavLink></li>
               </ul>
            </div>

            <div className='space-x-2 lg:hidden'>
               <ThemeToggle></ThemeToggle>
               <button onClick={handleBarClick} className='btn lg:hidden bg-transparent  text-2xl px-3 font-extrabold dark:text-white'>{showLink ? <RxCross2 /> : <HiMiniBars3 />}</button>
            </div>
            {
               user ? <div className='hidden lg:flex items-center gap-2'>
                  <div>
                     {/* <button onClick={() => setDarkMood(!darkMood)} className='btn'>{darkMood ? 'Light' : 'Dark'}</button> */}
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div>
                     <Link to={'/dashboard'}><img className='w-12 p-1 rounded-full border aspect-square user-profile' src={user?.photoURL ? user.photoURL : profileImg} alt="" /></Link>

                     <Tooltip
                        anchorSelect=".user-profile"
                        content={user?.displayName}
                     />
                  </div>
                  <div>
                     <button onClick={handleLogout} className='btn btn-md bg-opacity-50 border-none bg-blue-300 flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button>
                  </div>
               </div> : <div className='hidden lg:flex items-center gap-2'>
                  <div>
                     {/* <button onClick={() => setDarkMood(!darkMood)} className='btn'>{darkMood ? 'Light' : 'Dark'}</button> */}
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div>
                     <Link to={'/auth/register'} className='btn btn-md bg-opacity-50 border-none bg-blue-300 flex items-center justify-center' >Register</Link>
                  </div>
                  <div>
                     <Link to='/auth/login' className='btn btn-md bg-opacity-50 border-none bg-blue-300 flex items-center justify-center' >  <VscSignIn className='text-[17px]' /> Sign In</Link>
                  </div>
               </div>
            }
         </div>
         {/* nav links */}
         <div className={` ${showLink ? 'block animate__animated animate__fadeInDown' : 'hidden animate_animated animate_fadeInUp'} pt-3`}>
            <ul className='pb-4 space-y-3 text-lg dark:text-white'>
               <li><NavLink to='/marathons' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaListAlt /> Marathons</NavLink></li>
               <li>Dashboard</li>
               <li>
                  {user ? <button onClick={handleLogout} className='btn bg-opacity-50 border-none bg-blue-300 flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button> : <Link to='/auth/login' className='btn bg-opacity-50 border-none bg-blue-300 flex items-center justify-center' > <VscSignIn className='text-[17px]' /> Sign In</Link>}
               </li>
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
