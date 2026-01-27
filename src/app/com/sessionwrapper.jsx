"use client"
import { SessionProvider } from 'next-auth/react'
import NextAuth from 'next-auth'
import React from 'react'
  const sessionwrapper = ({children}) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  )
}
export default sessionwrapper