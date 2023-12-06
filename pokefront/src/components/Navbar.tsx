import React from 'react'

const Navbar: React.FC = () => {
return(
    <header>
        <div className='nav-div'>
            <nav className='main-nav'>
                <div>
                    <a className='main-link' href='/catcher'>
                        PokéCatcher
                    </a>
                </div>
                <div>
                    <a className='collection-link' href='/collection'>
                        Collection
                    </a>
                    <a className='profile-link' href='/profile'>
                        Profile
                    </a>
                </div>
            </nav>
        </div>
    </header>
)
}

export default Navbar;