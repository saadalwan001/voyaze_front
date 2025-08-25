const btn = () => {

    const Click = () => {
        const name= "SAAD ALWAN"
        const age = 23;
        const Country= "Sri Lanka";

   

        document.getElementById("display").innerHTML=`<h1>My Name is ${name}</h1>
        <h1>My Age is ${age}</h1>
        <h1> I am from ${Country}</h1>`;

    

    }
    

    return(
        <>
        <button onMouseOver={Click}
        className="text-amber-300"
        >
            Click Me!
        </button>

        <div id="display"> </div>

</>

    );

   

        

    
            
    
};

export default btn;

