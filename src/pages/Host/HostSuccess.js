import "./HostSuccess.css"
import success from "./check.png"
export default function HostSuccess({message}) {
  return (
    <div className="success">

        <img className="success-img" src={success} alt="" />
        <h1 className="success-greeting">Thank You!</h1>
        <p className="success-mess">{message}</p>
      
    </div>
  )
}
