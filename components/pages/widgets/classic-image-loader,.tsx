import React, { useState } from 'react'

export default function OpenImageLoader({ path, errorPath, className }: { path: string, errorPath: string, className?: string | undefined }) {
  const [error, setHasError] = useState(false)
  return (
    <img src={error ? errorPath : process.env.NEXT_PUBLIC_SERVERT + path} onError={() => setHasError(true)} className={className} />
  )
}
