import React from 'react'

const Navbar: React.FC = () => {
return(
    <header>
        <nav className='main-nav'>
            <a className='main-link'>
                PokéCatcher
            </a>
            <a className='secondary-link'>
                Collection
            </a>
            <a className='secondary-link'>
                Profile
            </a>
        </nav>
    </header>
)
}

export default Navbar;