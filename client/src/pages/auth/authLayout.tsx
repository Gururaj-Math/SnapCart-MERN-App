import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
   const { currentUser } = useSelector((state: any) => state.user);

   const userID = currentUser && currentUser.data && currentUser.data.user ? currentUser.data.user._id : null;

   const isAuthenticated = !!userID;

   return (
      <>
         {isAuthenticated ? (
            <Navigate to="/" />
         ) : (
            <div>
               <section>
                  <Outlet />
               </section>
            </div>
         )}
      </>
   );
}
