import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import {Link} from 'react-router-dom';
import './Header.css'

import logo from '../../assets/logoListaDeTarefas.png'
function Header() {
  const {signOut} = useContext(AuthContext)
let [nome, setNome] = useState('')
  useEffect(()=>{
    setNome(JSON.parse(localStorage.getItem('SistemaUser')).nome)
  }, [])

    return (
    
      <div>

      <div className="NormalSidebar">
      <img src={logo} alt="Logo Lista de Tarefas" className="ImagemHeader"/>
      <h1>
                Lista de tarefas - {nome}
            </h1>
    
            <br></br>
            <br></br>
    <Link to= '/dashboard'>
     Tarefas
    </Link>
   <br></br>
   <br></br>
    <Link to= '/calendario'>
    Agenda
    </Link>
    <br></br>
    <br></br>
    <button onClick={signOut}>Fazer logout</button>
      </div>
      </div>
    );
  }
  
  export default Header;
   