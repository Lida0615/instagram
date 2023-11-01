import { NavMenu, NavSearch } from '../'
import cls from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <div className={cls.navbar}>
      <div className="container">
        <div className={cls.wrap}>

          <h1>logo12</h1>
          <NavSearch />
          <NavMenu />
        </div>
      </div>
    </div>
  )
}
