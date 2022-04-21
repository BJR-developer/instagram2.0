import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

const WriteToCloudFireStore = () =>{
    const sendData = async() =>{
        try {
            const decRef = await addDoc(collection(db , 'test') , {
                userName:"jamil test",
                timestamp:serverTimestamp()
            })
            console.log(decRef);
            alert("Success")
        } catch (error) {
            console.log(error);
            alert("Failed")
        }
    }
    return (
        <>
        <div className="firestore">
             <button onClick={sendData}>Send Data</button>
        </div>
        </>
    )
}
export default WriteToCloudFireStore;