"use client"

import { useCallback, useState } from "react"

type AsyncTransitionHook<T = unknown> = {
  isPending: boolean
  run: (action: () => Promise<T>) => Promise<{
    success: boolean
    result: T | null
    message?: string
  }>
}

export function useAsyncTransition<T>(): AsyncTransitionHook<T> {
  const [isPending, setIsPending] = useState(false)

  const run = useCallback(async (action: () => Promise<T>) => {
    setIsPending(true)
    try {
      const result = await action()
      return { success: true, result }
    } catch (error) {
      console.error("Error during async operation:", error)
      return {
        success: false,
        result: null,
        message: error instanceof Error ? error.message : String(error),
      }
    } finally {
      setIsPending(false)
    }
  }, [])

  return { isPending, run }
}
