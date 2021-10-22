import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react'

const NavBar = () => {

    const [activeItem, setactiveItem] = useState('home');

    return (
        <Menu secondary>
        <Link to="/home">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={() => setactiveItem('home')}
            />
        </Link>
        <Link to="/profile">
        <Menu.Item
            name='Profile'
            active={activeItem === 'profile'}
            onClick={() => setactiveItem('profile')}
        />
        </Link>
        <Menu.Menu position='right'>
            <Menu.Item>
            <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={() => setactiveItem('logout')}
            />
        </Menu.Menu>
        </Menu>
    )
  
}

export default NavBar;