import { createClient } from "@supabase/supabase-js"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZHVtb2puemJ0eGx0aWVnanhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTM2MjQsImV4cCI6MjA4NTUyOTYyNH0.uDjJ4nJd8T6qkRrHaLZWe4_QryF9gKcF25ByGb3UCdA"
const supabaseUrl = "https://kbdumojnzbtxltiegjxb.supabase.co"

const supabase = createClient(supabaseUrl , supabaseKey)

export default function uploadFile(file){
    return new Promise (
        (resolve , reject)=>{
            
            if(file == null){
                reject("No file provided")
                return
            }

            const timestamp = new Date().getTime()
            const fileName = timestamp + "-"+file.name

            supabase.storage.from("images").upload(fileName , file , {
                upsert : false,
                cacheControl : 3600
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file")
                }
            )
        }
    )

}