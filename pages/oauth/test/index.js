import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

import Link from 'next/link'

const test = () => {
    const router = useRouter()
    const { token } = router.query;
    const [cookie, setCookie] = useCookies(["userToken"])

    useEffect(()=>{
        router.push('/')
    },[])


    if(token){
        setCookie("userToken", token, {
            path:'/',
            maxAge: 36000
        })
    }

    return (
        <>
        <div>
            <p>oauth text</p>
            <p>{ token }</p>
            <Link href="/">to home</Link>
        </div>
        </>
    )
}

export default test