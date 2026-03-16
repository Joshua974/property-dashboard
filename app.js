const supabaseUrl = "https://zlcqbtecztppsikhmnrl.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsY3FidGVjenRwcHNpa2htbnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTE5NTEsImV4cCI6MjA4ODkyNzk1MX0.VMPl1Zijb5YU8v9ecXsYVMRFbG9S6PuIds6uek8ThRI"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

const searchInput = document.getElementById("search")

searchInput.addEventListener("keyup", async () => {

const query = searchInput.value.trim()

if(query === ""){
document.getElementById("results").innerHTML=""
return
}

const { data, error } = await supabase
.from("tenant_overview")
.select("*")
.ilike("full_name", `%${query}%`)

console.log(data)
console.log(error)

display(data)

})

function display(data){

const results = document.getElementById("results")

results.innerHTML=""

if(!data || data.length===0){
results.innerHTML="No results found"
return
}

data.forEach(t=>{

results.innerHTML += `
<div class="card">

<h3>${t.full_name}</h3>

Phone: ${t.phone}<br>
Email: ${t.email}<br>
Property: ${t.property_name}

</div>
`

})

}
