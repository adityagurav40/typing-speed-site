// import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../components/TableUserData';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';

// const UserPage = () => {

//     const [data, setData] = useState([]);
//     const [graphData, setGraphData] = useState([]);
//     const [user, Loading] = useAuthState(auth);
//     const navigate = useNavigate();

//     const fetchUserData = () => {

//         const resultRef = db.collection('results');
//         const { uid } = auth.currentUser;
//         const tempData = [];
//         const tempGraphData = [];
//          //so here we are basically fetching data from firebase and get() 
//         // is fn to getting it in snapshot we have doc node which saves all the data which an user created but we
//         //  use a new function to map the data of particular user so we can only show current user data not all data 
//         // present in the firestore database.
//         resultRef
//           .where("userId", "==", uid)
//           .orderBy("timeStamp", "desc")
//           .get()
//           .then((snapshot) => {
//             snapshot.docs.map((doc) => {
//               // console.log(snapshot);
//               tempData.push({ ...doc.data() });
//               tempGraphData.push([
//                 doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
//                 doc.data().wpm,
//               ]);
//               // 29 line explain graph data take to value one for x axis as timestamp in days or hrs and other
//               //  for y-axis has words per min
//             });
//             setData(tempData);
//             setGraphData(tempGraphData);
//           });
//     };
                



//     useEffect (()=>{
//         if(!Loading){
//             fetchUserData();
//         }
//         if(!Loading && !user){
//             navigate('/');
//         }

//     },[Loading]);

//     if(Loading){
//         return <CircularProgress color="inherit"/>;
//     }

//   return (
//     <>
//     <div className='canvas'>
//      <UserInfo />
//      <Graph graphData={graphData} type ='data'/> 
//      <TableUserData data={data}/>
//     </div>
//     </>
//   )
// }

// export default UserPage





import React, { useEffect } from 'react'
import { useState } from 'react';
// import { auth, db } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
// import { CircularProgress } from '@mui/material';
// import TableUserData from '../Components/TableUserData';
// import Graph from '../Components/Graph';
// import UserInfo from '../Components/UserInfo';


const UserPage = () => {
        const [data,setData]=useState([]);
        const [graphData,setGraphData]=useState([])
        const [user,Loading]=useAuthState(auth);
        const [dataLoading, setDataLoding]=useState(true);
        

    const navigate=useNavigate();

        const fetchUserData=()=>{
        const resultsRef=db.collection("Result");
console.log(resultsRef);
        const {uid}= auth.currentUser;
        console.log(uid)
            let tempData=[];
            let tempGraphData=[];
        resultsRef
        .where("userId",'==',uid)
        .orderBy('timeStamp','desc')
        .get()
        .then((snapshot)=>{
            console.log("snapshot")
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
                doc.data().wpm])
            })
            setData(tempData);
            console.log(data)
            setGraphData(tempGraphData.reverse());
            setDataLoding(false)
        }).catch((error) => {
            console.error('Error fetching user data:', error);
          });
    }
    useEffect(()=>{
        if(!Loading){
        fetchUserData();
        }
        if(!Loading && !user)
        {
        navigate('/');
        }
    },[Loading])

        if(Loading || dataLoading){
        return (
          <div className="center-of-screen">
           
            <CircularProgress color="inherit" size={50} />
           
          </div>
        );
        }
  return (
    <div className='canvas'>
        <UserInfo totalTestTaken={data.length}/>
        <div className='graph-user-page'>
        <Graph graphData={graphData}/>
        </div>
       
      <TableUserData data={data}/>
    </div>
  )
}

export default UserPage