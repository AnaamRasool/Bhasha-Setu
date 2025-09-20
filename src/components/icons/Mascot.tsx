import type { SVGProps } from 'react';

export function Mascot(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      {...props}
    >
      <rect width="1024" height="1024" rx="200" fill="#7C3AED" />
      <path
        fill="#fff"
        d="M512 256c141.4 0 256 114.6 256 256s-114.6 256-256 256S256 653.4 256 512 370.6 256 512 256zm0 64c-106 0-192 86-192 192s86 192 192 192 192-86 192-192-86-192-192-192zm-96 176a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm192 0a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm-192 144c32 48 96 64 144 64s112-16 144-64H416z"
      />
      <path
        fill="#fff"
        d="M288 480h-32c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h32v-64h-16v-64h16v-64zm448 0h32c17.7 0 32 14.3 32 32v128c0 17.7-14.3 32-32 32h-32v-64h16v-64h-16v-64z"
      />
    </svg>
  );
}