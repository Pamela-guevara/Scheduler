import React, { useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import BurgerButton from './BurgerButton';





function Navbar() {
  const [clicked, setClicket] = useState(false)
  const handleClick = () => {
    setClicket(!clicked)
  }
  return (
    <>
        <NavContainer>
          <h2>Actitud <span>Runing</span></h2>
            <div className={`links ${clicked ? 'active' : ''}`}>
            <a>
            <Link to="/"> Home</Link>
             <Link to="/Registro"> Registro</Link>
             <Link to="/Agenda"> Agenda</Link>
             <Link to="/Usuarios"> Usuarios</Link>
            </a>
            </div>
            <div className='burguer'>
            <BurgerButton clicked ={clicked} handleClick={handleClick} />
            </div>
            <Bgdiv className={`link ${clicked ? 'active' : ''}`}/>
            

        </NavContainer>
    </>
  )
}

export default Navbar

const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight:400;
    z-index: 1000;
    span{
      font-weight: bold;
      z-index: 1000;
    }
  }
    padding: .100px;
    background-color: hotpink;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
      color: white;
      text-decoration: none;
      margin-right: 1rem;
    }
    .links{
      position: absolute;
      top: -700px;
      left: -2000px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      a{
        color: white;
        font-size: 2rem;
        display: block;
      }
      @media(min-width: 768px){
        position: initial;
        margin: 0;
        a{
          font-size: 1rem;
          color: white;
          display: inline;
        }
      }
    }
    .links.active{
      width: 100%;
      display: white;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: 30%;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 1000;
      a{
        color: white;
        z-index: 1000;
      }
    }
    .burguer{
      @media(min-width: 768px){
        display: none;
        position: absolute;
        z-index: 1000;
      }
    }

`

const Bgdiv = styled.nav`
    background-color: hotpink;
    position: absolute;
    top: -700px;
    left: -1000px;
    width: 100%;
    height: 100%;
    z-index: 100;
    &.active{
      position: absolute;
      border-radius: 0 0 80% 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
`