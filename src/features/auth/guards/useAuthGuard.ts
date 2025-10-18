import { supabase } from '@/src/core/lib/supabase'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

export function useAuthGuard() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
      setLoading(false)

      if (!session) {
        router.replace('/(auth)/welcome')
      }
    }

    checkSession()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        router.replace('/(auth)/welcome')
      }
    })

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [])

  return { loading, session }
}
