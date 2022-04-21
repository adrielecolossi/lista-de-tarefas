import Header from '../../components/Header'
import { useEffect, useState } from 'react';
import './dashboard.css'
import firebase from '../../services/firebaseConnection';
import {BiAddToQueue } from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';

import * as React from 'react';
import PopUp from '../../components/PopUp/PopUp';
import PopUpEdit from '../../components/PopUpEdit/PopUpEdit';
export default function Dashboard(){

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [concluido, setConcluido] = useState('');
    const [autor, setAutor] = useState('');
    const [data, setData] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [idTarefa, setIdTarefa]= useState()
    let mensagem;

    if(tarefas==[]){
         mensagem= "Carregando..."
    } else{
        mensagem= <ul>
    
        {tarefas.map((tarefa)=>{
          return(
              <div className='div-li'>
            <li key={tarefa.id} >
              <span>Titulo: {tarefa.titulo} </span> <br/>
              <span>Descrição: {tarefa.descricao} </span> <br/>
            </li>
            <button className='ButtonExcluir' onClick={()=>{excluirTarefa(tarefa.id)}}><AiFillDelete></AiFillDelete></button>
            <br></br>
            <button className='ButtonExcluir' onClick={()=>{minhaTarefa(tarefa.id); togglePopup2(); setIdTarefa(tarefa.id)}}><AiFillEdit></AiFillEdit></button>
            <br></br>
            </div>
          )
        })}
       
  
      </ul>
    }

    useEffect(()=>{
      async function loadTarefas(){
        await firebase.firestore().collection('tarefas')
        .onSnapshot((doc)=>{
          let minhasTarefas = [];

          doc.forEach((item)=>{
            if(item.data().autor === JSON.parse(localStorage.getItem('SistemaUser')).uid){
            minhasTarefas.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor,
              descricao: item.data().descricao,
              concluido: item.data().concluido,
              data: item.data().data,
            })
          }
          });
        
          setTarefas(minhasTarefas);
  
        })
      }
  
      loadTarefas();
  
    }, []);

    async function minhaTarefa(id){
    const minhaTarefa = await firebase.firestore().collection('tarefas').doc(id).get()
    
         setTitulo(minhaTarefa.data().titulo)
         setDescricao(minhaTarefa.data().descricao)
         setData(minhaTarefa.data().data)
         setConcluido(minhaTarefa.data().concluido)
    }

    async function excluirTarefa(id){
        await firebase.firestore().collection('tarefas').doc(id)
        .delete()
        .then(()=>{
        })
        
      }


      async function editarTarefa(id){

        
        await firebase.firestore().collection('tarefas')
        .doc(id)
        .update({
          titulo: titulo,
          descricao: descricao,
          data: data
        })
        .then(()=>{
          console.log('DADOS ATUALIZADOS COM SUCESSO!');
        
        })
        .catch(()=>{
          console.log('ERRO AO ATUALIZAR');
        })
      
      }


    async function handleAdd(){
    setAutor(JSON.parse(localStorage.getItem('SistemaUser')).uid)
    console.log(autor, titulo, descricao, concluido)  
    if(data==''){
      alert('Dados Incompletos')
    } else{
    await firebase.firestore().collection('tarefas')
        .add({
          titulo: titulo,
          autor: JSON.parse(localStorage.getItem('SistemaUser')).uid,
          descricao: descricao,
          concluido:concluido,
          data: data
        })
        .then(()=>{
          console.log('DADOS CADASTRADO COM SUCESSO!');
          setTitulo('');
          setDescricao('');
          setConcluido('');
          setData('');
        })
        .catch((error)=>{
          console.log('GEROU ALGUM ERRO: ' + error);
        })
    
      }
    }

      const [isOpen, setIsOpen] = useState(false);
      const [isOpen2, setIsOpen2] = useState(false);
 
      const togglePopup = () => {
        setIsOpen(!isOpen);
      }
     
       
      const togglePopup2 = () => {
        setIsOpen2(!isOpen2);
      }
    return(
      

        <div>

  
   {isOpen2 && <PopUpEdit
      content={<>
        
    <label>Titulo: </label>
    <input type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value) }  />       
    <br></br>
    <label>Descrição: </label>
    <textarea type="text" value={descricao} onChange={ (e) => setDescricao(e.target.value)} />
    <br></br>
<label>Data</label>
    <input type="date"value={data} onChange={(e)=>setData(e.target.value)}></input>
    <br></br>
    
    <br></br>
    <button onClick={()=>{editarTarefa(idTarefa)}}>Adicionar</button>
      </>}
      handleClose={togglePopup2}
    />}
        
        {isOpen && <PopUp
      content={<>
        
    <label>Titulo: </label>
    <input type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value) }  />       
    <br></br>
    <label>Descrição: </label>
    <textarea type="text" value={descricao} onChange={ (e) => setDescricao(e.target.value)} />
    <br></br>
<label>Data</label>
    <input type="date" onChange={(e)=>setData(e.target.value)}></input>
    
    <br></br>
    <button onClick={handleAdd}>Adicionar</button>
      </>}
      handleClose={togglePopup}
    />}
<Header></Header>
   {mensagem}

   <BiAddToQueue size={40}  style={{marginTop: "5%", cursor:"pointer"}} color= "#2F0147" onClick={togglePopup}></BiAddToQueue>
        </div>
       
    )
}