const supabaseUrl = "https://zlcqbtecztppsikhmnrl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsY3FidGVjenRwcHNpa2htbnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTE5NTEsImV4cCI6MjA4ODkyNzk1MX0.VMPl1Zijb5YU8v9ecXsYVMRFbG9S6PuIds6uek8ThRI"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

const input = document.getElementById("search")

input.addEventListener("keyup", async () => {

const query = input.value

if(query.length === 0){
document.getElementById("results").innerHTML = ""
return
}

const { data, error } = await supabase
.from("tenant_overview")
.select("*")
.or(`full_name.ilike.%${query}%,street_name.ilike.%${query}%,unit_number.ilike.%${query}%`)

if(error){
console.error(error)
return
}

display(data)

})

function display(data){

const div = document.getElementById("results")

div.innerHTML=""

data.forEach(t=>{

div.innerHTML += `
<div class="card">

<h3>${t.full_name}</h3>

Phone: ${t.phone ?? ""}<br>
Property: ${t.property_name ?? ""}<br>
Address: ${t.street_name ?? ""} ${t.house_number ?? ""}<br>
Unit: ${t.unit_number ?? ""}<br>
Rent: €${t.rent ?? ""}<br>
Contract Ends: ${t.contract_end ?? ""}<br>

${t.contract_pdf ? `<a href="${t.contract_pdf}" target="_blank">View Contract</a>` : ""}

</div>
`

})

}
