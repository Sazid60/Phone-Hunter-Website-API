// alert('Connected')
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
  console.log(phones)
  const phoneContainer = document.getElementById('phone-container');
  // Clear Container Crd Before Adding New Card
  phoneContainer.textContent = '';
  console.log(phones.length)
  
  // Display Show All Button If there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  console.log('Is Show All', isShowAll)
  // Display Only first 12 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0,12) 
  }
  
  phones.forEach(phone => {
    console.log(phone)
    // Create Div
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-gray-100 shadow-2xl p-4';
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body space-y-4">
          <h2 class="card-title flex justify-center items-center">${phone.phone_name}</h2>
          <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
          <h2 class="card-title flex justify-center items-center font-bold">$999</h2>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary w-[90%]">Show Details</button>
          </div>
        </div>
        `
    // append Child
    phoneContainer.appendChild(phoneCard)
  })
  // Hide Loading Spinner
  toggleLoadingSpinner(false);
}
// Handle Show Details
const handleShowDetails = async (id) => {
  console.log('clicked Show Details',id)
  // Load Single Phone Data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data
  console.log(phone)
  showPhoneDetails(phone)

}
// Show Phone Details in modal
const showPhoneDetails = (phone)=>{
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name
const showDetailContainer = document.getElementById('show-detail-container')
showDetailContainer.innerHTML =`
<img src ="${phone.image}" alt="" />
<p><span>Brand :</span>${phone?.brand} </p>
<p><span>Storage :</span>${phone?.mainFeatures?.storage} </p>
<p><span>Gps :</span>${phone?.others?.GPS} </p>`
  // Show the Modal
  show_details_modal.showModal()

}
// Handle Search button
const handleSearch = (isShowAll) => {
  // Show Loading Spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  console.log(searchText)
  loadPhone(searchText, isShowAll)
}
// Loading Spinner
const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true)
}
// loadPhone();


