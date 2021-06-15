import headerStyles from '../styles/Header.module.css'

const Header = () =>{
    return (
        <div className={headerStyles.title}>
            <h1>wonmo cyber next practice</h1>
            <span>HEADER HEADER</span> HEADER
            <p className={headerStyles.descrition}>HEADER</p>
        </div>
    )
}

export default Header