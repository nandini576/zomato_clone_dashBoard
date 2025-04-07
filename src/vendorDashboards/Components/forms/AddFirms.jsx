import React,{useState} from 'react'
import {API_URL} from '../../Data/apiPah'
const AddFirms = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);
  
  const handleCategoryChange =(event)=>{
    const value = event.target.value;//updated value is assigned to value
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));
    }else{
      setCategory([...category,value])//...-spread operator
    }
  }

  const handleRegionChange =(event)=>{
    const value = event.target.value;//updated value is assigned to value
    if(region.includes(value)){
      setRegion(region.filter((item)=> item !== value));
    }else{
      setRegion([...region,value])//...-spread operator
    }
  }

  const handleImagehandler =(event)=>{
    const selectedImage= event.target.files[0];
    setFile(selectedImage)

  }
  const handleFirmSubmit =async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken')//getitng token from local storage
      if(!loginToken){
        console.error("user Not Authenticated");
      }
      const formData= new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer', offer);
      category.forEach((value)=>{
        formData.append('category',value)
      })
      region.forEach((value)=>{
       formData.append('region',value);
      })
      formData.append('image',file)
      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{'token':`${loginToken}`},
        body:formData
      });
      const data=await response.json()
      if(response.ok){
        console.log(data)
        alert("firm added succesfully")
        setArea("");
        setFirmName("")
        setOffer("")
        setCategory([])
        setRegion([])
        setFile(null)
        
      }
      console.log("this is firm id",data.firmId)
      const firmId=data.firmId;
      localStorage.setItem('firmId',firmId)
    } catch (error) {
      console.error(error)
      alert("failed to add firm")
    }
  }

  return (
    <div className='firmSection'>
        <h3>Add Firm</h3>
        <form className='authForm' onSubmit={handleFirmSubmit} >

          <div className='innerAuth'>
            <label>Firm Name:</label>
             <input type="text"  name='firmName' placeholder='Enter Firm Name..' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
          </div>
          <div className='innerAuth'>
            <label>Area:</label>
            <input type="text" name='area'  placeholder='Enter Area...' value={area} onChange={(e)=>setArea(e.target.value)}/>
          </div>
          <div className='innerAuth'>

            <label>Category:</label>

            <div className='category'>

              <div className='inner-category'>
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
    
              </div>
              <div className='inner-category'>
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
              </div>
            
            </div>
            
          </div>
          <div className='innerAuth'>
            <label>Region:</label>

            <div className='category'>

              <div className='inner-category'>
                <label>South-indian</label>
                <input type="checkbox" checked={region.includes('south-indian')} value="south-indian"  onChange={handleRegionChange}/>
              </div>

              <div className='inner-category'>
                <label>north-indian</label>
                <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange}/>
              </div>

              <div className='inner-category'>
                <label>Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange}/>
              </div>

              <div className='inner-category'>
                <label>Backery</label>
                <input type="checkbox" checked={region.includes('backery')} value="backery" onChange={handleRegionChange}/>
              </div>
            
            </div>
          </div>
          <div className='innerAuth'>
            <label>Offer:</label>
            <input type="text" placeholder='Enter Offer...' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
          </div>
          <div className='innerAuth'>
            <label>Firm Image:</label>
            <input type="file" onChange={handleImagehandler}/>
          </div>
          <div className='innerAuth'>
            <div></div>
            <button type='submit'>Submit</button>
          </div>

        </form>
      
    </div>
  )
}

export default AddFirms
