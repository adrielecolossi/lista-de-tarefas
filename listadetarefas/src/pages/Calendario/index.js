import { useEffect, useState } from 'react';
import './calendario.css';
import Header from '../../components/Header'
import 'react-calendar/dist/Calendar.css';

import firebase from '../../services/firebaseConnection';
export default function Calendario(){


 
    const [datas, setDatas] = useState([])
    const [value, onChange] = useState(new Date());
   const [atividades, setAtividades] = useState([])

    useEffect(()=>{
                async function loadTarefas(){
          await firebase.firestore().collection('tarefas')
          .onSnapshot((doc)=>{
            let minhasDatas = [];
            let nomeDasAtividades=[]
            doc.forEach((item)=>{
              if(item.data().autor === JSON.parse(localStorage.getItem('SistemaUser')).uid){
              let data = new Date(item.data().data)
              let dia  = data.getDate().toString().padStart(2, '0')
              let mes  = (data.getMonth()+1).toString().padStart(2, '0')
              let ano  = data.getFullYear();
              
            
              minhasDatas.push(`${dia}/${mes}/${ano}`)
              nomeDasAtividades.push(item.data().titulo)
              }
             
            });
    
      
            setDatas(minhasDatas);
            setAtividades(nomeDasAtividades);
            function compare(a,b) {
                return a.data > b.data;
              }
           datas.sort(compare);

           
        console.log(datas)
          })
        }
    
        loadTarefas();
          
          
      }, []);


    return(
        <div>
        <Header></Header>
<ul className='ul-calendario'>
      {datas.map(function(data, index){
       return(<div><li className='li-calendario'>{data + ' - ' + atividades[index]}</li><br></br></div>)
      })}
      </ul>
      <br></br>
      <br></br>
   </div>
    )
};