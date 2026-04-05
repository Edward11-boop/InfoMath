import React, { useEffect, useRef, useState } from 'react'




const phrases = ["cu rezultate.", "cu pasiune.", "cu dedicare.", "cu succes."];

const MainSection = () => {

  const [index,setIndex] = useState(0); // ce fraza e activa 
  const [displayed,setDisplayed] = useState(""); // ce e vizibil pe ecran
  const [deleting, setDeleting] = useState(false); // scriem sau stergem
  
  useEffect(() => {

      const current = phrases[index];
      let timeout: ReturnType<typeof setTimeout>;
      // first case when i add letter by letter
      if( deleting == false && displayed.length < current.length )
          {
            timeout = setTimeout(() => setDisplayed(current.slice(0,displayed.length + 1)), 60);

          }
      // we have the entire phrase rn

      if( deleting == false && displayed.length === current.length)
        {
          timeout = setTimeout(() => setDeleting(true) , 1800);
        } 
       
      if( deleting == true && displayed.length > 0 )
      {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0,displayed.length - 1 )),35);
      }
      
      if ( deleting == true && displayed.length === 0)
      {
        setDeleting(false);
        setIndex((index) => (index + 1) % phrases.length);
      }


      return  () => clearTimeout(timeout);

  }, [displayed,deleting,index]);

  return (
    <>

    <section className = "flex w-1/2 mt-10 md:ml-16 md:mt-24">
        <div className = "mainSection w-full ml-12 flex flex-col justify-center gap-4 text-white ">
            {/* Linie gradient  */}
            <div className = "Line w-16 h-1 bg-linear-to-r from-[#6B8CFF] to-[#a855f7] rounded-full"></div>
            
            {/* Bara cu Pregatire */}
            <div className = "flex items-center gap-2 px-4 py-1.5 rounded-full w-fit bg-[#0f1a4a]/60 border border-[#4a6aff]/30 backdrop-blur-md">
              <span className = "w-2 h-2 rounded-full bg-[#6B8CFF] shrink-0"/>
              <span className = "text-[#C8D8FF] text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
                  Pregătire pentru examenul de Bacalaureat
              </span>
            </div>

            
            <div className="text-7xl md:text-8xl font-black leading-tight"
                style={{ fontFamily: "Playfair Display" }} 
            >
              <span className="text-white">Matematică și</span>
              <br />
              <span className="text-white">Informatică,</span>
              <br />
              <span className="bg-gradient-to-r from-[#6B8CFF] to-[#a855f7] bg-clip-text text-transparent" >{displayed}<span className = "text-purple-400 opacity-50">|</span></span>
            </div>
            
            <div className = "mt-4 max-w-3/4">
              <p className = "text-gray-400 text-lg tracking-widest">Nu memorare, nu stres, nu pierdere de timp. Metode clare, profesori cu rezultate și o platformă construită pentru elevul din 2026.</p>
            </div>
            
            <div className = "Buttons">aaaaa</div>
        </div>
    </section>

    </>
  )
}

export default MainSection
