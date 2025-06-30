import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-white text-black-900 flex justify-between items-center px-4 h-14">
            <div className='logo'>PassMan</div>
            <ul>
                <li className='gitlogo'>
                    <a href="https:/github.com"><img src="/gitlogo.png" alt="git" /></a>
                </li>
            </ul>
        </nav>

        
        
    )
}
export default Navbar;