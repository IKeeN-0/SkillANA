import { useEditContext } from "../edit";

export default function Contact() {
  const { isEdit, liveData, updateNestedField, updateTempField, tempData } = useEditContext();
  const data = isEdit ? tempData.contact : liveData.contact;

  const inputBaseClass = "text-white text-[16px] px-5 w-full rounded-[0.625rem] bg-white/5 border border-white/20 focus:outline-none focus:bg-white/10 focus:border-white/40 transition-colors duration-200 placeholder-white/40";

  return (
    <>
      <div id="contact-container" className="text-[1.6em] font-bold">    
        <h1>Contact</h1> 
        
        <div id="contact-content" className="block mt-1 p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-160 transition-all duration-300 rounded-2xl">
            
            <div id="Email" className="block text-[0.8em] font-semibold mb-3">
                <h2 className="mb-1">Email</h2>
                <div className="relative flex w-full items-center">
                    <input 
                        type="email" 
                        id="email" 
                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                        placeholder="example@gmail.com"
                        readOnly={!isEdit}
                        value={isEdit ? (tempData.email || "") : (liveData.email || "")}
                        onChange={(e) => updateTempField('email', e.target.value)}
                    />
                </div>  
            </div>
                
            <div id="Phone-Number" className="block text-[0.8em] font-semibold mb-3">
                <h2 className="mb-1">Phone Number</h2>
                <div className="relative flex w-full items-center">
                    <input 
                        type="tel" 
                        id="phone" 
                        className={`${inputBaseClass} h-12.5 font-medium`} 
                        placeholder="123-456-7890"
                        readOnly={!isEdit}
                        value={data?.phoneNumber || ""}
                        onChange={(e) => updateNestedField('contact', 'phoneNumber', e.target.value)}
                    />
                </div>
            </div>

            <div id="Address" className="block text-[0.8em] font-semibold ">
                <h2 className="mb-1">Address</h2>
                <div className="relative flex w-full items-center">
                    <textarea 
                        id="address" 
                        rows={2}
                        className={`${inputBaseClass} py-3 resize-none font-medium`} 
                        placeholder="123 Main St, City, State 12345" 
                        readOnly={!isEdit}
                        value={data?.address || ""}
                        onChange={(e) => updateNestedField('contact', 'address', e.target.value)}
                    />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}