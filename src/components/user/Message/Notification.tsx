import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { NotificationType } from '~/types/message';


const Notification: React.FC<NotificationType> = ({ author, reason, indexedAt, labels, isRead, record, reasonSubject}) => {
  return (
    <div className="flex items-center gap-4 p-4 border  shadow-md hover:bg-gray-50 transition bg-white cursor-pointer">
      {/* Profile Picture */}
      

      {/* Notification Details */}
      <div className="flex-1">
        <div className='flex gap-3'>
        <div>
           <div className="w-12 h-12">
             <Image
               src={author.avatar}
               alt={`${author.displayName}'s profile`}
               className="rounded-full"
               width={48}
               height={48}
             />
           </div>
        </div>
        <div className='flex-col'>
           <p className="text-gray-700 text-lg">{author.displayName || "unknown"}</p>
           <p className='text-xs'>@{author.handle}</p>
           {/* <p>{reason}</p> */}
        </div>
        </div>
        <div>
            <div className='mt-5'>
                {
                    reason === "follow" ? <p><span>{reason}</span> you</p> : <p><span>{reason}</span> you post</p>
                }
            </div>
            <div>
               <p className="text-sm text-gray-500 mt-2">
                 {formatDistanceToNow(new Date(indexedAt), { addSuffix: true })}
               </p> 
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Notification;