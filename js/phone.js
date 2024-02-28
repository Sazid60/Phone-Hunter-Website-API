// alert('Connected')
const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones);
}
const displayPhones = (phones) => {
  console.log(phones)
  const phoneContainer = document.getElementById('phone-container');
  // Clear Container Crd Before Adding New Card
  phoneContainer.textContent = '';
  console.log(phones.length)
  
  // Display Show All Button If there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if(phones.length>12){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  // Display Only first 12 phones
  phones = phones.slice(0,12) 
  phones.forEach(phone => {
    console.log(phone)
    // Create Div
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-gray-100 shadow-2xl p-4';
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews Phones whose phones does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `
    // append Child
    phoneContainer.appendChild(phoneCard)
  })
}
// Handle Search button
const handleSearch = () => {
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  console.log(searchText)
  loadPhone(searchText)
}

// loadPhone();


