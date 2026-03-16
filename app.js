const supabaseUrl = "https://zlcqbtecztppsikhmnrl.supabase.co"
const supabaseKey = "YOUR_ANON_KEY"

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
