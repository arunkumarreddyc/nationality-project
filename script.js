// This project is about knowing the nationality of a person by name
// Here I used two api's one for getting the country id and other for getting the country name using country id

// CREATING HTML ELEMENTS
document.body.innerHTML = `
<div class="container sm mt-4 main-container">
<div class="heading-container">
<h1 class='bg-warning rounded px-1 heading'>   Find the nationality based on name</h1>
</div>


<div  class="sub-container1">

<a href="World Trade Press Report_Country_Codes.pdf" target="_blank">Download country codes pdf</a>
<p> This is a searchbox which shows the country code and the probability of the name of a person present in that country</p>
<input type="text" class="searchbar  text-lowercase" placeholder='Enter Name'>
<button class="btn-primary m-1 px-3  rounded searchbutton">Search</button>
</div>

<div class='result' id="result"></div></div>

<div  class=" container sub-container2">
<p> Type the country code in the below search box to get the country name</p>
<input type="text" class="findname  text-lowercase" placeholder='Enter Country Code'>
<button class="countrybtn btn-primary m-1 px-3 rounded ">Find country</button>
</div>

<div class='countryresult' ></div>
</div>
`;

// Assigning variables to different html elements and reading them
let searchbutton = document.getElementsByClassName("searchbutton")[0];
let searchbar = document.getElementsByClassName("searchbar")[0];
let result = document.getElementsByClassName("result")[0];

let countrybutton = document.getElementsByClassName("countrybtn")[0];
let findname = document.getElementsByClassName("findname")[0];
let countryresult = document.getElementsByClassName("countryresult")[0];

result.innerHTML = `<p class='mt-2'>TO KNOW THE NATIONALITY, ENTER THE NAME OF THE PERSON</p>
<hr/>`;

// on clicking the search button we should get the response
searchbutton.addEventListener("click", getdata);
// using the enter key for getting the response
searchbar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchbutton.click();
  }
});

// on clicking the Find country button we should get the response
countrybutton.addEventListener("click", getcountryname);
// using the enter key for getting the response
findname.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    countrybutton.click();
  }
});

// Use of async and await and fetching the api to get the data from nationalize api
async function getdata() {
  result.innerHTML = "loading...";
  try {
    let name = searchbar.value;
    const url = `https://api.nationalize.io/?name=${name}`;
    let response = await fetch(url);
    let object = await response.json();
    result.innerHTML = `
    <div class='bg bg-info mt-4 p-2 border border-warning rounded'>
    

    <table class="table table-striped table-dark rounded">
  <thead>
    <tr>
      <th scope="col">Country Code</th>
      <th scope="col">Probability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${object.country[0].country_id}</td>
      <td>${object.country[0].probability}</td>
    </tr>
    <tr>
      <td>${object.country[1].country_id}</td>
      <td> ${object.country[1].probability}</td>
    </tr>
    
  </tbody>
</table>
</div>
    <p>*Please find the document in pdf format above to know the country by country codes.</p> <hr/>
       `;
  } catch (error) {
    //If there is an error and the result cannot be found the following message will be displayed in the browser
    result.innerHTML = `<p class='mt-2'>Sorry the name don't match with our database please try by changing the spelling or use another name.*Also note that the search bar only supports single words.</p><hr/>
    `;
  }
}

// Use of async and await and fetching the api to get the data from restcountries api
async function getcountryname() {
  countryresult.innerHTML = "loading...";
  try {
    let countrycode = findname.value;
    const url = `https://restcountries.com/v2/alpha/${countrycode}`;
    let response = await fetch(url);
    let object = await response.json();
    countryresult.innerHTML = `
    <div class='container bg-info mt-4  p-2 border border-warning rounded'>
    
    
    <table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">Country</th>
      <th scope="col">Capital</th>
      <th scope="col">Flag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${object.name}</td>
      <td>${object.capital}</td>
      <td><img src='${object.flag}' width=20px/></td>
    </tr>
    
  </tbody>
</table>
    </div>
       `;
  } catch (error) {
    console.log(error);
  }
}
