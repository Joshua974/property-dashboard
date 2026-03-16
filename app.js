const supabaseUrl = "https://zlcqbtecztppsikhmnrl.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsY3FidGVjenRwcHNpa2htbnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTE5NTEsImV4cCI6MjA4ODkyNzk1MX0.VMPl1Zijb5YU8v9ecXsYVMRFbG9S6PuIds6uek8ThRI"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

const searchInput = document.getElementById("search")
const results = document.getElementById("results")

searchInput.addEventListener("keyup", async () => {

const query = searchInput.value.trim()

if(query === ""){
results.innerHTML = ""
return
}

const { data, error } = await supabase
.from("tenant_overview")
.select("*")
.ilike("full_name", `%${query}%`)

console.log("DATA:", data)
console.log("ERROR:", error)

display(data)

})

function display(data){

results.innerHTML = ""

if(!data || data.length === 0){
results.innerHTML = "No results found"
return
}

data.forEach(t => {

results.innerHTML += `
<div style="border:1px solid #ddd;padding:15px;margin-top:10px;border-radius:6px">

<h3>${t.full_name}</h3>

Phone: ${t.phone}<br>
Email: ${t.email}<br>
Property: ${t.property_name}

</div>
‘
async function loadRentAlerts(){

const { data } = await supabase
.from("alerts")
.select("*")
.eq("type","rent_due")

const container = document.getElementById("rentAlerts")

container.innerHTML=""

data.forEach(a=>{

container.innerHTML += `
<div style="color:red">
⚠ Rent Due: ${a.message}
</div>
`

})

}
async function loadContractAlerts(){

const { data } = await supabase
.from("alerts")
.select("*")
.eq("type","contract_expiry")

const container = document.getElementById("contractAlerts")

container.innerHTML=""

data.forEach(a=>{

container.innerHTML += `
<div style="color:orange">
⚠ Contract Expiring: ${a.message}
</div>
`

})

}
})

}
loadRentAlerts()
loadContractAlerts()
