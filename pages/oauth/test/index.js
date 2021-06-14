import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Link from 'next/link'

import style from '../../../styles/Home.module.css'

const test = () => {
    const router = useRouter()
    const { token } = router.query;
    const [cookie, setCookie] = useCookies(["userToken"])

    if(token){
        setCookie("userToken", token, {
            path:'/',
            maxAge: 36000
        })
    }

    return (
        <>
        <div className={style.container}>
            <p>oauth text</p>
            <p>{ token }</p>
            <Link href="/">to home</Link>
        </div>
        </>
    )
}

export default test