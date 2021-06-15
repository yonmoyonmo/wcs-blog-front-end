import { useCookies } from 'react-cookie'

const about = () =>{
    const [cookie, setCookie] = useCookies(["userToken"])
    const token = cookie.userToken
    return(
        <div className={style.container}>
            about
            <p>im the korean top class a hiphop mobeom nobulex a sdasdassd</p>
            <a href="/">to home</a>
            <p>{token}</p>
        </div>
    )
}

export default about