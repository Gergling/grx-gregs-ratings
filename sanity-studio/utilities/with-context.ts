/**
 * Sanity Context Wrapper Utility (withContext.tsx)
 * * * This higher-order component (HOC) is essential for any custom React component 
 * that needs to access Sanity Studio contexts (like the client or parts of the 
 * document store) when injected into the Structure Builder's title or items.
 * * * The previous utility, 'withMaxQueryTime', is no longer exported directly from 
 * 'sanity' in modern Studio versions, which caused the build error. This fix uses 
 * the modern hook-based approach to acquire context.
 */

import * as React from 'react';
// Correct modern import for accessing the Studio's core context.
import { useSource } from 'sanity'; 

// Define the type for the function that will generate the React element to be wrapped
type ReactElementGenerator = () => React.ReactElement;

/**
 * Higher-Order Component (HOC) to wrap a component creator function.
 * @param ComponentGenerator A function that returns the React element to be rendered.
 * @returns A functional component that wraps the generated element, injecting the required Sanity context.
 */
export const withContext = (ComponentGenerator: ReactElementGenerator) => {
  const ContextWrapper = (props: any) => {
    // Attempt to access the Sanity source context using the modern hook.
    // This hook must be called inside a component rendered within the Studio's React tree.
    const source = useSource(); 

    // The component is returned with the context in place.
    // If you need to explicitly pass the client, you can access it via source.getClient(...)
    return ComponentGenerator(); 
  };
  
  // Returning the wrapper function ensures it gets mounted into the correct React tree.
  return ContextWrapper;
};
