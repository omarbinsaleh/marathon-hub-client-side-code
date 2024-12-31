import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
   const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) return null

      // console.log(difference);

      const timeLeft = {
         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
         minutes: Math.floor((difference / 1000 / 60) % 60),
         seconds: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
   }, [targetDate]);

   if (!timeLeft) {
      return (
         <p className="text-red-500 text-lg font-bold">
            The event has expired!
         </p>
      );
   }

   return (
      <div>
         <h1 className="text-lg uppercase font-bold text-red-700">The Event will Start in</h1>
         <div className="flex justify-start items-center gap-2 text-center">
            {Object.keys(timeLeft).map((interval) => (
               <div
                  key={interval}
                  className="w-20 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg"
               >
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                     {timeLeft[interval]}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                     {interval}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CountdownTimer;
