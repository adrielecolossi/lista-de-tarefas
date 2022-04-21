import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logoListaDeTarefas.png'
import { AuthContext } from '../../contexts/auth';
import './signIn.css'
function SignIn() {

const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const { signIn, loadingAuth } = useContext(AuthContext);


function enviaDados(e){
e.preventDefault()
signIn(email, senha)
}

  return (
    <div className="App">

  <form onSubmit={enviaDados}>
  <img src={logo} alt="Logo Lista de Tarefas"/>
    <h1>Login</h1>
    <br></br>
    <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
    <br></br>
    <input type="password" placeholder='Senha' value={senha} onChange={(e)=> setSenha(e.target.value)}></input>
    <br></br>
    <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
  <br></br>
  <Link to="/register">Não possui uma conta? Cadastre-se</Link>
  <br></br>
  </form>
    </div>
  );
}

export default SignIn;
