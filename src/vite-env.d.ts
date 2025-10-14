/// <reference types="vite/client" />

declare module '*.jpg' {
  const path: string;
  export default path;
}
