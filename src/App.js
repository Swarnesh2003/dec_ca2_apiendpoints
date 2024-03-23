import axios from  'axios';
function App() {

 

   async function getIngRec(){
    var ing1=document.getElementById('ing1').value
    var ing2=document.getElementById('ing2').value
    var ing3=document.getElementById('ing3').value
    var ingr=ing1+ing2+ing3 
    const options = {
      method: 'POST',
      url: 'https://all-in-one-recipe-api.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e49885a5dcmsh1bf5c1b379a4699p1bc55bjsn989248ac5c93',
        'X-RapidAPI-Host': 'all-in-one-recipe-api.p.rapidapi.com'
      },
      data: {
        ingredients: ingr
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      
      var outdata=""
      for (let i=0; i<5;i++){
          console.log(response.data.recipe.data[i]['name'])
          outdata=outdata+"<p>"+response.data.recipe.data[i]['id']+" "+response.data.recipe.data[i]['name']+"<p>"
      }
      var out=document.getElementById('out')
      out.innerHTML=outdata
    } catch (error) {
      console.error(error);
    }



   }
   async function getDiet(){
    
    var ing1=document.getElementById('diettype').value

    const options = {
      method: 'POST',
      url: 'https://all-in-one-recipe-api.p.rapidapi.com/generate/meal_plan',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e49885a5dcmsh1bf5c1b379a4699p1bc55bjsn989248ac5c93',
        'X-RapidAPI-Host': 'all-in-one-recipe-api.p.rapidapi.com'
      },
      data: {
        preference: ing1
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.recipe.data);
      var outdata=""
      
          console.log(response.data.recipe.data['breakfast'])
          outdata=outdata+"<b>Breakfast</b>"+"<p>"+response.data.recipe.data['breakfast']+"<p>"
          outdata=outdata+"<b>Lunch</b>"+"<p>"+response.data.recipe.data['lunch']+"<p>"
          outdata=outdata+"<b>Dinner</b>"+"<p>"+response.data.recipe.data['dinner']+"<p>"
          outdata=outdata+"<b>Snacks</b>"+"<p>"+response.data.recipe.data['snacks']+"<p>"
      
      var out=document.getElementById('out')
      out.innerHTML=outdata
    } catch (error) {
      console.error(error);
    }
   }
   async function getRecipe(){
   var urlval='https://all-in-one-recipe-api.p.rapidapi.com/details/'+document.getElementById('recipe').value
const options = {
  method: 'GET',
  url: urlval,
  headers: {
    'X-RapidAPI-Key': 'e49885a5dcmsh1bf5c1b379a4699p1bc55bjsn989248ac5c93',
    'X-RapidAPI-Host': 'all-in-one-recipe-api.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  var outdata=""
      
  console.log(response.data.recipe.data['breakfast'])
  outdata=outdata+"<b>Name</b>"+"<p>"+response.data.recipe.data['Name']+"<p>"
  outdata=outdata+"<b>Description</b>"+"<p>"+response.data.recipe.data['Description']+"<p>"
   
  var out=document.getElementById('out')
  out.innerHTML=outdata
} catch (error) {
	console.error(error);
}
   }
   async function getNutrition(){
    var rec=document.getElementById('nutr').value
    
const options = {
  method: 'GET',
  url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
  params: {
    query: rec
  },
  headers: {
    'X-RapidAPI-Key': 'e49885a5dcmsh1bf5c1b379a4699p1bc55bjsn989248ac5c93',
    'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  var out=document.getElementById('out')
  var outVal=""
  for (let i=0; i<response.data.length;i++){
    var dict=response.data[i]
    for(var key in dict) {
      outVal=outVal+"<p><b>"+key+"</b>:"+dict[key]+'<p>'
    console.log(key + " : " + dict[key]);
 }
 outVal=outVal+"<br></br>"
}
  out.innerHTML=outVal
} catch (error) {
	console.error(error);
}
   }
   
  return (
    <div className="App">
      <div className="main" style={{display:"flex", flexDirection:"row"}}>
        <div className="inp">
      <div className="IngRec">
        <h2>Get recipe with ingredients</h2>
        <p>'chicken, soy sauce, vinegar, garlic, onion, leaves'</p>
          <input id="ing1" placeholder='Enter a ingridient'></input>
          <input id="ing2" placeholder='Enter a ingridient'></input>
          <input id="ing3" placeholder='Enter a ingridient'></input>
         <button  onClick={getIngRec}>Get Recipies</button>
      </div>
      <div className="getDes">
    <h2>Get recipe Details</h2>
    <p>'balanced diet, body builder'</p>
      <input id="recipe" placeholder='Enter recipe number'></input>
     <button  onClick={getRecipe}>Get Recipies</button>
  </div>  
   
  <div className="MealPlan">
    <h2>Get recipe with ingredients</h2>
    <p>'balanced diet, body builder'</p>
      <input id="diettype" placeholder='Enter a Diet Type'></input>
     <button  onClick={getDiet}>Get Recipies</button>
  </div>
  <div className="MealPlan">
    <h2>Get Nutrition information</h2>
    <p>1lb brisket with fries</p>
      <input id="nutr" placeholder='Enter a recipe'></input>
     <button  onClick={getNutrition}>Get Recipies</button>
  </div>
  </div>
  <div className='out' id="out" style={{margin: '100px'}}>

  </div>
  </div>
  </div>
  );
}

export default App;