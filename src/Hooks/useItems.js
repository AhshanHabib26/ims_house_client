import  { useEffect, useState } from 'react';

const useItems = () => {
   const [ products, setProducts] = useState([])

   useEffect(() =>{
    fetch('https://ims-house-0326.herokuapp.com/item')
    .then( res => res.json())
    .then( data => setProducts(data))
   },[])

   return [products]
};

export default useItems;