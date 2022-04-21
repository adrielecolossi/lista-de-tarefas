import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logoListaDeTarefas.png'
import './signUp.css'
import {AuthContext} from '../../contexts/auth'
function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(nome !== '' && email !== '' && password !== ''){
      signUp(email, password, nome)
    }

  }
  return (
    <div className="App">

  <form onSubmit={handleSubmit} className="FormSignUp">
  <br></br>
  <img src={logo} alt="Logo Lista de Tarefas"/>
    <h1>Cadastrar uma conta</h1>
    <br></br>
    <input type="text" placeholder='Nome' value={nome} onChange={(e)=> setNome(e.target.value)}></input>
    <br></br>
    <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
    <br></br>
    <input type="password" placeholder='Senha' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
    <br></br>
    <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
  <br></br>
  <Link to="/">Já possui uma conta? Faça login</Link>
  <br></br>
  <br></br>
  </form>
    </div>
  );
}

export default SignUp;
