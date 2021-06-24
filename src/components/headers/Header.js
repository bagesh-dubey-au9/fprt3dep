import React, { useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
// import Logo from './icon/e-kart.jpeg';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Header()  {
    const state = useContext(GlobalState)
    // console.log(state)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async() => {
        await axios.get('/user/logout')
        localStorage.clear()
        // setIsAdmin(false)
        // setIsLogged(false)
        window.location.href = '/'
    }
    
    const adminRouter = () => { 
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                {/* <li><Link to="/history">History</Link></li> */}
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    // console.log(state)
    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                {/* <img src={Logo} alt=""/> */}
                <h1>
                    <Link to='/'>{isAdmin ? 'e-bag Admin': 'e-bag'}</Link>
                    {/* <Link to='/'>e-kart</Link> */}
                </h1>
            </div>

                <ul>
                    <li><Link to='/'>{isAdmin ? 'Products': null}</Link></li>

                    {isAdmin && adminRouter()}
                    {
                        isLogged ? loggedRouter() : <li><Link to='/login'>Login</Link></li>
                    }
                    {/* <li><Link to='/login'>Login</Link></li> */}
                                        
                    <li>
                        <img src={Close} alt="" width="30" className="menu" /> 
                    </li>
                </ul>
                    {
                        isAdmin ? ''
                        :<div className="cart-icon">
                            <span>{cart.length}</span>
                            <Link to="/cart">
                                <img src={Cart} alt="" width="30" />
                            </Link>
                        </div>
                    }
            
        </header>
    )
}

export default Header
