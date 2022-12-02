import React,{useReducer,useEffect,useState} from 'react';
import axios from 'axios'; 

const initialState={
    loading: true,
    shortners: [],
    err: '',
    addeditems: 0
};
const reducer=(state,action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                shortners: action.payload
            };
        case 'FETCH_FAIL':
            return{
                ...state,
                err: 'fetch_failed'
            }
        case 'ADD_ITEM':
            
            return{
                loading: false,
                shortners: [...state.shortners, action.payload],
                err: '',
                addeditems: state.addeditems+1
            }
        default: 
            return state;
    }
}

export default function UrlShort(){
    const [ state1 ,dispatch]=useReducer(reducer,initialState);
    const [current,setCurrent]= useState('');
    useEffect(()=>{
        axios.get('/shortners')
        .then((res)=>{
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: res.data
            });
        })
        .catch((err)=>{ dispatch({type: 'FECH_FAIL'})
            });
    },[state1.addeditems]);
    const handleSubmit=()=>{
        const item={
            orgUrl: document.getElementById('orginalURL').value,
            shortWith: document.getElementById('shorten').value
        };
        item.shortWith=item.shortWith.replace('/','-');
        document.getElementById('result').innerHTML=`Successfully shorten with ${document.getElementById('shorten').value} !`;
        document.getElementById('orginalURL').value='';
        document.getElementById('shorten').value='';
        axios.post('/shortners',item)
        .then((resp)=>{
            dispatch({
                type: 'ADD_ITEM',
                payload: item
            });
        })
        .catch((err)=>{
            // document.getElementById('result').innerHTML=`Short with a unique word not with ${document.getElementById('shorten').value} !`;
            document.getElementById('result').innerHTML=err+' : Your unique word already exists';
            console.log(err);
        });
    };
    const copytheText=(event)=>{
        if(document.getElementById(current)){
            document.getElementById(current).innerHTML="Copy";
        }
        event.target.innerHTML='Copied!';
        var ko1=event.target.id;
        setCurrent(ko1);
        var ko=ko1.substring(1);
        navigator.clipboard.writeText(document.getElementById(ko).innerHTML);

    }
    const giveaway=()=>{
   
        const k=state1.shortners.map((each)=>(<div className={'Link'} key={each.shortWith}><a id={each.shortWith} href={`/shortners/${each.shortWith}`} target="_blank" rel="noreferrer">{'https://still-scrubland-35195.herokuapp.com'+`/shortners/${each.shortWith}`}</a><div id={`b${each.shortWith}`} onClick={copytheText} className={'copybutton'}>Copy</div></div> ));
        var k1=[];
        for(let i=k.length-1;i>=0;i--){
            k1.push(k[i]);
        }

        return k1;

    };
    return(
        <div>
            <input type='text' id='orginalURL' placeholder={'Paste your long URL here '}/>
            <div className={'inputfields'}>
            <input type='text' id='shorten'  placeholder={'Short with a unique word '}/> 
            <div className={'but'} onClick={handleSubmit} >Short the URL</div>
            </div>
            <div id='result'></div>
        <div className={'allLinks'}>
        {state1.shortners.length && <div id='rec'>Recently Shorten URL's : </div>}
        {
            state1.loading ? 'Loading...' : giveaway()
        }
        </div>
        {state1.err && ' Something went wrong !!!! We are so sorry for inconvince '}
        </div>
    );
}
