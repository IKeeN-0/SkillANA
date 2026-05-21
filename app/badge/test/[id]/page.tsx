import MainBox from "./_components/main"

export default async function TestMain({params} : {params : Promise<{ id : string}>}){
    const data = await params;
    const id = data.id;
    return (<>
        <MainBox id={id}></MainBox>
    </>)
}