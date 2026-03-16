const supabaseUrl = "https://zlcqbtecztppsikhmnrl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsY3FidGVjenRwcHNpa2htbnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTE5NTEsImV4cCI6MjA4ODkyNzk1MX0.VMPl1Zijb5YU8v9ecXsYVMRFbG9S6PuIds6uek8ThRI"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

const input = document.getElementById("search")

input.addEventListener("keyup", async () => {

const query = input.value

const { data, error } = await supabase
.from("tenant_overview")
.select("*")
.ilike("full_name", `%${query}%`)

console.log("DATA:", data)
console.log("ERROR:", error)

display(data)

})

function display(data){

const div = document.getElementById("results")
div.innerHTML=""

if(!data || data.length === 0){
div.innerHTML = "No results found"
return
}

data.forEach(t=>{

div.innerHTML += `
<div class="card">

<h3>${t.full_name}</h3>

Phone: ${t.phone}<br>
Email: ${t.email}<br>

Property: ${t.property_name}<br>

</div>
`

})

}
