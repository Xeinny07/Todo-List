import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <div className= "min-h-screen bg-yellow-100 flex items-center  justify-center p-4">
     <main className="w-full max-w-3xl bg-black text-white rounded-lg p-6 shadow-xl ">
       <div className= " max-w-3xl mx-auto">
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
           Todo App
         </h1>
       </div>

       <Outlet />
     </main>
    </div>
  );
}
