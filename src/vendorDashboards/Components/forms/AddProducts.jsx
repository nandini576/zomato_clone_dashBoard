import React,{useState} from 'react'
import {API_URL} from '../../Data/apiPah'
const AddProducts = () => {
    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState([]);
    const [bestSeller,setBestSeller]=useState(false);
    const [description,setDescription]=useState("");
    const [file,setFile]=useState(null);
    
    const handleCategoryChange =(event)=>{
      const value = event.target.value;//updated value is assigned to value
      if(category.includes(value)){
        setCategory(category.filter((item)=> item !== value));
      }else{
        setCategory([...category,value])//...-spread operator
      }
    }

    const handleBestSeller =(event)=>{
      const value = event.target.value === 'yes';
      setBestSeller(value);   
    }
  
    const handleImagehandler =(event)=>{
      const selectedImage= event.target.files[0];
      setFile(selectedImage)
    }

    const handleAddproduct =async(e)=>{
       e.preventDefault();
       try{
        const loginToken=localStorage.getItem('loginToken')
        const firmId=localStorage.getItem('firmId')
        if(!loginToken || !firmId){
          console.error("user Not Authenticated");
        }
        const formData= new FormData();
        formData.append('productName',productName);
        formData.append('price',price);
        formData.append('description', description);
        category.forEach((value)=>{
           formData.append('category',value)
        })
        formData.append('bestSeller',bestSeller)
        formData.append('image',file)
        const response = await fetch(`${API_URL}/add-product/${firmId}`,{
          method:'POST',
          body:formData
        });
        const data=await response.json()
        if(response.ok){
          console.log(data)
          alert("firm added succesfully")
        }
       }catch(error){
          console.error(error)
        alert("failed to add product")
       }
    }


  return (
    <div className='productSection'>
        <h3>Add Product</h3>
        <form className='authForm' onSubmit={handleAddproduct}>

          <div className='innerAuth'>
            <label>product Name:</label>
             <input type="text" placeholder='Enter Product Name..' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
          </div>
          <div className='innerAuth'>
            <label>Price</label>
            <input type="text" placeholder='Enter price...' value={price} onChange={(e)=>setPrice(e.target.value)}/>
          </div>

          <div className='innerAuth'>
            <label>Category:</label>
            <div className='category'>

              <div className='inner-category'>
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" onChange={handleCategoryChange}/>
              </div>

              <div className='inner-category'>
                <label>Veg</label>
                <input type="checkbox" value="veg" onChange={handleCategoryChange}/>
              </div>
            
            </div>
            
          </div>
          <div className='innerAuth'>
            <label>BestSeller:</label>

            <div className='category'>

              <div className='inner-category'>
                <label>yes</label>
                <input type="radio"  name="bestseller" value="true" onChange={handleBestSeller}/>
              </div>

              <div className='inner-category'>
                <label>No</label>
                <input type="radio" name="bestseller" value="false" onChange={handleBestSeller}/>
              </div>
            
            </div>


          </div>
          <div className='innerAuth'>
            <label>Description:</label>
            <input type="text" placeholder='Enter Description...' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <div className='innerAuth'>
            <label>Product  Image:</label>
            <input type="file" accept="image/*" onChange={handleImagehandler}/>
          </div>
          <div className='innerAuth'>
            <div></div>
            <button type='submit'>Submit</button>
          </div>

        </form>
      
    </div>
  )
}

export default AddProducts
