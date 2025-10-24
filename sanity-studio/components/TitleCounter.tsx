import React, { useEffect, useState } from 'react';
// import { useClient } from 'sanity';
import { client } from "../../src/libs/sanity/config";

// Define the props the component expects
interface CounterProps {
  title: string;
  filter: string;
}

export const TitleCounter: React.FC<CounterProps> = ({ title, filter }) => {
  // const client = useClient({ apiVersion: 'v2023-08-01' }); // Ensure modern API
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // The GROQ query to count documents based on the provided filter
    const countQuery = `count(${filter})`;
    
    // Fetch the count
    client.fetch(countQuery)
      .then((data) => {
        if (isMounted) {
          setCount(typeof data === 'number' ? data : 0);
        }
      })
      .catch((error) => {
        // You would typically log this error in a real environment
        console.error('Error fetching document count:', error);
        if (isMounted) {
          setCount(0);
        }
      });
      
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [filter, client]); // Re-run if the filter changes

  // Render the title. The count will be null during fetch.
  const displayTitle = count === null 
    ? title 
    : `${title} (${count})`;

  // We must return a React Fragment or a simple element for the list item title
  // We use a <span> for flexibility.
  return <span>{displayTitle}</span>;
};
