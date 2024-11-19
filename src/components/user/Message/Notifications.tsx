"use client"
import React, { useState, useEffect } from 'react';
import { NotificationType } from './../../../types/message'; // Import your type
import Notification from './Notification';

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async (cursor: string | null) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/feeds/get-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursor }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      console.log("response", data.notifications)
      setNotifications(data.notifications);
      // Assuming the backend returns the next cursor value in the response
      //const nextCursor = (data as any).nextCursor || null; // Update if your response includes nextCursor
      //setCursor(nextCursor);
    } catch (error) {
      console.log('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications("...");
  }, []);

  return (
    <div className="notifications-container max-w-3xl mx-auto py-6">
      {/* <h1 className="text-xl font-bold py-5">Notifications</h1> */}
        <div className=''>
          {notifications.length !== 0 ? (
          notifications.map((notification, index) => (
          <div key={index} className=''>
              <Notification 
                 uri={notification.uri} 
                 cid={notification.cid}
                 author={notification.author} 
                 reason={notification.reason} 
                 indexedAt={notification.indexedAt}
                 labels={notification.labels} 
                 isRead={notification.isRead}
                 record={notification.record || ""}
                 reasonSubject={notification.reasonSubject || undefined}
               />
          </div>
        ))) : (
          <p>Loading</p>
        )}
        </div>
      {cursor && (
        <button
          onClick={() => fetchNotifications(cursor)}
          disabled={isLoading}
          className="load-more-btn"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Notifications;