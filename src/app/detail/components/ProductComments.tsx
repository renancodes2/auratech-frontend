import { useState } from "react";
import { FiStar } from "react-icons/fi";

export function ProductComments() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <main className="mt-10 xl:max-w-[800px] w-full">
      <div className="flex border-b-0 gap-1 border-gray-50">
        <div className="h-10 w-10 rounded-full bg-blue-800" />
        <input type="text" className="w-full mx-2 outline-none border-b border-gray-500 focus:border-gray-300 transition-color duration-300 mb-2"/>
      </div>
      <div className="mx-2 flex items-center justify-between mt-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="outline-none cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <FiStar
                size={20}
                className={`transition-colors duration-200 ${
                  star <= (hover || rating) 
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="text-gray-400">
            Cancelar
          </button>
          <button className="text-gray-400 bg-gray-800 p-2 rounded-2xl">
            Comentar
          </button>
        </div>
      </div>
        
      <section>
            
      </section>
    </main>
  )
}