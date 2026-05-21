import BadgePage from "./_components/main";

export default async function BadgeInfo({params} : {params : Promise<{ id : string}>}){
    const data = await params;
    const id = data.id;
    return(<>
        <BadgePage id = {id}></BadgePage>
    </>)
}