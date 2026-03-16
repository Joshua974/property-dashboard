async function addTenant(){

const name = document.getElementById("name").value
const phone = document.getElementById("phone").value
const email = document.getElementById("email").value

await supabase
.from("tenants")
.insert({
full_name:name,
phone:phone,
email:email
})

alert("Tenant added")

}
