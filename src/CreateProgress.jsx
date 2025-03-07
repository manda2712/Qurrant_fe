import { useState } from "react"
import axios from "axios"

const CreateProgress = ()=> {
    const [data, setData]= useState({
        juz : "",
        surah: "",
        catatan: "",
    })
    const submit= async (e)=>{
        e.preventDefault()
        const user = localStorage.getItem('token')
        // const userToken = JSON.parse(user)
        try {
            const response = await  axios.post("http://localhost:3000/api/reading/progress", data, {
                headers:{
                    Authorization: `Bearer ${user}`
                }
            })
            const result = response.data
            console.log("ini hasilnya", result)
            setData({
                juz : "",
                surah: "",
                catatan: "",
            })
        } catch (error) {
            console.log("error saat submit", error.message)
            
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
      };
    return (
        <div>
            
            <div>
                <form onSubmit={submit}>

                    <div >
                        <h1>BUAT AKUN DULU!</h1>
                        <div >
                            <input type="text" name="juz" value={data.juz} onChange={handleChange}
                                 />
                        </div>
                        <div>
                            <input type="text" name="surah" value={data.surah} onChange={handleChange}
                               />
                        </div>
                        <div >
                            <input type="text" name="catatan" value={data.catatan} onChange={handleChange}
                                />
                        </div>
                        <div >
                            <button type="submit">submit</button>
                        </div>
                        <p></p>
                    </div>
                </form>
            </div>

        </div>

    )
}
export default CreateProgress