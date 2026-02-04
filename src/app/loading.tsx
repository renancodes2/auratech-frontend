import { FiLoader } from "react-icons/fi"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <FiLoader size={26} color="#4b5563"/>
    </div>
  )
}